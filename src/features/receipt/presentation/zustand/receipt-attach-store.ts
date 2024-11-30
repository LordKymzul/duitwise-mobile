import { GoogleGenerativeAI } from '@google/generative-ai';
import { ReceiptAttachedEntity } from 'src/core/shared/types/navigation';



interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

function validateReceiptData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
        return { isValid: false, errors: ['Invalid response format'] };
    }

    // Validate item_name (will be used for receiptName)
    if (!Array.isArray(data.item_name) || data.item_name.length === 0) {
        errors.push('No items found in receipt');
    }

    // Validate total_price
    if (typeof data.total_price !== 'number' || data.total_price <= 0) {
        errors.push('Invalid price value');
    }

    // Validate date
    if (typeof data.date !== 'string' || !Date.parse(data.date)) {
        errors.push('Invalid date format');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

async function analyzeReceipt(
    imageBase64: string,
    apiKey: string
): Promise<ReceiptAttachedEntity> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: 'image/png'
            }
        };

        const prompt = `Analyze this receipt image and return ONLY the following information in JSON format:
        {
          "item_name": [list of all item names],
          "total_price": numeric value without currency symbols,
          "date": "date in YYYY-MM-DD format"
        }
        Requirements:
        - Return ONLY these 3 fields
        - item_name must be an array of strings
        - total_price must be a number (no currency symbols, no quotes)
        - date must be in YYYY-MM-DD format
        Return only the JSON object, no other text.`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;


        const text = response.text();

        // Find the JSON content between curly braces
        const jsonStartIndex = text.indexOf('{');
        const jsonEndIndex = text.lastIndexOf('}');

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            throw new Error('No valid JSON data found in response');
        }

        const jsonContent = text.substring(jsonStartIndex, jsonEndIndex + 1);
        console.log(`===============`);
        console.log('JSON Content', jsonContent);

        // Parse the extracted JSON content
        const parsedData = JSON.parse(jsonContent); `c`
        console.log('Parsed Data', parsedData);
        const validation = validateReceiptData(parsedData);

        if (!validation.isValid) {
            throw new Error(`Invalid response data: ${validation.errors.join(', ')}`);
        }

        // Transform the data to match ReceiptAttachedEntity interface
        const receiptEntity: ReceiptAttachedEntity = {
            receiptImage: imageBase64,
            receiptName: parsedData.item_name.join(', '), // Combine all items into one string
            price: parsedData.total_price,
            date: new Date(parsedData.date)
        };

        return receiptEntity;
    } catch (error) {
        throw Error(
            `Receipt analysis failed: ${error instanceof Error ? error.message : String(error)}`
        );
    }
}

export { analyzeReceipt };
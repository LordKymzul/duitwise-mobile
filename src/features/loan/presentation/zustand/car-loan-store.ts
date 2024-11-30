// Types and interfaces
interface CarLoan {
    bank_name: string;
    interest_rate: string;
    car_condition: string;
    tenure_period: string;
}

interface CarLoansData {
    car_loans: CarLoan[];
}

export interface CarFilteredLoanInfo extends CarLoan {
    selected_tenure: number;
    min_interest: number;
    max_interest: number;
    estimated_monthly_min: number;
    estimated_monthly_max: number;
}

/**
 * Filter car loans based on financing amount and selected tenure.
 * 
 * @param financingAmount - Loan amount (1000-50000)
 * @param selectedTenure - Selected loan tenure in years (5, 7, or 9)
 * @param carLoans - Array of car loan objects
 * @returns Array of filtered suitable loans
 */
export function filterCarLoans(
    financingAmount: number,
    selectedTenure: number,
    carLoans: CarLoan[]
): CarFilteredLoanInfo[] {
    // Validate input parameters
    if (financingAmount < 1000 || financingAmount > 50000) {
        throw new Error("Financing amount must be between 1000 and 50000");
    }
    if (![5, 7, 9].includes(selectedTenure)) {
        throw new Error("Selected tenure must be 5, 7, or 9 years");
    }

    const suitableLoans: CarFilteredLoanInfo[] = [];

    carLoans.forEach((loan) => {
        const tenureRange = loan.tenure_period;
        let isTenureSuitable = false;

        // Handle different tenure period formats
        if (tenureRange.includes('-')) {
            // Range format (e.g., "7 - 9 years")
            const [minStr, maxStr] = tenureRange.split('-').map(t => t.trim().split(' ')[0]);
            const minTenure = parseInt(minStr);
            const maxTenure = parseInt(maxStr);
            isTenureSuitable = selectedTenure >= minTenure && selectedTenure <= maxTenure;
        } else {
            // Single value format (e.g., "9 years")
            const maxTenure = parseInt(tenureRange.split(' ')[0]);
            isTenureSuitable = selectedTenure === maxTenure;
        }

        if (isTenureSuitable) {
            // Create loan info with additional calculated fields
            const loanInfo = { ...loan } as CarFilteredLoanInfo;
            loanInfo.selected_tenure = selectedTenure;

            // Extract and format interest rate range
            const interestRate = loan.interest_rate
                .replace('p.a.', '')
                .replace('%', '')
                .trim();

            let minRate: number;
            let maxRate: number;

            if (interestRate.includes('-')) {
                [minRate, maxRate] = interestRate.split('-').map(rate => parseFloat(rate.trim()));
            } else {
                minRate = maxRate = parseFloat(interestRate);
            }

            loanInfo.min_interest = minRate;
            loanInfo.max_interest = maxRate;

            // Calculate estimated monthly payment range using simple interest formula
            const principal = financingAmount;
            const years = selectedTenure;
            const months = years * 12;

            const minMonthly = (principal * (1 + (minRate / 100 * years))) / months;
            const maxMonthly = (principal * (1 + (maxRate / 100 * years))) / months;

            loanInfo.estimated_monthly_min = Math.round(minMonthly * 100) / 100;
            loanInfo.estimated_monthly_max = Math.round(maxMonthly * 100) / 100;

            suitableLoans.push(loanInfo);
        }
    });

    // Sort by minimum interest rate
    return suitableLoans.sort((a, b) => a.min_interest - b.min_interest);
}

// Sample data
const carLoansData: CarLoansData = {
    "car_loans": [
        {
            "bank_name": "Affin Bank Conventional Hire Purchase",
            "interest_rate": "2.92% - 3% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Maybank Hire Purchase",
            "interest_rate": "3.40% - 4.25% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "CIMB Hire Purchase-i",
            "interest_rate": "2.85% - 4.45% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Public Bank Aitab Hire Purchase-i",
            "interest_rate": "3.31% - 4.10% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "7 - 9 years"
        },
        {
            "bank_name": "Hong Leong Auto Loan",
            "interest_rate": "3.24% - 3.78% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "7 - 9 years"
        },
        {
            "bank_name": "RHB Hire Purchase",
            "interest_rate": "3.18% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Al-Rajhi Automobile Financing-i",
            "interest_rate": "4.40% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "AmBank Islamic Arif Hire Purchase-i",
            "interest_rate": "3.05% - 3.66% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "BSN Hire Purchase",
            "interest_rate": "2.55% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Bank Islam Vehicle Financing-i",
            "interest_rate": "3% - 3.60% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Bank Muamalat Vehicle Financing-i GradPack",
            "interest_rate": "3.10% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        },
        {
            "bank_name": "Bank Rakyat Vehicle Financing-i (An Naqlu 2)",
            "interest_rate": "3.30% - 3.50% p.a.",
            "car_condition": "New / Used",
            "tenure_period": "5 - 9 years"
        },
        {
            "bank_name": "KFH Automobile Ijarah-i",
            "interest_rate": "2.50% p.a.",
            "car_condition": "New",
            "tenure_period": "9 years"
        }
    ]
}

// Example usage
try {
    const filteredLoans = filterCarLoans(30000, 7, carLoansData.car_loans);

    console.log(`\nFound ${filteredLoans.length} matching loans:`);
    filteredLoans.forEach(loan => {
        console.log(`\nBank: ${loan.bank_name}`);
        console.log(`Interest Rate: ${loan.interest_rate}`);
        console.log(`Estimated Monthly Payment: RM ${loan.estimated_monthly_min.toFixed(2)} - RM ${loan.estimated_monthly_max.toFixed(2)}`);
        console.log(`Car Condition: ${loan.car_condition}`);
        console.log(`Tenure Period: ${loan.tenure_period}`);
    });
} catch (error) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    } else {
        console.log('An unknown error occurred');
    }
}
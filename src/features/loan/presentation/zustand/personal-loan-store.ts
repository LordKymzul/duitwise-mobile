// Define interfaces for type safety
interface Loan {
    bank_name: string;
    interest_rate: string;
    minimum_monthly_income: string;
    loan_amount_range: string;
    loan_period: string;
    government_glc_eligible: string;
}

export interface PersonalFilteredLoan {
    bank_name: string;
    interest_rate: string;
    minimum_monthly_income: string;
    minimum_income_requirement: number;
    government_glc_eligible: string;
    estimated_monthly_min: number;
    estimated_monthly_max: number;
    min_interest: number;
    max_interest: number;
}

export function filterPersonalLoans(
    financingAmount: number,
    financingPeriodMonths: number,
    loans: Loan[]
): PersonalFilteredLoan[] {
    // Validate input parameters
    if (financingAmount < 1000 || financingAmount > 50000) {
        throw new Error("Financing amount must be between 1000 and 50000");
    }
    if (financingPeriodMonths < 3 || financingPeriodMonths > 48) {
        throw new Error("Financing period must be between 3 and 48 months");
    }

    const suitableLoans: PersonalFilteredLoan[] = [];


    for (const loan of loans) {
        // Parse loan amount range
        // Update just the loan amount parsing section
        const amountRange = loan.loan_amount_range
            .replace(/RM/g, '')  // Remove all instances of 'RM'
            .replace(/,/g, '')   // Remove all instances of commas
            .split('-');
        const minAmount = parseFloat(amountRange[0].trim());
        const maxAmount = parseFloat(amountRange[1].trim());

        console.log(minAmount)
        console.log(maxAmount)

        // Parse loan period
        const periodRange = loan.loan_period.toLowerCase();
        let minPeriod: number;
        let maxPeriod: number;

        // Convert all periods to months for comparison
        if (periodRange.indexOf('month') !== -1) {
            if (periodRange.indexOf('-') !== -1) {
                const periodParts = periodRange.split('-');
                minPeriod = parseInt(periodParts[0].trim().split(' ')[0]);
                maxPeriod = parseInt(periodParts[1].trim().split(' ')[0]);
            } else {
                minPeriod = maxPeriod = parseInt(periodRange.split(' ')[0]);
            }
        } else {
            // Period is in years
            const periodParts = periodRange.split('-');
            minPeriod = parseInt(periodParts[0].trim()) * 12;
            maxPeriod = parseInt(periodParts[1].trim().split(' ')[0]) * 12;
        }

        // Parse minimum monthly income
        const minIncome = parseFloat(
            loan.minimum_monthly_income.replace('RM', '').replace(',', '')
        );

        // Parse interest rate
        const interestRate = loan.interest_rate
            .replace('p.a.', '')
            .replace('%', '')
            .trim();
        let minRate: number;
        let maxRate: number;

        if (interestRate.indexOf('-') !== -1) {
            [minRate, maxRate] = interestRate.split('-').map(rate => parseFloat(rate));
        } else {
            minRate = maxRate = parseFloat(interestRate);
        }

        // Check if loan meets criteria
        const isAmountSuitable = minAmount <= financingAmount && financingAmount <= maxAmount;
        const isPeriodSuitable = minPeriod <= financingPeriodMonths && financingPeriodMonths <= maxPeriod;

        if (isAmountSuitable && isPeriodSuitable) {
            // Calculate estimated monthly payment using simple interest formula
            const principal = financingAmount;
            const years = financingPeriodMonths / 12;
            const months = financingPeriodMonths;

            const minMonthly = (principal * (1 + (minRate / 100 * years))) / months;
            const maxMonthly = (principal * (1 + (maxRate / 100 * years))) / months;

            const loanInfo: PersonalFilteredLoan = {
                bank_name: loan.bank_name,
                interest_rate: loan.interest_rate,
                minimum_monthly_income: loan.minimum_monthly_income,
                minimum_income_requirement: minIncome,
                government_glc_eligible: loan.government_glc_eligible,
                estimated_monthly_min: Number(minMonthly.toFixed(2)),
                estimated_monthly_max: Number(maxMonthly.toFixed(2)),
                min_interest: minRate,
                max_interest: maxRate
            };

            suitableLoans.push(loanInfo);
        }
    }

    // Sort by minimum interest rate
    return suitableLoans.sort((a, b) => a.min_interest - b.min_interest);
}

// Example usage
export const personalLoanData: Loan[] = [
    {
        "bank_name": "Alliance Bank",
        "interest_rate": "4.99% - 16.68% p.a.",
        "minimum_monthly_income": "RM3,000",
        "loan_amount_range": "RM5,000 - RM300,000",
        "loan_period": "1 - 7 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "RHB",
        "interest_rate": "8.59% - 13.76% p.a.",
        "minimum_monthly_income": "RM2,000",
        "loan_amount_range": "RM2,000 - RM150,000",
        "loan_period": "1 - 7 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "Al Rajhi Bank",
        "interest_rate": "5.42% - 14.19% p.a.",
        "minimum_monthly_income": "RM5,000",
        "loan_amount_range": "RM10,000 - RM250,000",
        "loan_period": "1 - 8 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "CIMB",
        "interest_rate": "4.38% - 19.88% p.a.",
        "minimum_monthly_income": "RM2,000",
        "loan_amount_range": "RM2,000 - RM100,000",
        "loan_period": "2 - 5 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "First N Ever",
        "interest_rate": "12.00% - 18.00% p.a.",
        "minimum_monthly_income": "RM4,000",
        "loan_amount_range": "RM5,000 - RM300,000",
        "loan_period": "6 months - 3 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "AEON Credit",
        "interest_rate": "7.92% - 18.00% p.a.",
        "minimum_monthly_income": "RM1,500",
        "loan_amount_range": "RM1,000 - RM100,000",
        "loan_period": "6 months - 7 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Standard Chartered",
        "interest_rate": "7.80% p.a.",
        "minimum_monthly_income": "RM5,000",
        "loan_amount_range": "RM3,000 - RM200,000",
        "loan_period": "1 - 5 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Adacash",
        "interest_rate": "18.00% p.a.",
        "minimum_monthly_income": "RM1,000",
        "loan_amount_range": "RM500 - RM1,000",
        "loan_period": "1 month - 3 months",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Tambadana",
        "interest_rate": "18.00% p.a.",
        "minimum_monthly_income": "RM1,500",
        "loan_amount_range": "RM1,000 - RM10,000",
        "loan_period": "1 month - 1 year",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Evo Credit",
        "interest_rate": "12.00% - 18.00% p.a.",
        "minimum_monthly_income": "RM3,500",
        "loan_amount_range": "RM5,000 - RM400,000",
        "loan_period": "2 months - 5 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "BSN",
        "interest_rate": "6.00% - 8.50% p.a.",
        "minimum_monthly_income": "RM3,000",
        "loan_amount_range": "RM5,000 - RM400,000",
        "loan_period": "2 - 10 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Maybank",
        "interest_rate": "6.50% - 8.00% p.a.",
        "minimum_monthly_income": "RM3,500",
        "loan_amount_range": "RM5,000 - RM100,000",
        "loan_period": "2 - 6 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Hong Leong Islamic Bank",
        "interest_rate": "9.00% - 12.50% p.a.",
        "minimum_monthly_income": "RM2,000",
        "loan_amount_range": "RM5,000 - RM150,000",
        "loan_period": "2 - 5 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "JCL",
        "interest_rate": "18.00% - 20.00% p.a.",
        "minimum_monthly_income": "RM1,000",
        "loan_amount_range": "RM1,000 - RM50,000",
        "loan_period": "6 months - 5 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Bank Islam",
        "interest_rate": "4.50% - 7.50% p.a.",
        "minimum_monthly_income": "RM4,000",
        "loan_amount_range": "RM10,000 - RM300,000",
        "loan_period": "1 - 10 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "MBSB Bank",
        "interest_rate": "7.62% - 13.09% p.a.",
        "minimum_monthly_income": "RM3,500",
        "loan_amount_range": "RM10,000 - RM200,000",
        "loan_period": "2 - 7 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "HSBC Amanah",
        "interest_rate": "4.88% - 10.50% p.a.",
        "minimum_monthly_income": "RM3,000",
        "loan_amount_range": "RM6,000 - RM250,000",
        "loan_period": "2 - 7 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "AmBank",
        "interest_rate": "8.00% - 11.99% p.a.",
        "minimum_monthly_income": "RM3,000",
        "loan_amount_range": "RM2,000 - RM150,000",
        "loan_period": "1 - 5 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "Bank Rakyat",
        "interest_rate": "7.66% - 10.22% p.a.",
        "minimum_monthly_income": "RM2,000",
        "loan_amount_range": "RM5,000 - RM400,000",
        "loan_period": "1 - 10 years",
        "government_glc_eligible": "No"
    },
    {
        "bank_name": "UOB",
        "interest_rate": "9.99% - 11.99% p.a.",
        "minimum_monthly_income": "RM3,000",
        "loan_amount_range": "RM5,000 - RM100,000",
        "loan_period": "1 - 5 years",
        "government_glc_eligible": "Yes"
    },
    {
        "bank_name": "instaDuit",
        "interest_rate": "18.00% p.a.",
        "minimum_monthly_income": "RM1,500",
        "loan_amount_range": "RM1,000 - RM10,000",
        "loan_period": "1 - 4 years",
        "government_glc_eligible": "Yes"
    }

]

try {
    // Example: Filter loans for RM 5000 with 12-month tenure
    const filteredLoans = filterPersonalLoans(5000, 12, personalLoanData);

    // Print results
    filteredLoans.forEach(loan => {
        console.log(`\nBank: ${loan.bank_name}`);
        console.log(`Interest Rate: ${loan.interest_rate}`);
        console.log(`Minimum Monthly Income: ${loan.minimum_monthly_income}`);
        console.log(`Estimated Monthly Payment: RM ${loan.estimated_monthly_min} - RM ${loan.estimated_monthly_max}`);
        console.log(`Government/GLC Eligible: ${loan.government_glc_eligible}`);
    });
} catch (error) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
}
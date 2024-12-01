import { PortfolioData, portfolioData } from "src/core/constant/Data";

// Types and interfaces
interface CarLoan {
    bank_name: string;
    interest_rate: string;
    car_condition: string;
    tenure_period: string;
}

export interface CarFilteredLoanInfo extends CarLoan {
    selected_tenure: number;
    min_interest: number;
    max_interest: number;
    estimated_monthly_min: number;
    estimated_monthly_max: number;
}

interface LoanDetails {
    type: string;
    monthlyPayment: number;
    totalLoan: number;
    status: {
        activeStatus: string;
        paymentStatus: boolean;
    };
}

interface BankPortfolio {
    bankName: string;
    totalBalance: number;
    loans: LoanDetails[];
}

interface FinancialProfile {
    portfolio: BankPortfolio[];
    recurringPayments: Record<string, number>;
}

interface DSRCalculationResult {
    currentDSR: number;
    stressedDSR: number;
    monthlyCommitments: number;
    newMonthlyCommitment: number;
    isEligible: boolean;
    selectedBank: string;
    estimatedMonthlyPayment: number;
}

// Function to filter car loans
export function filterCarLoans(
    financingAmount: number,
    selectedTenure: number,
    carLoans: CarLoan[]
): CarFilteredLoanInfo[] {
    // Validate input parameters
    if (financingAmount < 1000 || financingAmount > 50000) {
        throw new Error("Financing amount must be between 1000 and 50000");
    }

    const validTenures = [5, 7, 9];
    if (!validTenures.some(t => t === selectedTenure)) {
        throw new Error("Selected tenure must be 5, 7, or 9 years");
    }

    const suitableLoans: CarFilteredLoanInfo[] = [];

    carLoans.forEach((loan) => {
        const tenureRange = loan.tenure_period;
        let isTenureSuitable = false;

        // Handle different tenure period formats
        if (tenureRange.indexOf('-') !== -1) {
            const [minStr, maxStr] = tenureRange.split('-').map(t => t.trim().split(' ')[0]);
            const minTenure = parseInt(minStr);
            const maxTenure = parseInt(maxStr);
            isTenureSuitable = selectedTenure >= minTenure && selectedTenure <= maxTenure;
        } else {
            const maxTenure = parseInt(tenureRange.split(' ')[0]);
            isTenureSuitable = selectedTenure === maxTenure;
        }

        if (isTenureSuitable) {
            const loanInfo = { ...loan } as CarFilteredLoanInfo;
            loanInfo.selected_tenure = selectedTenure;

            // Extract and format interest rate range
            const interestRate = loan.interest_rate
                .replace('p.a.', '')
                .replace('%', '')
                .trim();

            let minRate: number;
            let maxRate: number;

            if (interestRate.indexOf('-') !== -1) {
                const [minRateStr, maxRateStr] = interestRate.split('-').map(rate => rate.trim());
                minRate = parseFloat(minRateStr);
                maxRate = parseFloat(maxRateStr);
            } else {
                minRate = maxRate = parseFloat(interestRate);
            }

            loanInfo.min_interest = minRate;
            loanInfo.max_interest = maxRate;

            // Calculate estimated monthly payment range
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

    return suitableLoans.sort((a, b) => a.min_interest - b.min_interest);
}

// Function to calculate total recurring payments
function calculateTotalRecurringPayments(recurringPayments: any): number {
    return Object.keys(recurringPayments).reduce((sum, key) => {
        return sum + recurringPayments[key];
    }, 0);
}

function calculateCurrentTotalLoanPayment(portfolio: BankPortfolio[]): number {
    return portfolio.reduce((total, bank) => {
        const bankTotal = bank.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
        return total + bankTotal;
    }, 0);
}

// Function to calculate DSR
export function calculateDSR(
    profile: PortfolioData,
    requestedLoanAmount: number,
    selectedTenure: number,
    monthlyIncome: number,
    selectedLoan: CarFilteredLoanInfo
): DSRCalculationResult {
    // Calculate current total monthly loan payments
    const currentTotalLoanPayment = calculateCurrentTotalLoanPayment(profile.portfolio);

    // Calculate total recurring payments using the helper function
    const totalRecurringPayment = calculateTotalRecurringPayments(profile.recurringPayments);

    // Calculate current monthly commitments
    const currentMonthlyCommitments = currentTotalLoanPayment + totalRecurringPayment;

    // Calculate new monthly loan payment (using average of min and max)
    const estimatedMonthlyPayment = (selectedLoan.estimated_monthly_min + selectedLoan.estimated_monthly_max) / 2;

    // Calculate new total monthly commitment
    const newMonthlyCommitment = currentMonthlyCommitments + estimatedMonthlyPayment;

    // Calculate DSR percentages
    const currentDSR = (currentMonthlyCommitments / monthlyIncome) * 100;
    const stressedDSR = (newMonthlyCommitment / monthlyIncome) * 100;

    // Check if eligible (example threshold of 70%)
    const isEligible = stressedDSR <= 70;

    return {
        currentDSR: Math.round(currentDSR * 100) / 100,
        stressedDSR: Math.round(stressedDSR * 100) / 100,
        monthlyCommitments: Math.round(currentMonthlyCommitments * 100) / 100,
        newMonthlyCommitment: Math.round(newMonthlyCommitment * 100) / 100,
        isEligible,
        selectedBank: selectedLoan.bank_name,
        estimatedMonthlyPayment: Math.round(estimatedMonthlyPayment * 100) / 100
    };
}


// Example calculation
export function calculateLoanEligibility(
    profile: PortfolioData,
    requestedAmount: number,
    tenure: number,
    monthlyIncome: number,
    loan: CarFilteredLoanInfo
) {

    try {
        const dsrResult = calculateDSR(profile, requestedAmount, tenure, monthlyIncome, loan);
        return dsrResult;
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log('An unknown error occurred');
        }
    }
}

// Define car loans data
export const carLoansData = {
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
};

// Example usage

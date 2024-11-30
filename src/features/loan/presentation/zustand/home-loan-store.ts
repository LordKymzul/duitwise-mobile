// Types and interfaces
interface HomeLoan {
    bank_name: string;
    monthly_payment: string;
    profit_rate: string;
    max_tenure: string;
    max_margin: string;
    lock_in_period: string;
    full_flexi_loan: string;
    remarks: string;
}

export interface FilteredLoanInfo {
    bank_name: string;
    profit_rate: string;
    max_tenure: string;
    max_margin: string;
    lock_in_period: string;
    full_flexi_loan: string;
    estimated_monthly: number;
    min_rate: number;
    max_rate: number;
    remarks: string;
}

interface HomeLoansData {
    home_loans: HomeLoan[];
}

/**
 * Filter home loans based on property value and various criteria.
 * 
 * @param propertyValue - Value of property (100k-2m)
 * @param loanPercentage - Desired loan percentage (50-100)
 * @param flexiLoan - Optional: Filter by flexi loan feature
 * @param financeType - Optional: 'islamic' or 'conventional'
 * @param lockInPeriod - Optional: Filter by lock in period presence
 * @param bankName - Optional: Filter by specific bank
 * @param maxTenureYears - Optional: Maximum loan tenure in years
 * @returns Array of filtered suitable loans
 */
export function filterHomeLoans(
    propertyValue: number,
    loanPercentage: number,
    flexiLoan?: boolean,
    financeType?: 'islamic' | 'conventional',
    lockInPeriod?: boolean,
    bankName?: string,
    maxTenureYears?: number
): FilteredLoanInfo[] {
    // Validate input parameters
    if (propertyValue < 100000 || propertyValue > 2000000) {
        throw new Error("Property value must be between RM 100,000 and RM 2,000,000");
    }
    if (loanPercentage < 50 || loanPercentage > 100) {
        throw new Error("Loan percentage must be between 50% and 100%");
    }

    // Calculate required loan amount
    const requiredLoan = propertyValue * (loanPercentage / 100);
    const suitableLoans: FilteredLoanInfo[] = [];

    homeLoansData.home_loans.forEach((loan) => {
        // Parse margin percentage
        const maxMargin = parseFloat(loan.max_margin.replace('%', ''));

        // Check if loan meets margin requirement
        if (loanPercentage > maxMargin) {
            return;
        }

        // Parse and check bank name if specified
        if (bankName && !loan.bank_name.split(' ')[0].toLowerCase().includes(bankName.toLowerCase())) {
            return;
        }

        // Check flexi loan preference if specified
        if (flexiLoan !== undefined) {
            const loanFlexi = loan.full_flexi_loan.toLowerCase() === 'yes';
            if (flexiLoan !== loanFlexi) {
                return;
            }
        }

        // Check finance type if specified
        if (financeType) {
            const isIslamic = loan.bank_name.toLowerCase().match(/-i|islamic|murabahah|takaful/) !== null;
            if ((financeType.toLowerCase() === 'islamic') !== isIslamic) {
                return;
            }
        }

        // Check lock in period if specified
        if (lockInPeriod !== undefined) {
            const hasLockIn = parseFloat(loan.lock_in_period.split(' ')[0]) > 0;
            if (lockInPeriod !== hasLockIn) {
                return;
            }
        }

        // Check tenure if specified
        if (maxTenureYears) {
            const loanMaxTenure = parseInt(loan.max_tenure.split(' ')[0]);
            if (maxTenureYears > loanMaxTenure) {
                return;
            }
        }

        // Calculate monthly payment for the required loan amount
        // Adjust the monthly payment based on the actual loan amount
        const adjustmentFactor = requiredLoan / 500000; // Original calculations based on 500k
        const monthlyPayment = parseFloat(loan.monthly_payment.replace('RM ', '').replace(',', '')) * adjustmentFactor;

        // Parse interest/profit rate
        const rate = loan.profit_rate.replace('%', '').trim();
        let minRate: number;
        let maxRate: number;

        if (rate.includes('-')) {
            [minRate, maxRate] = rate.split('-').map(r => parseFloat(r));
        } else {
            minRate = maxRate = parseFloat(rate);
        }

        // Create loan info object
        const loanInfo: FilteredLoanInfo = {
            bank_name: loan.bank_name,
            profit_rate: loan.profit_rate,
            max_tenure: loan.max_tenure,
            max_margin: loan.max_margin,
            lock_in_period: loan.lock_in_period,
            full_flexi_loan: loan.full_flexi_loan,
            estimated_monthly: Math.round(monthlyPayment * 100) / 100,
            min_rate: minRate,
            max_rate: maxRate,
            remarks: loan.remarks
        };

        suitableLoans.push(loanInfo);
    });

    // Sort by minimum interest/profit rate
    return suitableLoans.sort((a, b) => a.min_rate - b.min_rate);
}

// Example data structure
const homeLoansData: HomeLoansData = {
    "home_loans": [
        {
            "bank_name": "BOC Home Loan",
            "monthly_payment": "RM 2,117.35",
            "profit_rate": "3.88%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Effective lending Rate from 3.88% (*SBR + 0.88% p.a.)"
        },
        {
            "bank_name": "CIMB Flexi Home Financing-i",
            "monthly_payment": "RM 2,240.15",
            "profit_rate": "4.35%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Set up fee of RM200.00, Non rebated profit of RM40.00, Monthly service charge of RM10.00, 100% stamp duty waiver for conversion from conventional loan, Zero Moving cost is available but must be completed properties"
        },
        {
            "bank_name": "RHB My1 Full Flexi Home Loan",
            "monthly_payment": "RM 2,333.87",
            "profit_rate": "4.7%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Comprehensive Takaful coverage is optional, This package is for all individuals, joint applicants, residents, and non-residents"
        },
        {
            "bank_name": "Alliance Conventional Home Financing",
            "monthly_payment": "RM 2,555.05",
            "profit_rate": "5.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Basic term loan with optional overdraft facility, Allows for payment in excess of installment amount to reduce interest, Redraw facility, Effective interest will be determined by Alliance Bank upon approval, Applicable for ages 21 and above"
        },
        {
            "bank_name": "Maybank Houzkey",
            "monthly_payment": "RM 1,946.10",
            "profit_rate": "3.2%",
            "max_tenure": "35 Years",
            "max_margin": "100%",
            "lock_in_period": "1 Years",
            "full_flexi_loan": "Yes",
            "remarks": "100% financing, No payment during construction, Lowest monthly payment, Profit Rate only to be disclosed upon application approval"
        },
        {
            "bank_name": "Standard Chartered MortgageOne™",
            "monthly_payment": "RM 2,122.51",
            "profit_rate": "3.9%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Deposit to offset the loan outstanding balance for more interest savings, Full flexibility to access your 2in1 loan & deposit account anytime anywhere"
        },
        {
            "bank_name": "Standard Chartered Saadiq My HomeOne-i",
            "monthly_payment": "RM 2,122.51",
            "profit_rate": "3.9%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Deposit to offset the loan outstanding balance for more interest savings, Full flexibility to access your 2in1 loan & deposit account anytime anywhere"
        },
        {
            "bank_name": "Al-Amali Home Financing-i",
            "monthly_payment": "RM 2,253.42",
            "profit_rate": "4.4%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No Lock in Period, Debt Consolidation Available, Shariah-compliant"
        },
        {
            "bank_name": "SMART Mortgage Home Financing",
            "monthly_payment": "RM 2,266.73",
            "profit_rate": "4.45%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Processing fee waived, Stamp duty is waived, Peace of mind with MRTT coverage, Shariah-compliant"
        },
        {
            "bank_name": "BOC ECO Home Loan",
            "monthly_payment": "RM 2,109.64",
            "profit_rate": "3.85%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Effective lending Rate from 3.85% (*SBR + 0.85% p.a.)"
        },
        {
            "bank_name": "Bank Islam Baiti Home Financing",
            "monthly_payment": "RM 2,122.51",
            "profit_rate": "3.9%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Mortgage Reducing Term Takaful (MRTT) is required, Optional payment holiday in November and December"
        },
        {
            "bank_name": "Bank Islam Wahdah Home Refinancing",
            "monthly_payment": "RM 2,122.51",
            "profit_rate": "3.9%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Mortgage Reducing Term Takaful (MRTT) is required, Optional payment holiday in November and December"
        },
        {
            "bank_name": "Bank Rakyat Home Financing-i My 1st Home Scheme",
            "monthly_payment": "RM 2,174.39",
            "profit_rate": "4.1%",
            "max_tenure": "35 Years",
            "max_margin": "110%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No lock in period, First time home buyer, House Owner Takaful or Fire Takaful is required, Mortgage Reducing Term Takaful (MRTT) is required"
        },
        {
            "bank_name": "BSN MyHome (Residential Property)",
            "monthly_payment": "RM 2,174.39",
            "profit_rate": "4.1%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Mortgage Reducing Term Takaful (MRTT) is required, Can be used for undercontruction and completed property"
        },
        {
            "bank_name": "Bank Rakyat Home Financing-i",
            "monthly_payment": "RM 2,200.58",
            "profit_rate": "4.2%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No lock-in period, Collateral is required, House Owner Takaful or Fire Takaful is required, Mortgage Reducing Term Takaful (MRTT) is required"
        },
        {
            "bank_name": "KFH Ijarah Muntahia Bi Al-Tamlik Asset Acquisition Financing-i",
            "monthly_payment": "RM 2,200.58",
            "profit_rate": "4.2%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No lock in period, Property type is under construction, Profit rate is calculated monthly on reducing balance method, Lease-to-own"
        },
        {
            "bank_name": "Ijarah Mausufah Fi Zimmah Asset Acquisition Financing-i",
            "monthly_payment": "RM 2,200.58",
            "profit_rate": "4.2%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No lock in period, Property type is under construction, Profit rate is calculated monthly on reducing balance method, Forward Leasing"
        },
        {
            "bank_name": "Hong Leong Skim Rumah Pertamaku",
            "monthly_payment": "RM 2,213.73",
            "profit_rate": "4.25%",
            "max_tenure": "35 Years",
            "max_margin": "110%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "Up to 110% financing for property purchase price up to RM300,000, Up to 100% financing for property price more than RM300,000 to RM500,000"
        },
        {
            "bank_name": "Affin Home Solution Plus",
            "monthly_payment": "RM 2,226.92",
            "profit_rate": "4.3%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Interest computation on daily rest, Flexibility of payment in excess of loan installment amount, Flexibility of redrawing excess payment"
        },
        {
            "bank_name": "Affin My First Home Scheme",
            "monthly_payment": "RM 2,226.92",
            "profit_rate": "4.3%",
            "max_tenure": "35 Years",
            "max_margin": "100%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Malaysian citizen, First time home-buyer, Individuals up to 40 years old"
        },
        {
            "bank_name": "Affin Home-Step Fast-i",
            "monthly_payment": "RM 2,226.92",
            "profit_rate": "4.3%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Maximum Margin of Financing (MOF) for individual customer is up to 90% plus 5% on MRTT"
        },
        {
            "bank_name": "CM Flexi Property Financing-i",
            "monthly_payment": "RM 2,240.15",
            "profit_rate": "4.35%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "This facility is generally used to finance the purchase of fixed assets such as properties, machineries and working capital, This facility provides a flexible payment scheme, which would help in the management of finances, 1% late penalty fee, Fire Takaful coverage is compulsory"
        },
        {
            "bank_name": "Maybank Maxi Home Flexi",
            "monthly_payment": "RM 2,240.15",
            "profit_rate": "4.35%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "3 years lock in period, 1% penalty, Minimum withdrawal of RM5000 per transaction and multiply by RM1000 (Withdrawal fees of RM50 for each transaction), With MRTA, the rate will be 0.05% lower"
        },
        {
            "bank_name": "Muamalat SMART Mortgage SRP",
            "monthly_payment": "RM 2,240.15",
            "profit_rate": "4.35%",
            "max_tenure": "35 Years",
            "max_margin": "110%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "Financing of moving costs & expenses, Peace of mind with MRTT Coverage, Fully Shariah-compliant, For first time home buyer"
        },
        {
            "bank_name": "Muamalat SMART Mortgage FLEXI",
            "monthly_payment": "RM 2,240.15",
            "profit_rate": "4.35%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "Paying additional monthly payment can reduce principal balance immediately, Withdrawal of excess payments, MRTA, legal and valuation fees can be financed, Peace of mind with MRTT coverage, Fully Shariah compliant"
        },
        {
            "bank_name": "Bank Rakyat Home Financing-i Zero Entry Cost",
            "monthly_payment": "RM 2,253.42",
            "profit_rate": "4.4%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "No",
            "remarks": "5 years lock-in period, House Owner Takaful or Fire Takaful is required, Mortgage Reducing Term Takaful (MRTT) is required"
        },
        {
            "bank_name": "Maybank Commodity Murabahah Home Financing-i",
            "monthly_payment": "RM 2,266.73",
            "profit_rate": "4.45%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, No lock in period, Stamp duty exemption, For any individual or nationality, For salaried employee or self-employed, Higher financing eligibility of up to 70% of your gross income"
        },







        {
            "bank_name": "Maybank MaxiHome Ezy",
            "monthly_payment": "RM 2,266.73",
            "profit_rate": "4.45%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Start paying the full installment 6th years onwards, No penalty charges when you make extra payments or withdrawals, Applicable for Malaysian and foreigner, For completed and under construction residential properties"
        },
        {
            "bank_name": "MBSB Standard Home Financing-i",
            "monthly_payment": "RM 2,266.73",
            "profit_rate": "4.45%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Can be apply by any nationality, Early settlement fee is not applicable, Suitable for complete home, under construction or refinance, No processing fee, Celling Profit Rate capped at 11% p.a."
        },
        {
            "bank_name": "MBSB My First Home Scheme-i (FTBH)",
            "monthly_payment": "RM 2,266.73",
            "profit_rate": "4.45%",
            "max_tenure": "35 Years",
            "max_margin": "100%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Exclusively for the first-time home buyer, Valid for completed and under construction residential properties, Get rebates in case of early settlement of the loan, No early settlement charges, Applicable to age 40 and below only"
        },
        {
            "bank_name": "HomeSmart Mortgage",
            "monthly_payment": "RM 2,280.08",
            "profit_rate": "4.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Age: 21 - 65, Resident and non-resident, 3 years lock-in period, 1% penalty on loan size*remaining month/36 mth, Flexi account set up fees waived, commitment fees RM10 every month"
        },
        {
            "bank_name": "HomeSmart-i Mortgage",
            "monthly_payment": "RM 2,280.08",
            "profit_rate": "4.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "3 years lock in period, 2% penalty on loan size*remaining month/36 mth, Flexi account set up fees waived, commitment fees RM10 every month"
        },
        {
            "bank_name": "HSBC The Ideal Home Mortgage",
            "monthly_payment": "RM 2,280.08",
            "profit_rate": "4.5%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "As per the Stamp Duty Act 1949 (Revised 1989), Legal fees (and applicable tax, if any), Disbursement Including fees for registration of charge and other related charges"
        },
        {
            "bank_name": "Hong Leong Mortgage Plus",
            "monthly_payment": "RM 2,331.17",
            "profit_rate": "4.69%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "3 years lock in period, 1% penalty"
        },
        {
            "bank_name": "RHB Equity Home Financing-i",
            "monthly_payment": "RM 2,347.41",
            "profit_rate": "4.75%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, 3 year lock in period, Takaful insurance coverage not mandatory, For any nationality, salaried employee and self-employed"
        },
        {
            "bank_name": "RHB Commodity Murabahah Term Financing-i (CMTF-i) for Home",
            "monthly_payment": "RM 2,347.41",
            "profit_rate": "4.75%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, Lock in period: 3 years, Takaful insurance coverage not mandatory, Ceiling Profit Rate: 10.25% p.a."
        },
        {
            "bank_name": "Equity My First Home Financing-i",
            "monthly_payment": "RM 2,347.41",
            "profit_rate": "4.75%",
            "max_tenure": "35 Years",
            "max_margin": "100%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "Malaysian citizens, Only first-time home buyers, Joint account allowed, For private and public sector"
        },
        {
            "bank_name": "AIA Fixed Rate Mortgage",
            "monthly_payment": "RM 2,412.95",
            "profit_rate": "4.99%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "No",
            "remarks": "3% penalty fee, 5 year lock in period, Comprehensive Takaful coverage is required, For all individuals and permanent residents (at least 3 years with working permit for foreigners), If married to Malaysian spouse, must apply joint applicant"
        },
        {
            "bank_name": "Bank Rakyat Home Financing-i (Shophouse / Commercial)",
            "monthly_payment": "RM 2,415.70",
            "profit_rate": "5.0%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "No lock-in period, Mortgage Reducing Term Takaful (MRTT) is required, Mortgage for reconstruction and subsale, Within 20km radius from branch"
        },
        {
            "bank_name": "CIMB BizFlexi",
            "monthly_payment": "RM 2,457.12",
            "profit_rate": "5.15%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Set up fee of RM200, Monthly service charge of RM10, Monthly flexi charge / Non rebated profit of RM40"
        },
        {
            "bank_name": "CIMB Flexi Business Premises Financing-i",
            "monthly_payment": "RM 2,457.12",
            "profit_rate": "5.15%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Set up fee of RM200.00, Non rebated profit of RM40.00, Monthly service charge of RM10.00, 100% stamp duty waiver for conversion from conventional loan"
        },
        {
            "bank_name": "Home Loan",
            "monthly_payment": "RM 2,479.35",
            "profit_rate": "5.23%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": ""
        },
        {
            "bank_name": "Muamalat SMART Mortgage WAQF",
            "monthly_payment": "RM 2,487.70",
            "profit_rate": "5.26%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "Applicable for Residential and Commercial properties, Peace of mind with MRTT Coverage, Fully Shariah-compliant"
        },
        {
            "bank_name": "Al Rajhi Business Premises Financing",
            "monthly_payment": "RM 2,555.05",
            "profit_rate": "5.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "1% penalty fee, No lock in period, Comprehensive Takaful coverage provided, Only for Malaysians, For Salaried Employees and Self-employed"
        },
        {
            "bank_name": "Alliance i-Wish Home Financing-i",
            "monthly_payment": "RM 2,555.05",
            "profit_rate": "5.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Late Penalty Fee 1% p.a. of the outstanding amount, Early Settlement Fee 3% on the financing amount, Redemption Letter Fee RM50.00 per request, Letter for EPF Withdrawal Fee RM20.00 per request, Insurance Types Fire Takaful, MRTT"
        },
        {
            "bank_name": "Al Rajhi Home Financing-i",
            "monthly_payment": "RM 2,583.36",
            "profit_rate": "5.6%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, No lock in period, Comprehensive Takaful coverage provided, For Salaried Employees and Self-employed, Minimum age of 21 required, Applicable to salaried workers only"
        },
        {
            "bank_name": "CIMB BizFlexi Smart",
            "monthly_payment": "RM 2,611.80",
            "profit_rate": "5.7%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Redraw fee of RM25.00 via OTC/Branch/Contact Centre and RM 10.00 via CIMB Clicks per transaction regardless of the amount withdrawn"
        },
        {
            "bank_name": "CIMB BizFlexi Smart-i",
            "monthly_payment": "RM 2,611.80",
            "profit_rate": "5.7%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Redraw fee of RM25.00 via OTC/Branch/Contact Centre and RM 10.00 via CIMB Clicks per transaction regardless of the amount withdrawn"
        },
        {
            "bank_name": "Residential Vacant Land Flexi Smart-i",
            "monthly_payment": "RM 2,712.46",
            "profit_rate": "6.05%",
            "max_tenure": "30 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Extra payment may be used to reduce the principal amount (subject to express request), Deposit any amount at your convenience and withdraw excess funds at any time, Only for residential purposes"
        },
        {
            "bank_name": "CIMB HomeLoan",
            "monthly_payment": "RM 2,741.53",
            "profit_rate": "6.15%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Option of term loan and overdraft, Customer with OD facility only required to service interest, Statement – OD: Monthly; HomeLoan: Yearly, Prevailing Interest Rate and Default Clause"
        },




        {
            "bank_name": "CIMB HomeFlexi",
            "monthly_payment": "RM 2,741.53",
            "profit_rate": "6.15%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Set up fee of RM200, Monthly service charge of RM10, Monthly flexi charge / Non rebated profit of RM40"
        },
        {
            "bank_name": "CIMB HomeFlexi Smart",
            "monthly_payment": "RM 2,741.53",
            "profit_rate": "6.15%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "5 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Redraw fee of RM25.00 via OTC/Branch/Contact Centre and RM 10.00 via CIMB Clicks per transaction regardless of the amount withdrawn"
        },
        {
            "bank_name": "CIMB HomeFlexi Smart-i",
            "monthly_payment": "RM 2,741.53",
            "profit_rate": "6.15%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Redraw fee of RM25.00 via OTC/Branch/Contact Centre and RM 10.00 via CIMB Clicks per transaction regardless of the amount withdrawn"
        },
        {
            "bank_name": "CIMB Variable Home Financing-i",
            "monthly_payment": "RM 2,741.53",
            "profit_rate": "6.15%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "No",
            "remarks": "100% stamp duty waiver for conversion from conventional loan, Processing fee: Not applicable"
        },
        {
            "bank_name": "Public Bank Home Equity Financing-i",
            "monthly_payment": "RM 2,776.58",
            "profit_rate": "6.27%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, 3 year lock in period, Comprehensive Takaful coverage is compulsory, For any nationality, salaried employee and self-employed individual"
        },
        {
            "bank_name": "RHB Commodity Murabahah My First Home Financing-i",
            "monthly_payment": "RM 2,844.31",
            "profit_rate": "6.5%",
            "max_tenure": "35 Years",
            "max_margin": "100%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "Malaysian citizens, Only first-time home buyers, Joint account allowed, For private and public sector"
        },
        {
            "bank_name": "HomeSmart",
            "monthly_payment": "RM 2,885.86",
            "profit_rate": "6.64%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Stamp Duty As per the Stamp Act 1949 (Revised 1989), Legal Fees and Disbursement, Monthly Service Fee of RM10 plus 6% for Goods and Services Tax, Commitment Fee of RM40.00 if average outstanding balance is less than 50% of Facility limit"
        },
        {
            "bank_name": "UOB iNTELLIGENT Home Loan",
            "monthly_payment": "RM 3,180.43",
            "profit_rate": "7.61%",
            "max_tenure": "35 Years",
            "max_margin": "95%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "3 years lock-in period, 1% penalty fee, Fire Takaful is required, Mortgage Reducing Term Takaful (MRTT) is required"
        },
        {
            "bank_name": "Affin Home Flexi Plus",
            "monthly_payment": "RM 3,380.70",
            "profit_rate": "8.25%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "Interest computation on daily rest, Flexibility of payment in excess of loan installment amount, Flexibility of redrawing excess payment"
        },
        {
            "bank_name": "Public Bank 5 Home Plan",
            "monthly_payment": "RM 3,460.11",
            "profit_rate": "8.5%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "3 Years",
            "full_flexi_loan": "Yes",
            "remarks": "1% penalty fee, 3 year lock in period, For all individuals, joint applicants, residents, and non-residents"
        },
        {
            "bank_name": "Al Rajhi Malaysia My Second Home - MM2H",
            "monthly_payment": "RM 3,816.72",
            "profit_rate": "9.6%",
            "max_tenure": "35 Years",
            "max_margin": "90%",
            "lock_in_period": "0 Years",
            "full_flexi_loan": "No",
            "remarks": "1% penalty fee, No lock in period, Comprehensive Takaful coverage provided, For citizens of all countries recognised by Malaysia, For Salaried Employees and Self-employed, Applicants are allowed to bring their spouses and unmarried children below the age of 21 as dependants"
        }
    ]
};

// Example usage
try {
    const filteredLoans = filterHomeLoans(
        500000,    // property value
        80,        // loan percentage
        true,      // flexi loan
        'conventional', // finance type
        false,     // lock in period
        "Maybank", // bank name
        30         // max tenure years
    );


    console.log(`\nFound ${filteredLoans.length} matching loans:`);
    filteredLoans.forEach(loan => {
        console.log(`\nBank: ${loan.bank_name}`);
        console.log(`Interest/Profit Rate: ${loan.profit_rate}`);
        console.log(`Estimated Monthly Payment: RM ${loan.estimated_monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        console.log(`Maximum Tenure: ${loan.max_tenure}`);
        console.log(`Maximum Margin: ${loan.max_margin}`);
        console.log(`Lock-in Period: ${loan.lock_in_period}`);
        console.log(`Full Flexi Loan: ${loan.full_flexi_loan}`);
        console.log(`Remarks: ${loan.remarks}`);
    });


} catch (error) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    } else {
        console.log('An unknown error occurred');
    }
}
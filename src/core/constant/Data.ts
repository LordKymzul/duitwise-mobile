import { PortfolioEntity } from "src/features/portfolio/entities/portfolio-entity"
import { PATHS } from "./Paths"




export interface TransactionDetailsEntity {
    totalBalance: string,
    percentageBalance: number,
    financialFitness: string,
    transactions: TransactionItemEntity[]
}

export type TransactionItemEntity = {
    transactionName: string,
    value: number,
    stressLevel: string,
    date: Date,
    imageURL: string,
    bankName: string
}

export const PortfoliosData: PortfolioEntity[] = [

    {
        name: "Maybank",
        amount: 1000,
        imageURL: PATHS.maybankLogo,
    },
    {
        name: "Bank Islam",
        amount: 1000,
        imageURL: PATHS.bankIslamLogo,
    },
    {
        name: "CIMB",
        amount: 1000,
        imageURL: PATHS.cimbLogo,
    },
    {
        name: "GXBank",
        amount: 1000,
        imageURL: PATHS.gxBankLogo,
    },

]


export const TransactionDetailsData: TransactionDetailsEntity = {
    "totalBalance": "8970.70",
    "percentageBalance": -8.19,
    "financialFitness": "High",
    "transactions": [
        {
            "transactionName": "Grab Food Payment",
            "value": 65.00,
            "stressLevel": "Income",
            "date": new Date("2024-11-05"),
            "imageURL": "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
            "bankName": "Maybank"
        },
        {
            "transactionName": "Mixue",
            "value": -25.00,
            "stressLevel": "Low Stress",
            "date": new Date("2024-11-12"),
            "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFCjKjcs1WA5ukidMQlJmxU4ugsOjHKiT7g&s",
            "bankName": "CIMB GX"
        },
        {
            "transactionName": "Petronas",
            "value": -120.00,
            "stressLevel": "High Stress",
            "date": new Date("2024-11-15"),
            "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaHb9QDf4D5YZhZPGPa7IIPqKeg0dtunF7Q&s",
            "bankName": "Bank Islam"
        },
        {
            "transactionName": "Grab Food Payment",
            "value": 55.00,
            "stressLevel": "Income",
            "date": new Date("2024-11-10"),
            "imageURL": "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
            "bankName": "CIMB GX"
        },
        {
            "transactionName": "Spotify",
            "value": -15.00,
            "stressLevel": "Low Stress",
            "date": new Date("2024-11-18"),
            "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png",
            "bankName": "Maybank"
        },
        {
            "transactionName": "Grab Food Payment",
            "value": 80.00,
            "stressLevel": "Income",
            "date": new Date("2024-11-22"),
            "imageURL": "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
            "bankName": "Bank Islam"
        },
        {
            "transactionName": "Netflix",
            "value": -40.00,
            "stressLevel": "Medium Stress",
            "date": new Date("2024-11-20"),
            "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRve9x5ZnT0PqbX85-VVQfFVYJ-aHTJU_aBAQ&s",
            "bankName": "CIMB GX"
        }
    ]
}

// Sample data
export const carLoansData = {
    car_loans: [
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


// Interfaces
export interface PortfolioData {
    portfolio: BankPortfolio[];
    recurringPayments: RecurringPayments;
}

export interface BankPortfolio {
    bankName: string;
    totalBalance: number;
    imageURL: string;
    loans: Loan[];
}

export interface Loan {
    type: string;
    nextPaymentDate: Date;
    totalLoan: number;
    monthlyPayment: number;
    details: LoanDetails;
    status: LoanStatus;
    loanDetails: ExtendedLoanDetails;
}

export interface LoanDetails {
    principalAndInterest: number;
    insurancePremium: number;
    maintenanceReserve: number;
}

export interface LoanStatus {
    activeStatus: string;
    paymentStatus: boolean;
}

export interface ExtendedLoanDetails {
    loanName: string;
    duration: string;
    loanReleaseDate: Date;
    maturityDate: Date;
    balance: number;
    interestRate: string;
    percentage: number;
    loanHistory: LoanHistoryEntry[];
}

export interface LoanHistoryEntry {
    date: Date;
    urlBankImage: string;
    paidAmount: number;
}

export interface RecurringPayments {
    Netflix: number;
    Spotify: number;
    YouTube: number;
    Apple: number;
}

// Data
export const portfolioData: PortfolioData = {
    portfolio: [
        {
            bankName: "Maybank",
            totalBalance: 125000,
            imageURL: PATHS.maybankLogo,
            loans: [
                {
                    type: "House Loan",
                    nextPaymentDate: new Date("2024-12-15"),
                    totalLoan: 650910,
                    monthlyPayment: 2800,
                    details: {
                        principalAndInterest: 2200,
                        insurancePremium: 300,
                        maintenanceReserve: 300
                    },
                    status: {
                        activeStatus: "active",
                        paymentStatus: true
                    },
                    loanDetails: {
                        loanName: "House Loan",
                        duration: "15 years",
                        loanReleaseDate: new Date("2021-01-23"),
                        maturityDate: new Date("2036-01-24"),
                        balance: 580000,
                        interestRate: "3.94%",
                        percentage: 68,
                        loanHistory: [
                            {
                                date: new Date("2021-01-23"),
                                urlBankImage: "http://example.com/maybank1.png",
                                paidAmount: 2800
                            },
                            {
                                date: new Date("2021-02-23"),
                                urlBankImage: "http://example.com/maybank2.png",
                                paidAmount: 2800
                            }
                        ]
                    }
                },
                {
                    type: "Car Loan",
                    nextPaymentDate: new Date("2024-12-20"),
                    totalLoan: 95000,
                    monthlyPayment: 1500,
                    details: {
                        principalAndInterest: 1300,
                        insurancePremium: 100,
                        maintenanceReserve: 100
                    },
                    status: {
                        activeStatus: "active",
                        paymentStatus: true
                    },
                    loanDetails: {
                        loanName: "Car Loan",
                        duration: "7 years",
                        loanReleaseDate: new Date("2023-08-15"),
                        maturityDate: new Date("2030-08-15"),
                        balance: 88500,
                        interestRate: "3.75%",
                        percentage: 35,
                        loanHistory: [
                            {
                                date: new Date("2023-08-15"),
                                urlBankImage: "http://example.com/maybank3.png",
                                paidAmount: 1500
                            },
                            {
                                date: new Date("2023-09-15"),
                                urlBankImage: "http://example.com/maybank4.png",
                                paidAmount: 1500
                            }
                        ]
                    }
                }
            ]
        },
        {
            bankName: "CIMB",
            totalBalance: 85000,
            imageURL: PATHS.cimbLogo,
            loans: [
                {
                    type: "Car Loan",
                    nextPaymentDate: new Date("2024-12-25"),
                    totalLoan: 75000,
                    monthlyPayment: 1200,
                    details: {
                        principalAndInterest: 1000,
                        insurancePremium: 100,
                        maintenanceReserve: 100
                    },
                    status: {
                        activeStatus: "active",
                        paymentStatus: true
                    },
                    loanDetails: {
                        loanName: "Car Loan",
                        duration: "5 years",
                        loanReleaseDate: new Date("2023-06-01"),
                        maturityDate: new Date("2028-06-01"),
                        balance: 68000,
                        interestRate: "4.50%",
                        percentage: 45,
                        loanHistory: [
                            {
                                date: new Date("2023-06-01"),
                                urlBankImage: "http://example.com/cimb1.png",
                                paidAmount: 1200
                            },
                            {
                                date: new Date("2023-07-01"),
                                urlBankImage: "http://example.com/cimb2.png",
                                paidAmount: 1200
                            }
                        ]
                    }
                }
            ]
        },
        {
            bankName: "Bank Islam",
            totalBalance: 75000,
            imageURL: PATHS.bankIslamLogo,
            loans: []
        },
        {
            bankName: "GXBank",
            totalBalance: 45000,
            imageURL: PATHS.gxBankLogo,
            loans: []
        }
    ],
    recurringPayments: {
        Netflix: 54.90,
        Spotify: 23.90,
        YouTube: 17.90,
        Apple: 39.90
    }
};
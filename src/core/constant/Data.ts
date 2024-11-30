import { PATHS } from "./Paths";

// Interfaces
export interface PortfolioData {
    portfolio: BankPortfolio[];
    recurringPayments: RecurringPayments;
    transactionDetails: TransactionDetailsEntity;
}

export interface BankPortfolio {
    bankName: string;
    totalBalance: number;
    imageURL: string;
    loans: Loan[];
    assets: Asset[]
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

export interface Asset {
    id: string;
    type: string;
    balance: number;
}

// export interface Transaction {
//     transactionName: string;
//     value: number;
//     stressLevel: string;
//     date: Date;
//     imageURL: string;
//     bankName: string;
// }

// export interface TransactionDetails {
//     totalBalance: number;
//     percentageBalance: number;
//     financialFitness: string;
//     transactions: Transaction[];
// }
export interface TransactionDetailsEntity {
    totalBalance: number,
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


export const TransactionDetailsData: TransactionDetailsEntity = {
    totalBalance: 8545.30,
    percentageBalance: -8.19,
    financialFitness: "High",
    transactions: [
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

// Data
export const portfolioData: PortfolioData = {
    portfolio: [
        {
            bankName: "Maybank",
            totalBalance: 125000,
            imageURL: PATHS.maybankLogo,
            loans: [
                {
                    type: "House Loan 🏡",
                    nextPaymentDate: new Date("2024-12-15"),
                    totalLoan: 650910,
                    monthlyPayment: 400,
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
                    type: "Car Loan 🚗",
                    nextPaymentDate: new Date("2024-12-20"),
                    totalLoan: 95000,
                    monthlyPayment: 500,
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
            ],
            assets: [{
                id: "5435123456789001",
                type: "Tabung Haji",
                balance: 5000
            },
            {
                id: "5345234567891002",
                type: "ASNB Account",
                balance: 4000
            },
            {
                id: "2344234567891003",
                type: "Gold Investment Account",
                balance: 8000
            },
            {
                id: "6354234567891004",
                type: "Unit Trust",
                balance: 3000
            }]
        },
        {
            bankName: "CIMB",
            totalBalance: 85000,
            imageURL: PATHS.cimbLogo,
            loans: [
                {
                    type: "Car Loan 🚗",
                    nextPaymentDate: new Date("2024-12-25"),
                    totalLoan: 75000,
                    monthlyPayment: 500,
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
            ],
            assets: [
                {
                    id: "5435123456789001",
                    type: "Tabung Haji",
                    balance: 5000
                },
                {
                    id: "5345234567891002",
                    type: "ASNB Account",
                    balance: 4000
                },
                {
                    id: "2344234567891003",
                    type: "Gold Investment Account",
                    balance: 8000
                },
                {
                    id: "6354234567891004",
                    type: "Unit Trust",
                    balance: 3000
                }
            ]
        },
        {
            bankName: "Bank Islam",
            totalBalance: 75000,
            imageURL: PATHS.bankIslamLogo,
            loans: [],
            assets: []
        },
        {
            bankName: "GXBank",
            totalBalance: 45000,
            imageURL: PATHS.gxBankLogo,
            loans: [],
            assets: []
        }
    ],
    recurringPayments: {
        Netflix: 54.90,
        Spotify: 23.90,
        YouTube: 17.90,
        Apple: 39.90
    },

    transactionDetails: {
        totalBalance: 8545.30,
        percentageBalance: -8.19,
        financialFitness: "High",
        transactions: [
            {
                transactionName: "Grab Food Payment",
                value: 65.00,
                stressLevel: "Income",
                date: new Date("2024-11-05"),
                imageURL: "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
                bankName: "Maybank"
            },
            {
                transactionName: "Mixue",
                value: -25.00,
                stressLevel: "Low Stress",
                date: new Date("2024-11-12"),
                imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFCjKjcs1WA5ukidMQlJmxU4ugsOjHKiT7g&s",
                bankName: "CIMB"
            },
            {
                transactionName: "Petronas",
                value: -120.00,
                stressLevel: "High Stress",
                date: new Date("2024-11-15"),
                imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaHb9QDf4D5YZhZPGPa7IIPqKeg0dtunF7Q&s",
                bankName: "Bank Islam"
            },
            {
                transactionName: "Grab Food Payment",
                value: 55.00,
                stressLevel: "Income",
                date: new Date("2024-11-10"),
                imageURL: "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
                bankName: "CIMB"
            },
            {
                transactionName: "Spotify",
                value: -15.00,
                stressLevel: "Low Stress",
                date: new Date("2024-11-18"),
                imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png",
                bankName: "Maybank"
            },
            {
                transactionName: "Grab Food Payment",
                value: 80.00,
                stressLevel: "Income",
                date: new Date("2024-11-22"),
                imageURL: "https://seeklogo.com/images/G/grab-logo-7020E74857-seeklogo.com.png",
                bankName: "Bank Islam"
            },
            {
                transactionName: "Netflix",
                value: -40.00,
                stressLevel: "Medium Stress",
                date: new Date("2024-11-20"),
                imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRve9x5ZnT0PqbX85-VVQfFVYJ-aHTJU_aBAQ&s",
                bankName: "CIMB"
            },
            {
                transactionName: "Shopee Purchase",
                value: -156.90,
                stressLevel: "Medium Stress",
                date: new Date("2024-11-25"),
                imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freelogovectors.net%2Fshopee-logo-02%2F&psig=AOvVaw0hKw5OkmsLVaejF7QrIqlr&ust=1733025029940000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjIrr2Tg4oDFQAAAAAdAAAAABAE",
                bankName: "CIMB"
            },
            {
                transactionName: "Lazada Shopping",
                value: -234.50,
                stressLevel: "Medium Stress",
                date: new Date("2024-11-24"),
                imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscvglobal.com.my%2Fblogs%2Fnews%2Flazada-fastest-growth-award-on-2017&psig=AOvVaw1Psh8sXo7gTgVLupyfZrU6&ust=1733025074930000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPjY2tGTg4oDFQAAAAAdAAAAABAS",
                bankName: "GXBank"
            },
            {
                transactionName: "Nasi Lemak Burung Hantu",
                value: -98.40,
                stressLevel: "Low Stress",
                date: new Date("2024-11-23"),
                imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffoodie.asia%2Flisting%2Fnasi-lemak-burung-hantu&psig=AOvVaw0GizZT8Aid58A8dsWePJ6S&ust=1733025203815000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDXspCUg4oDFQAAAAAdAAAAABAE",
                bankName: "CIMB"
            },
            {
                transactionName: "Online Course Payment",
                value: -299.00,
                stressLevel: "Medium Stress",
                date: new Date("2024-11-22"),
                imageURL: "https://play.google.com/store/apps/details/Udemy_Online_Courses?id=com.udemy.android&hl=en_NZ",
                bankName: "Maybank"
            },
            {
                transactionName: "Aeon Supermarket",
                value: -245.30,
                stressLevel: "Medium Stress",
                date: new Date("2024-11-21"),
                imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Faeonretail.my%2F&psig=AOvVaw2-RvCzjJrUc8Z3Bd17YpDq&ust=1733025261465000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjc4qqUg4oDFQAAAAAdAAAAABAE",
                bankName: "GXBank"
            },
            {
                transactionName: "Payment",
                value: 2000.00,
                stressLevel: "Income",
                date: new Date("2024-11-20"),
                imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fsimple-money-transfer-logo-concept-design-icon-vector-27358697&psig=AOvVaw0cg4cCe2N6jQfwizomLydf&ust=1733025325195000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPjjj8qUg4oDFQAAAAAdAAAAABAE",
                bankName: "Bank Islam"
            },
            {
                transactionName: "Te",
                value: -89.90,
                stressLevel: "Low Stress",
                date: new Date("2024-11-19"),
                imageURL: "https://www.google.com/imgres?q=umobile&imgurl=https%3A%2F%2Fwww.u.com.my%2Fcontent%2Fdam%2Fu-mobile%2Fpersonal%2Fmeta-images-en%2Fdefault-metaimage-umobile-logo.png&imgrefurl=https%3A%2F%2Fwww.u.com.my%2Fen%2Fpersonal%2Fhome&docid=Wn91wNpZZ3iTnM&tbnid=JiAHnq36oLEt9M&vet=12ahUKEwitlcrclIOKAxWFe_UHHd8cIacQM3oECBcQAA..i&w=1200&h=630&hcb=2&ved=2ahUKEwitlcrclIOKAxWFe_UHHd8cIacQM3oECBcQAA",
                bankName: "CIMB"
            },
        ]
    }
};


export const portfolioCharts = [
    {
        "bankName": "Maybank",
        "bankBalances": [
            {
                "xValue": new Date("2024-11-05"),
                "yValue": 65.00
            },
            {
                "xValue": new Date("2024-11-08"),
                "yValue": 72.50
            },
            {
                "xValue": new Date("2024-11-12"),
                "yValue": 58.75
            },
            {
                "xValue": new Date("2024-11-15"),
                "yValue": 67.25
            },
            {
                "xValue": new Date("2024-11-18"),
                "yValue": 63.40
            },
            {
                "xValue": new Date("2024-11-21"),
                "yValue": 69.80
            }
        ]
    },
    {
        "bankName": "CIMB",
        "bankBalances": [
            {
                "xValue": new Date("2024-11-05"),
                "yValue": 65.00
            },
            {
                "xValue": new Date("2024-11-08"),
                "yValue": 63.20
            },
            {
                "xValue": new Date("2024-11-12"),
                "yValue": 68.90
            },
            {
                "xValue": new Date("2024-11-15"),
                "yValue": 71.30
            },
            {
                "xValue": new Date("2024-11-18"),
                "yValue": 70.15
            },
            {
                "xValue": new Date("2024-11-21"),
                "yValue": 73.45
            }
        ]
    },
    {
        "bankName": "GXBank",
        "bankBalances": [
            {
                "xValue": new Date("2024-11-05"),
                "yValue": 58.20
            },
            {
                "xValue": new Date("2024-11-08"),
                "yValue": 61.40
            },
            {
                "xValue": new Date("2024-11-12"),
                "yValue": 59.85
            },
            {
                "xValue": new Date("2024-11-15"),
                "yValue": 63.70
            },
            {
                "xValue": new Date("2024-11-18"),
                "yValue": 62.90
            },
            {
                "xValue": new Date("2024-11-21"),
                "yValue": 65.30
            }
        ]
    },
    {
        "bankName": "Bank Islam",
        "bankBalances": [
            {
                "xValue": new Date("2024-11-05"),
                "yValue": 61.50
            },
            {
                "xValue": new Date("2024-11-08"),
                "yValue": 63.80
            },
            {
                "xValue": new Date("2024-11-12"),
                "yValue": 62.95
            },
            {
                "xValue": new Date("2024-11-15"),
                "yValue": 65.40
            },
            {
                "xValue": new Date("2024-11-18"),
                "yValue": 67.20
            },
            {
                "xValue": new Date("2024-11-21"),
                "yValue": 68.75
            }
        ]
    }
]

export function calculateTotalMonthlyPayments(): number {
    // Calculate loan payments
    const totalLoanPayments = portfolioData.portfolio.reduce((total, bank) => {
        const bankMonthlyPayments = bank.loans.reduce((bankTotal, loan) => {
            return bankTotal + loan.monthlyPayment;
        }, 0);
        return total + bankMonthlyPayments;
    }, 0);

    // Calculate recurring payments
    const totalRecurringPayments = Object.values(portfolioData.recurringPayments)
        .reduce((total, payment) => total + payment, 0);

    // Combine both totals
    return totalLoanPayments + totalRecurringPayments;
}

export const calculateTotalBalance = (): number => {
    return portfolioData.portfolio.reduce((total, bank) => total + bank.totalBalance, 0);
}

// Example usage:
const totalMonthlyPayments = calculateTotalMonthlyPayments();
// Returns 5636.60 (Loans: 5500 + Recurring: 136.60)
// // Interfaces
// export interface PortfolioData {
//     portfolio: BankPortfolio[];
//     recurringPayments: RecurringPayments;
//     transactionDetails: TransactionDetails;
// }

// export interface BankPortfolio {
//     bankName: string;
//     totalBalance: number;
//     imageURL: string;
//     loans: Loan[];
//     assets: Asset[]
// }

// export interface Loan {
//     type: string;
//     nextPaymentDate: Date;
//     totalLoan: number;
//     monthlyPayment: number;
//     details: LoanDetails;
//     status: LoanStatus;
//     loanDetails: ExtendedLoanDetails;
// }

// export interface LoanDetails {
//     principalAndInterest: number;
//     insurancePremium: number;
//     maintenanceReserve: number;
// }

// export interface LoanStatus {
//     activeStatus: string;
//     paymentStatus: boolean;
// }

// export interface ExtendedLoanDetails {
//     loanName: string;
//     duration: string;
//     loanReleaseDate: Date;
//     maturityDate: Date;
//     balance: number;
//     interestRate: string;
//     percentage: number;
//     loanHistory: LoanHistoryEntry[];
// }

// export interface LoanHistoryEntry {
//     date: Date;
//     urlBankImage: string;
//     paidAmount: number;
// }

// export interface RecurringPayments {
//     Netflix: number;
//     Spotify: number;
//     YouTube: number;
//     Apple: number;
// }

// export interface Asset {
//     id: string;
//     type: string;
//     balance: number;
// }

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
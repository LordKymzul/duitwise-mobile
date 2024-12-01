import { RouteProp } from "@react-navigation/native";
import { BankPortfolio, Loan } from "src/core/constant/Data";
import { ReceiptEntity } from "src/features/receipt/presentation/view/components/recepit-card";
import { TransactionItem } from "src/types/transaction";

export type RootStackParams = {
    Home: undefined,
    Portfolio: undefined,
    PortfolioLoanDetail: { loan: Loan },
    Transaction: undefined,
    TransactionDetails: { transaction: TransactionItem },
    ReceiptDetail: { receipt: ReceiptEntity },
    ReceiptAttached: { receipt: ReceiptAttachedEntity },
    LoginPortfolio: {
        bank: BankPortfolio
    },
    MainBottomNavbar: undefined,
    SuccessScreen: {
        title: string;
        description: string;
    }
}

export interface ReceiptAttachedEntity {
    receiptImage: string;
    receiptName: string;
    price: number;
    date: Date;
}



export type LoginPortfolioScreenRouteProp = RouteProp<RootStackParams, 'LoginPortfolio'>;
export type PortfolioLoanDetailScreenRouteProp = RouteProp<RootStackParams, 'PortfolioLoanDetail'>;
export type TransactionDetailsScreenRouteProp = RouteProp<RootStackParams, 'TransactionDetails'>;
export type ReceiptDetailScreenRouteProp = RouteProp<RootStackParams, 'ReceiptDetail'>;
export type ReceiptAttachedScreenRouteProp = RouteProp<RootStackParams, 'ReceiptAttached'>;
export type SuccessScreenRouteProp = RouteProp<RootStackParams, 'SuccessScreen'>;

import { RouteProp } from "@react-navigation/native";
import { Loan } from "src/core/constant/Data";
import { ReceiptEntity } from "src/features/receipt/presentation/view/components/recepit-card";
import { TransactionItem } from "src/types/transaction";

export type RootStackParams = {
    // CryptoDetail: {
    //     id: string;
    //     symbol?: string | null;
    // },
    // Settings: undefined,
    // CryptoSearch: undefined,
    // CryptoFilterModal: undefined,
    // MoozoneActive: {
    //     moozones: MoozoneEntity[];
    // },
    Portfolio: undefined,
    PortfolioLoanDetail: { loan: Loan },
    Transaction: undefined,
    TransactionDetails: { transaction: TransactionItem },
    ReceiptDetail: { receipt: ReceiptEntity },
    ReceiptAttached: { receipt: ReceiptAttachedEntity }

}

export interface ReceiptAttachedEntity {
    receiptImage: string;
    receiptName: string;
    price: number;
    date: Date;
}


export type PortfolioLoanDetailScreenRouteProp = RouteProp<RootStackParams, 'PortfolioLoanDetail'>;
export type TransactionDetailsScreenRouteProp = RouteProp<RootStackParams, 'TransactionDetails'>;
export type ReceiptDetailScreenRouteProp = RouteProp<RootStackParams, 'ReceiptDetail'>;
export type ReceiptAttachedScreenRouteProp = RouteProp<RootStackParams, 'ReceiptAttached'>;

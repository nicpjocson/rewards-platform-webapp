import { 
	Transaction as _Transaction, 
	TransactionType as _TransactionType 
} from '@prisma/client';
import { Code } from './Shop';

type CartItem = {
	shopName: string;
	productName: string;
	quantity: number;
}
export type TransactionCart = CartItem[]
export type DBTransaction = _Transaction;
export type Transaction = _Transaction & {
	items: Code[];
};
export const transactionSelection = {
	include: {
		items: {
			select: {
				code: true,
				shopName: true,
				productName: true
			}
		}
	}
}
export type TransactionItem = Code;
export type TransactionType = _TransactionType;
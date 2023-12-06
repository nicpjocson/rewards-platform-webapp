import { 
	Shop as _Shop, 
	ProductH as _Product, 
	Code as _Code, 
	ProductCategory 
} from '@prisma/client';
import { mapProduct } from './AdminShop';

export const codeSelection = {
  select: {
	productName: true,
	shopName: true,
	code: true
  }
}
export type CodeId = [shopName: string, codeName: string];
export type Code = Pick<_Code, "productName" | "shopName" | "code">

export type ProductId = [shopName: string, productName: string];
export type Product = Pick<_Product, "name" | "shopName" | "price" | "tos" | "details" | "category"> & {
	stock: number,
	sales: number,
}
export type DBProduct = {
  product: Omit<Product, 'stock' | 'sales'> & {
	_count: { purchasedCodes: number }
  }
  _count: { codes: number }
}
export const productSelection = {
  select: {
	product: {
	  select: {
		name: true,
		shopName: true,
		price: true,
		tos: true,
		details: true,
		category: true,
		_count: {
		  select: {
			purchasedCodes: true
		  }
		}
	  },
	},
	_count: {
	  select: {
		codes: {
		  where: {
			isUsed: null
		  }
		}
	  }
	}
  }
}
export const shopSelection = {
  select: {
	name: true,
	products: productSelection
  }
}
export type Shop = Pick<_Shop, "name"> & {
	products: Product[]
}
export type DBShop = {
	name: string,
	products: DBProduct[]
}
export const mapShop = (shop: DBShop): Shop => ({
	name: shop.name,
	products: shop.products?.map(mapProduct)
})

export const CategoryMap: Record<ProductCategory, string> = {
	BF: "Beauty & Fashion",
	DS: "Department Stores",
	EL: "Electronics",
	FD: "Food & Drinks",
	GM: "Gaming",
	HB: "Hobbies",
	LS: "Lifestyle",
	TR: "Travel",
	OS: "Online Shopping",
}
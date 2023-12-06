import prisma from '@/lib/prisma/prisma';
import { withAdmin, withOptionalUser } from '@/lib/session/withUser';
import { mapProduct, adminProductSelection } from '@/lib/types/AdminShop';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '../validate';
import { productSelection } from '@/lib/types/Shop';
type Params = {
	params: {
		name: string;
		productName: string;
	}
}

export const GET = withOptionalUser(async (req, {params: { name, productName }}: Params) => {
	try {
		const selection = req.isAdmin === true ? adminProductSelection : productSelection;
		const product = await prisma.product.findUnique({
			where: {
				name_shopName: {
					name: productName,
					shopName: name
				},
			},
			...selection,
		});
		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, {status: 404});
		}
		return NextResponse.json({ product: mapProduct(product) });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Product not found' }, {status: 404});
	}
})

export const PATCH = withAdmin(async (req, {params: { name: shopName, productName }}: Params) => {
  try {
	const data = validate(await req.json());
	if (typeof data === 'string')
		return NextResponse.json({ error: data }, {status: 400});
	const prod = await prisma.product.findUnique({
		where: {
			name_shopName: {
				name: productName,
				shopName: shopName
			},
		},
		select: {
			id: true,
			shopId: true,
			version: true
		}
	});
	if (!prod)
		return NextResponse.json({ error: 'Product not found' }, {status: 404});
	await prisma.product.update({
	  where: {
		name_shopName: {
		  name: productName,
		  shopName
		},
	  },
	  data: {
		product: {
		  create: {
			shop: {
			  connect: {
				id: prod.shopId
			  }
			},
			...data,
			version: prod.version + 1,
			id: prod.id
		  }
		}
	  }
	});
	// update returns null for some reason
	// query again to get the updated product
	const product = await prisma.product.findUniqueOrThrow({
		where: { id: prod.id },
		...adminProductSelection
	});
	return NextResponse.json({ product: mapProduct(product) });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, productName }}: Params) => {
  try {
	const product = await prisma.product.delete({
		where: {
			name_shopName: {
				name: productName,
				shopName: name
			},
		},
		...adminProductSelection
	});
	return NextResponse.json({ product: mapProduct(product) });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
});
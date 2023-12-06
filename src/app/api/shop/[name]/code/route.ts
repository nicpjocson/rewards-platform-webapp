import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { adminCodeSelection } from '@/lib/types/AdminShop';
import { NextRequest, NextResponse } from 'next/server';
type Params = {
	params: {
		name: string;
	}
}

export const POST = withAdmin(async (req: NextRequest, {params: { name: shopName }}: Params) => {
  try {
	const { code, productName } = await req.json();
	if (!code || typeof code !== 'string')
		return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
	if (!productName || typeof productName !== 'string')
		return NextResponse.json({ error: 'Invalid product name' }, { status: 400 });
	const newCode = await prisma.code.create({
		data: {
			code,
			product: {
				connect: {
					name_shopName: {
						name: productName,
						shopName
					}
				}
			},
		},
		select: adminCodeSelection.select
	});
	return NextResponse.json({ code: newCode }, { status: 201 });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});

export const DELETE = withAdmin(async (req: NextRequest, {params: { name: shopName }}: Params) => {
  try {
	const { codes } = await req.json();
	if (!codes || !Array.isArray(codes))
		return NextResponse.json({ error: 'Invalid codes' }, { status: 400 });
	if (codes.some(code => typeof code !== 'string'))
		return NextResponse.json({ error: 'Invalid codes' }, { status: 400 });

	await prisma.code.deleteMany({
		where: {
			shopName,
			code: {
				in: codes
			},
			NOT: {
				isUsed: null
			}
		}
	});
	return NextResponse.json({ success: true });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
});
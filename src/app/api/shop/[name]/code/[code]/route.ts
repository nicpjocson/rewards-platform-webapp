import prisma from '@/lib/prisma/prisma';
import { withAdmin } from '@/lib/session/withUser';
import { adminCodeSelection } from '@/lib/types/AdminShop';
import { NextRequest, NextResponse } from 'next/server';
type Params = {
	params: {
		name: string;
		code: string;
	}
}

export const PATCH = withAdmin(async (req: NextRequest, {params: { name, code }}: Params) => {
  try {
	const { code: newCode } = await req.json();
	const a = await prisma.code.update({
		where: {
			code_shopName: {
				code,
				shopName: name
			},
		},
		data: {
			code: newCode
		},
		select: adminCodeSelection.select
	});
	return NextResponse.json({ code: a });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});

export const DELETE = withAdmin(async (_: NextRequest, {params: { name, code }}: Params) => {
  try {
	const a = await prisma.code.delete({
		where: {
			code_shopName: {
				code: code,
				shopName: name
			},
			NOT: {
				isUsed: null
			}
		},
		select: adminCodeSelection.select
	});
	return NextResponse.json({ code: a });
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Something went wrong" }, {status: 500});
  }
});
"use client"
import React from "react";
import { CardPage } from "@/components/CardPage/CardPage";
import UserCard, { UserCardOutput } from "./UserCard";
import DetailsCard, { DetailsCardOutput } from "./DetailsCard";
import { useRouter } from "next/navigation"
import { DefaultToastContainer } from "@/components/Providers/Forms";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function SignupPage() {
	const [ data1, setData1 ] = React.useState<UserCardOutput | null>(null);
	const [ data2, setData2 ] = React.useState<DetailsCardOutput | null>(null);
	const [ step, setStep ] = React.useState(0);

	const handleSubmit = async (data: UserCardOutput & DetailsCardOutput) => {
		const res = await fetch('/api/profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...data, confirmPassword: undefined }),
		})
		const json = await res.json();
		if (res.ok) {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false
			  });
			if (res?.error)
				toast.error(res.error);
			else
				router.push('/');
		} else {
			toast.error(json.message)
		}
	}

	const router = useRouter();
	return (
		<>
		<DefaultToastContainer/>
		<CardPage>
			{step == 0 && <UserCard 
				onSubmit={(out) => {
					setData1(out);
					setStep(1);
				}} 
				data={data1}
			/>}
			{step == 1 && <DetailsCard 
				onSubmit={(out) => {
					setData2(out);
					handleSubmit({...data1!, ...out});
				}}
				onBack={(out) => {
					setData2(out);
					setStep(0)
				}}
				data={data2}
			/>}
		</CardPage>
		</>
	);
}
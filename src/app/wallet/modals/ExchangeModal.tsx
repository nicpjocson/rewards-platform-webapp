import { 
	Title,
	Input,
	CardRow,
	SideButton,
	Card
} from "@/components/CardPage/CardPage";
import styles from "./modal.module.css";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm, Controller } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import Image from "next/image";
import { useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";

const ExchangeModal: React.FC<BaseModalProps> = ({ 
    state 
}) => {
    const tokenPerPoint = 4;
    const [tokens, setTokens] = useState(0);
    const handleChangePoints = (e: any) => {
        // TODO: handle non-integer input
        setTokens(e.target.value * tokenPerPoint);
    }
    const handleChangeToken = (e: any) => {
        // TODO: convert token to points
        setTokens(e.target.value);
    }

    const form = useForm();
	const toast = useFormError(form);
    
    const close = () => {
        state[1](false);
        setTokens(0);
    }

    const tokensToExchange = tokens.toString();
    const HLOToken_address = "0xb2bE0F7CC870deEa96eBD115bC8CF81D64bEd9D2";
    const exchangeContract_address = "0x594f1b32915dEc816ECb1c706A1E466b48e5daFD";
    const HLOToken_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const exchangeContract_abi = [{"inputs":[{"internalType":"address","name":"_customToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensExchanged","type":"event"},{"inputs":[],"name":"customToken","outputs":[{"internalType":"contract HelloToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"exchangeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwnerAddress","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: HLOToken_address,
        abi: HLOToken_abi,
        functionName: 'approve',
        args: [exchangeContract_address, tokensToExchange],
    })
    const { data: dataExchange, isLoading: isLoadingExchange, isSuccess: isSuccessExchange, write: writeExchange } = useContractWrite({
        address: exchangeContract_address,
        abi: exchangeContract_abi,
        functionName: 'exchangeTokens',
        args: [tokensToExchange],
    })
    
    const handleApprove = () => {
        console.log(tokensToExchange);
        write();
        console.log(data);
    }

	const handleSwap = form.handleSubmit(() => {
        console.log(tokensToExchange);
        writeExchange();
        console.log(dataExchange);
        console.log('Exchanged');
		close();
		form.reset();
    });

    return (
        <BaseModal state={state}>
            <FormContainer form={form}>
                <Card>
                    <Title>Exchange</Title>
                    <CardRow>
                        <Image src="/icons/token2.svg" width={95} height={95} alt="Token" />
                        <Image src="/icons/right_arrow.svg" width={65} height={65} alt="To" />
                        <Image src="/icons/gift.svg" width={122} height={122} alt="Reward Points" />
                    </CardRow>
                    <div>
                        <ExchangeInput id="token" title="YOU PAY" label="Token" labelClassName={styles.token} convertedValue={1000} value={tokens} onChange={handleChangeToken} />
                        <div className={styles.text_info}>Available: P{123456.78}</div>
                        <br />
                        <ExchangeInput id="points" title="YOU RECEIVE" label="Points" labelClassName={styles.points} convertedValue={950} value={tokens / tokenPerPoint} onChange={handleChangePoints} />
                        <br /><br />
                        <div className={`${styles.gas_fee_row} ${styles.text_info}`}>
                            <div className={styles.gas_fee_label}>Estimated gas fee:</div> 
                            <div className={styles.gas_fee_value}>{0.0032} Token = P{50}</div>
                        </div>
                        <br />
                    </div>
                    <CardRow>
                        <SideButton onClick={handleApprove}>
                            Approve
                        </SideButton>
                        <SideButton onClick={handleSwap} color="yellow">
                            Swap
                        </SideButton>
                        <SideButton onClick={close} color="gray">
                            Cancel
                        </SideButton>
                    </CardRow>
                </Card>
            </FormContainer>
        </BaseModal>
    );
}

const ExchangeInput: React.FC<{
    id: string,
    title: string
    label: string,
    labelClassName: string
    convertedValue: any,
    value: any, /* TODO: fix type (int/float?) */
    onChange: any
}> = ({
    id,
    title,
    label,
    labelClassName,
    convertedValue,
    value,
    onChange,
    ...props
}) => {
    return (
        <>
            <div className={`${styles.input_title} ${styles.text_main}`}>{title}</div>
            <div className={styles.input_box}>
                {/* Minor TODO: fix inner border radius */}
                <label htmlFor={id} className={`${styles.input_label} ${styles.text_main} ${labelClassName}`}>{label}</label>
                <Controller 
                    name={id}
                    render={({ field }) => (
                        <input
                            id={id}
                            placeholder=""
                            className={`${styles.input} ${styles.text_main}`}
                            autoComplete="off"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <div className={`${styles.input_converted} ${styles.text_info}`}>= P{convertedValue}</div>
            </div>
        </>
    );
}

export default ExchangeModal;
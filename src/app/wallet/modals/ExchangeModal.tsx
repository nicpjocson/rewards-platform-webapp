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

const ExchangeModal: React.FC<BaseModalProps> = ({ 
    state 
}) => {
    const tokenPerPoint = 4;
    const [points, setPoints] = useState(0);
    const handleChangePoints = (e: any) => {
        // TODO: handle non-integer input
        setPoints(e.target.value);
    }
    const handleChangeToken = (e: any) => {
        // TODO: convert token to points
        setPoints(e.target.value / tokenPerPoint);
    }

    const form = useForm();
	const toast = useFormError(form);
    
    const close = () => {
        state[1](false);
        setPoints(0);
    }
    
	const handleSubmit = form.handleSubmit((data) => {
        console.log('Exchanged');
        console.log(data);
        console.log(points);
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
                        <ExchangeInput id="token" title="YOU PAY" label="Token" labelClassName={styles.token} convertedValue={1000} value={points * tokenPerPoint} onChange={handleChangeToken} />
                        <div className={styles.text_info}>Available: P{123456.78}</div>
                        <br />
                        <ExchangeInput id="points" title="YOU RECEIVE" label="Points" labelClassName={styles.points} convertedValue={950} value={points} onChange={handleChangePoints} />
                        <br /><br />
                        <div className={`${styles.gas_fee_row} ${styles.text_info}`}>
                            <div className={styles.gas_fee_label}>Estimated gas fee:</div> 
                            <div className={styles.gas_fee_value}>{0.0032} Token = P{50}</div>
                        </div>
                        <br />
                    </div>
                    <CardRow>
                        <SideButton onClick={handleSubmit} color="yellow">
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
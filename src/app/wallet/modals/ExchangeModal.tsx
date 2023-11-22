import { 
	Title,
	Input,
	CardRow,
	SideButton,
	Card
} from "@/components/CardPage/CardPage";
import styles from "./modal.module.css";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";
import Image from "next/image";

const ExchangeModal: React.FC<BaseModalProps> = ({ 
    state 
}) => {
    const close = () => state[1](false);
    
    const form = useForm();
	const toast = useFormError(form);
	const handleSubmit = form.handleSubmit((data) => {
        console.log('Exchanged');
        console.log(data);
		close();
		form.reset();
	});
    form.watch();

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
                        <ExchangeInput id="token" title="YOU PAY" label="Token" labelClassName={styles.token} convertedValue={1000} />
                        <div className={styles.text_info}>Available: P{123456.78}</div>
                        <br />
                        <ExchangeInput id="points" title="YOU RECEIVE" label="Points" labelClassName={styles.points} convertedValue={950} />
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

const ExchangeInput = ({
    id,
    title,
    label,
    labelClassName,
    convertedValue,
    ...props
}: { /* TODO: make interface? */
    id: string,
    title: string
    label: string,
    labelClassName: string
    convertedValue: any /* TODO: fix type (int/float?) */
}) => {
    return (
        <>
            <div className={`${styles.input_title} ${styles.text_main}`}>{title}</div>
            <div className={styles.input_box}>
                {/* Minor TODO: fix inner border radius */}
                <label htmlFor={id} className={`${styles.input_label} ${styles.text_main} ${labelClassName}`}>{label}</label>
                <Input id={id} placeholder="" className={`${styles.input} ${styles.text_main}`} autoComplete="off" {...props} /> 
                <div className={`${styles.input_converted} ${styles.text_info}`}>= P{convertedValue}</div>
            </div>
        </>
    );
}

export default ExchangeModal;
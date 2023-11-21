import { 
	Title,
	Input,
	Label,
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
    const form = useForm();
	const toast = useFormError(form);
	const close = () => state[1](false);
	const handleSubmit = form.handleSubmit(() => {
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

export default ExchangeModal;
import { 
	Title,
	Input,
	Label,
	CardRow,
	SideButton,
	Card
} from "@/components/CardPage/CardPage";
import BaseModal, { BaseModalProps } from "@/components/Modal/BaseModal";
import { useForm } from "react-hook-form";
import { FormContainer, useFormError } from "@/components/Providers/Forms";

export default function ExchangeModal({ state }) {
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
            <Card>
                <Title>Exchange</Title>
                <CardRow>
                    <SideButton onClick={handleSubmit} color="yellow">
                        Swap
                    </SideButton>
                    <SideButton onClick={close} color="gray">
                        Cancel
                    </SideButton>
                </CardRow>
            </Card>
        </BaseModal>
    );
}
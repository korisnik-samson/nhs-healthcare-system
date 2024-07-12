"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Form } from "@/components/ui/form"
import { UserFormValidation } from "@/lib/validations"
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType, User } from "@/types/index.d";
import SubmitButton from "@/components/SubmitButton";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

const PatientForm = () => {
    const router: AppRouterInstance = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData = { name, email, phone };
            const user: User = await createUser(userData);

            toast.success("User created successfully", { duration: 5000 })

            if (user) router.push(`/patients/${user.$id}/register`);

        } catch (error: any) {
            toast.error("An error occurred while creating a new user", { duration: 5000,  });
            console.error("There's been an error: ", error.message);
        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className='mb-12 space-y-4'>
                    <h1 className='header'>Hi There &#x1F44B;</h1>
                    <p className='text-dark-700'>Schedule your first appointment...</p>
                </section>

                <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                         name="name" label='Full name' placeHolder='John Doe'
                                 iconSrc='/assets/icons/user.svg' iconAlt='user' />

                <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                         name="email" label='Email' placeHolder='johndoe@domain.com'
                                 iconSrc='/assets/icons/email.svg' iconAlt='email' />

                <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control}
                         name="phone" label='Phone Number' placeHolder='(555) 123 4567' />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
}

export default PatientForm;

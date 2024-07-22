"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Form } from "@/components/ui/form"
import { getAppointmentSchema } from "@/lib/validations"
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType, IAppointmentForm, Status } from "@/types/index.d";
import SubmitButton from "@/components/SubmitButton";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.actions";


const AppointmentForm = ({ userId, patientId, type }: IAppointmentForm) => {
    const router: AppRouterInstance = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    });

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;

        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break;

            case 'create':
                status = 'pending';
                break;

                // careful with this one
            case 'cancel':
                status = 'cancelled';
                break;

            default:
                status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    reason: values.reason!,
                    schedule: new Date(values.schedule),
                    status: status as Status,
                    note: values.note!,
                };

                const appointment = await createAppointment(appointmentData);

                if (appointment) {
                    form.reset();
                    toast.success("Appointment created successfully", { duration: 5000 });

                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
                }
            }

        } catch (error: any) {
            toast.error("An error occurred while creating a new user", { duration: 5000 });
            console.error("There's been an error: ", error.message);
        }

        setIsLoading(false);
    }

    let buttonLabel;

    switch (type) {
        case 'create':
            buttonLabel = 'Create Appointment';
            break;

        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;

        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;

        default:
            buttonLabel = 'Get Started';
            break
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {type === 'create' && (<section className='mb-12 space-y-4'>
                    <h1 className='header'>New Appointment &#128197;</h1>
                    <p className='text-dark-700'>Request your new... in 10 seconds</p>
                </section>)}

                {type !== 'cancel' && (
                    <React.Fragment>
                        {/* SELECT A DOCTOR */}
                        <CustomFormField fieldType={FormFieldType.SELECT} control={form.control}
                                     name="primaryPhysician" label="Doctor" placeHolder="Select a doctor">
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image src={doctor.image} width={32}
                                               height={32} alt="doctor" className="rounded-full border border-dark-500" />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        {/* SELECT A DATE AND TIME */}
                        <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control}
                                     name="schedule" label="Expected Appointment Date" placeHolder="Select a date"
                                     showTimeSelect dateFormat="MM/dd/yyyy - h:mm aa" />

                        <div className='flex flex-col gap-6 xl:flex-row'>
                            <CustomFormField control={form.control} name='reason' fieldType={FormFieldType.TEXTAREA}
                                        label='Reason for Appointment' placeHolder='Enter a brief description' />

                            <CustomFormField control={form.control} name='note' fieldType={FormFieldType.TEXTAREA}
                                        label='Additional Notes' placeHolder='Enter any additional notes' />
                        </div>

                    </React.Fragment>
                )}

                {type === 'cancel' && (
                    <CustomFormField control={form.control} name='cancellationReason' fieldType={FormFieldType.TEXTAREA}
                                label='Cancellation Reason' placeHolder='Enter a reason for cancellation' />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
}

export default AppointmentForm;

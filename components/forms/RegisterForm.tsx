"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import { PatientFormValidation } from "@/lib/validations"
import CustomFormField from "@/components/CustomFormField";
import { FormFieldType, User } from "@/types/index.d";
import SubmitButton from "@/components/SubmitButton";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { truncateLastName } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader"
import { toast } from "sonner";

const RegisterForm = ({ user }: { user: User }) => {
    const router: AppRouterInstance = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    const onSubmit = async(values: z.infer<typeof PatientFormValidation>) => {
        // debugging reasons
        toast.info("Registering patient...", { duration: 5000 });
        console.log("Form values: ", values);

        setIsLoading(true);

        let formData;

        /* Creating a document readable by the browser... called a BLOB */
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile: Blob = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append("blobFile", blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }

        try {
            /* Send over to Appwrite */
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                // potential bug here
                identificationDocument: formData,
            }

            // @ts-ignore
            const patient = await registerPatient(patientData);

            toast.success("Patient registered successfully", {
                duration: 5000,
                description: "Welcome to the Matrix!"
            });

            if (patient) router.push(`/patients/${user.$id}/new-appointment`);

        } catch (error: any) {
            toast.error("Patient Registration Failed", {
                duration: 5000,
                description: "An error occurred while registering the patient. Please try again."
            })

            console.error("There's been an error: ", error.message);
        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-4'>
                    <h1 className='header'>Welcome {truncateLastName(user.name)} &#x1F44B;</h1>
                    <p className='text-dark-700'>Let us know more about yourself.</p>
                </section>

                {/* PERSONAL INFORMATION SECTION */}
                <section className='space-y-4'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Personal Information.</h2>
                    </div>
                    <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                     name="name" label='Full Name' placeHolder='John Doe'
                                     iconSrc='/assets/icons/user.svg' iconAlt='user' />

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="email" label='Email' placeHolder='johndoe@domain.com'
                                         iconSrc='/assets/icons/email.svg' iconAlt='email' />

                        <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control}
                                         name="phone" label='Phone Number' placeHolder='(555) 123 4567' />
                    </div>

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control}
                                         name="birthDate" label='Date of Birth' />

                        <CustomFormField fieldType={FormFieldType.SKELETON} control={form.control}
                            name="gender" label='Gender' renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup className='flex h-11 gap-6 xl:justify-between'
                                                onValueChange={field.onChange} defaultValue={field.value}>
                                        {GenderOptions.map((option) => (
                                            <div key={option} className='radio-group'>
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className='cursor-pointer'>
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="address" label='Address' placeHolder='14 Downing Street, London' />

                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="occupation" label='Occupation' placeHolder='Software Engineer' />
                    </div>

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="emergencyContactName" label='Emergency Contact Name'
                                         placeHolder={`Guardian's Name`} />

                        <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control}
                                         name="emergencyContactNumber" label='Emergency Contact Number'
                                         placeHolder='(555) 123 4567' />
                    </div>
                </section>

                {/* MEDICAL INFORMATION SECTION */}
                <section className='space-y-4'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Medical Information.</h2>
                    </div>

                    <CustomFormField fieldType={FormFieldType.SELECT} control={form.control}
                                     name="primaryPhysician" label="Primary care physician" placeHolder="Select a physician">
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

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="insuranceProvider" label='Insurance Provider' placeHolder='Wiener Städtische' />

                        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                         name="insurancePolicyNumber" label='Insurance Policy Number'
                                         placeHolder='ABX 123 4567' />
                    </div>

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control}
                                         name="allergies" label='Allergies (if any)' placeHolder='Peanuts, Penicillin, Pollen' />

                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control}
                                         name="currentMedication" label='Current Medication (if any)'
                                         placeHolder='Ibruprofen 400mg, Paracetamol 500mg' />
                    </div>

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control}
                                         name="familyMedicalHistory" label='Family Medical History'
                                         placeHolder='Gennetic Diseases or Disorders' />

                        <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control}
                                         name="pastMedicalHistory" label='Past Medical History'
                                         placeHolder='Appendectomy, Tonisillectomy' />
                    </div>
                </section>

                {/* PERSONAL IDENTIFICATION SECTION */}
                <section className='space-y-4'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Identification and Verification</h2>
                    </div>

                    <CustomFormField fieldType={FormFieldType.SELECT} control={form.control}
                                     name="identificationType" label="Indentification Type"
                                     placeHolder="Select an Identification type">
                        {IdentificationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField fieldType={FormFieldType.INPUT} control={form.control}
                                     name="identificationNumber" label='Identification Number'
                                     placeHolder='123456789'
                    />

                    <CustomFormField fieldType={FormFieldType.SKELETON} control={form.control}
                                     name="identificationDocument" label='Scanned copy of Identification Document'
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />
                </section>

                {/* CONSENT AND PRIVACY SECTION */}
                <section className='space-y-4'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Consent and Privacy</h2>
                    </div>

                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control}  name='treatmentConsent'
                                label='I consent to receive treatment for my health condition.' />

                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name='disclosureConsent'
                                label='I consent to the use and disclosure of my health information for treatment purposes.' />

                    <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name='privacyConsent'
                                label='I acknowledge that I have reviewed and agree to the privacy policy' />
                </section>

                <SubmitButton isLoading={isLoading}>Register</SubmitButton>
            </form>
        </Form>
    );
}

export default RegisterForm;

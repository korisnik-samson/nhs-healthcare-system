import React from 'react';
import Image from "next/image";

import AppointmentForm from "@/components/forms/AppointmentForm";
import { SearchParamProps } from "@/types";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";

export default async function Home({ params: { userId } }: SearchParamProps) {
    const patient = await getPatient(userId);

    Sentry.metrics.set('user_view_new_appointment', patient.name);

    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container my-auto'>
                <div className='sub-container max-w-[860px] flex-1 justify-between'>
                    <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt='Patient'
                        className='mb-12 h-10 w-fit' />

                     <AppointmentForm type='create' userId={userId} patientId={patient?.$id} />

                    <p className='copyright mt-10 py-12'>
                        &copy; 2024 Samson. All rights reserved.
                    </p>
                </div>
            </section>

            <Image src='/assets/images/appointment-img.png' height={1000} width={1000} alt='Patient'
                   className='side-img max-w-[390px]' />
        </div>
    );
}

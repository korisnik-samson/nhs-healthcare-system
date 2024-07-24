'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { IAppointmentModalProps } from "@/types";

const AppointmentModal = ({ type, patientId, userId, appointment }: IAppointmentModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
                    {type}
                </Button>
            </DialogTrigger>

            <DialogContent className='shad-dialog sm:max-w-md'>
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} the appointment
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm type={type} userId={userId} patientId={patientId}
                                 appointment={appointment} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

export default AppointmentModal;
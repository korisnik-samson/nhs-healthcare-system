/* eslint-disable no-unused-vars */

import React from "react";
import { Control } from "react-hook-form";

export interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeHolder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormats?: string[],
    showTimeSelect?: boolean,
    children?: boolean,
    renderSkeleton?: (field: any) => React.ReactNode,
}

export enum FormFieldType {
    INPUT = "input",
    CHECKBOX = "checkbox",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phone_input",
    CHECKBOX_GROUP = "checkbox_group",
    DATE_PICKER = "date_picker",
    SLIDER = "slider",
    SELECT = "select",
    SKELETON = "skeleton",
}

export interface IRenderInputProps {
    field: any;
    props: CustomProps;
}

export interface IButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface User extends CreateUserParams {
    $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
};
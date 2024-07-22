'use server';

import { CreateAppointmentParams } from "@/types";
import { ID, Models } from "node-appwrite";
import { databases } from "@/lib/appwrite.config";
import { credentials, parseStringify } from "@/lib/utils";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment: Models.Document = await databases.createDocument(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_APPOINTMENT_COLLECTION_ID,
            ID.unique(),
            appointment
        );

        return parseStringify(newAppointment);

    } catch (error: Error | any) {
        console.error("An error occurred while creating a new appointment: ", error.message);
    }
}

export const getAppointments = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_APPOINTMENT_COLLECTION_ID,
            appointmentId
        );

        return parseStringify(appointment);

    } catch (error: Error | any) {
        console.error("An error occurred while fetching appointments: ", error.message);
    }
}
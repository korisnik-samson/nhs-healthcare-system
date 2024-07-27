'use server';

import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { ID, Models, Query } from "node-appwrite";
import { databases, messaging } from "@/lib/appwrite.config";
import { credentials, messageString, parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_APPOINTMENT_COLLECTION_ID,
            [Query.orderDesc("$createdAt")]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') acc.scheduledCount++;
            else if (appointment.status === 'pending') acc.pendingCount++;
            else if (appointment.status === 'cancelled') acc.cancelledCount++;

            return acc;

        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);

    } catch (error: Error | any) {
        console.error("An error occurred while fetching recent appointments: ", error.message);
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_APPOINTMENT_COLLECTION_ID,
            appointmentId,
            appointment
        );

        if (!updatedAppointment) throw Error("Appointment not found");

        const smsMessage = messageString(type, appointment.primaryPhysician,
            appointment.reason, appointment.cancellationReason);

        // Send SMS notification to user
        await sendSMSNotification(userId, smsMessage);

        revalidatePath('/admin')

        return parseStringify(updatedAppointment);

    } catch (error: Error | any) {
        console.error("An error occurred while updating appointment: ", error.message);
    }
}

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message: Models.Message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        );

        return parseStringify(message);

    } catch (error: Error | any) {
        console.error("An error occurred while sending SMS notification: ", error.message);
    }
}
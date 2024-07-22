'use server';

import { CreateUserParams, RegisterUserParams } from "@/types/index.d";
import { databases, storage, users } from "@/lib/appwrite.config";
import { ID, Models, Query, InputFile } from "node-appwrite";
import { credentials, parseStringify } from "@/lib/utils";

export const createUser = async(user: CreateUserParams) => {
    try {
        // Create a new user from the provided data
        const newUser: Models.User<Models.Preferences> = await users.create(
            ID.unique(), user.email,
            user.phone, undefined,user.name
        );

        console.log({ newUser });

        return parseStringify(newUser);

    } catch (error: Error | any) {
        // If the user already exists, return the existing user
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents?.users[0];
        }

        console.error("An error occurred while creating a new user: ", error.message);
    }
}

export const getUser = async(userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);

    } catch (error: Error | any) {
        console.error("An error occurred while fetching user data: ", error.message);
    }
}

export const registerPatient = async({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;

        if (identificationDocument) {
            const inputFile = identificationDocument && await InputFile.fromBlob(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string
            );

            file = await storage.createFile(credentials.NEXT_PUBLIC_BUCKET_ID, ID.unique(), inputFile);
        }

        // debugging purposes TODO: remove
        console.log({
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${credentials.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${credentials.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view??project=${credentials.APPWRITE_PROJECT_ID!}`,
        })

        const newPatient: Models.Document = await databases.createDocument(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_PATIENT_COLLECTION_ID,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${credentials.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${credentials.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view??project=${credentials.APPWRITE_PROJECT_ID!}`,
                ...patient
            }
        );

        console.log({ newPatient });

        return parseStringify(newPatient);

    } catch (error: Error | any) {
        console.error("An error occurred while registering a new patient: ", error.message);
    }
}

export const getPatient = async(patientId: string) => {
    try {
        const patients = await databases.listDocuments(
            credentials.APPWRITE_DATABASE_ID,
            credentials.APPWRITE_PATIENT_COLLECTION_ID,
            [
                Query.equal('userId', patientId)
            ]
        );

        return parseStringify(patients.documents[0]);

    } catch (error: Error | any) {
        console.error("An error occurred while fetching user data: ", error.message);
    }
}
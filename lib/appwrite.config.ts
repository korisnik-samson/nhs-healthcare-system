import * as sdk from 'node-appwrite';
import { credentials } from "@/lib/utils";

/*export const {
    APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    APPWRITE_PATIENT_COLLECTION_ID,
    APPWRITE_DOCTOR_COLLECTION_ID,
    APPWRITE_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,

} = process.env;*/

const client: sdk.Client = new sdk.Client();

/* TODO: SORT THIS OUT WITH THE ENVIRONMENT VARIABLES */

client.setEndpoint(credentials.NEXT_PUBLIC_ENDPOINT).setProject(credentials.APPWRITE_PROJECT_ID).setKey(credentials.APPWRITE_API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

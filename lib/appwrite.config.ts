import * as sdk from 'node-appwrite';

export const {
    APPWRITE_PROJECT_ID,
    APPWRITE_API_KEY,
    APPWRITE_DATABASE_ID,
    APPWRITE_PATIENT_COLLECTION_ID,
    APPWRITE_DOCTOR_COLLECTION_ID,
    APPWRITE_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,

} = process.env;

const client: sdk.Client = new sdk.Client();

/* TODO: SORT THIS OUT WITH THE ENVIRONMENT VARIABLES*/

client.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668e21b9003687decf31')
    .setKey('1478ac38c31b089762a90218beaa3f038df4c549798949ed5670b6ea9a0f7fbc0c05ae6970a24d757e3af812ea8be848de48f87c97df197488a' +
        '809551d9b158474e84541288b7b577551752f14a0de1192135a41bd66002fd08eeae459a350da69929043cb16d2f3dc6a83a5dbde4073cb72b9765f9' +
        '6506d9608db992d488155');

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

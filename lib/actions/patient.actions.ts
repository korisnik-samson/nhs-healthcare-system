import { CreateUserParams } from "@/types/index.d";
import { APPWRITE_PROJECT_ID, users } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "@/lib/utils";

export const createUser = async(user: CreateUserParams) => {
    try {
        // Create a new user from the provided data
        const newUser = await users.create(
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

        console.log(APPWRITE_PROJECT_ID);
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
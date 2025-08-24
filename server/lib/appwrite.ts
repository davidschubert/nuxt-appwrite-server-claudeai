import { Client, Account, Databases } from "node-appwrite";
import { useRuntimeConfig } from "#imports";

// Cookie-Name für die Appwrite-Session
export const SESSION_COOKIE = "my-appwrite-session";

// 1. Appwrite Admin Client
export const createAdminClient = () => {
    const config = useRuntimeConfig();

    const adminClient = new Client()
        .setEndpoint(config.public.appwriteEndpoint!)
        .setProject(config.public.appwriteProjectId!)
        .setKey(config.appwriteApiKeySecret!);

    return {
        account: new Account(adminClient),
        databases: new Databases(adminClient),
    };
};

// 2. Appwrite Session Client
export const createSessionClient = (sessionToken: string) => {
    const config = useRuntimeConfig();

    const sessionClient = new Client()
        .setEndpoint(config.public.appwriteEndpoint!)
        .setProject(config.public.appwriteProjectId!);

    if (sessionToken) {
        sessionClient.setSession(sessionToken);
    }

    return {
        account: new Account(sessionClient),
        databases: new Databases(sessionClient),
    };
};

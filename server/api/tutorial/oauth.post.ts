// server/routes/api/oauth.post.js
import { createAdminClient } from "~~/server/lib/appwrite";
import type { OAuthProvider } from "node-appwrite";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { account } = createAdminClient();

    const redirectUrl = await account.createOAuth2Token(
        "github" as OAuthProvider, // OAuth provider
        `${config.public.appwriteEndpoint}/api/tutorial/oauth`, // Success URL: redirect back to the /oauth route
        `${config.public.appwriteEndpoint}/tutorial/signup` // Failure URL: redirect to the sign up page
    );

    // Redirect the user to the OAuth provider authorization page
    await sendRedirect(event, redirectUrl);
});

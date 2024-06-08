import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb";

export const authOptions = {
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {
                params: {
                  scope: 'user-read-email user-top-read playlist-modify-private playlist-modify-public', 
                },
              },
        })
        // ...add more providers here
    ],
    

    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        },
        async session({ session, token, user }) {
            // Check if token is defined and has accessToken property before accessing it
            if (token && token.accessToken) {
                session.accessToken = token.accessToken;
                session.user.id = token.id;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions)
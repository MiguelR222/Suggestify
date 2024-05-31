import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {
                params: {
                  scope: 'user-read-email user-top-read', 
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
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id
        
            return session
        }
    }
}

export default NextAuth(authOptions)
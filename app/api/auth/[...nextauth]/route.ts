import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
})

export { handler as GET, handler as POST }

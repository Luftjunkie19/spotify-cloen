import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/github';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
    username: { label: "Username", type: "text ", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
        })
  ],
}
export default NextAuth(authOptions)
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    secret: process.env.NUXTAUTH_SECRET,
    providers: [
        CredentialsProvider.default({
            name: "Credentials",
            async authorize(credentials:any, req:any) {
                console.log("credentials");
                
                const res = await fetch(process.env.NUXT_PUBLIC_URL_API+"/api/Authenticate/verify-liff-token", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                console.log(res, "res");
                
                if (res.status == 200) {
                    const data = await res.json();
                    // console.log(data, "login success");
                    return {
                        id: data.user.id,
                        name: data.user.firstName + ' ' + data.user.lastName,
                        email: data.user.email,
                        image: data.user.avatar,
                        token: data.token,
                        user: data.user
                      }
                } else {
                    console.log("login error");
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log("signIn",user, account, profile, email, credentials );
            
            return user
        },
        async redirect({ url, baseUrl }) {
            let envUrl = process.env.NODE_ENV == "development" ? process.env.NUXT_PUBLIC_URL_DEV : "https://localhost:3000"
            // console.log(envUrl);
            return envUrl
        },
        async session({ session, user, token }) {
            // console.log("session", token,user, session);
            if(session){
                session.user = token.user
                session.token = token.token
                return session
              }else{
                return session
              }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log("jwt",token, user, account);
            if (account && user) {
                return {
                    user: user.user,
                    token: user.token
                }
              }

            return token
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login'
    }
})
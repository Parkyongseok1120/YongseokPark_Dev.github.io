import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 로그인한 GitHub 계정이 지정한 계정이 아니면 로그인 실패
      if (profile.login === 'Parkyongseok1120') {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token, user }) {
      // 세션에 GitHub 프로필 정보를 포함
      session.user.username = token.login;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.login = profile.login;
      }
      return token;
    },
  },
});

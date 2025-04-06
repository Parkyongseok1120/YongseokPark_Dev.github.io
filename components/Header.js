import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  
  return (
    <header className="flex items-center justify-between p-6 bg-gray-800 text-white">
      <Link href="/">
        <a className="text-xl font-bold">YongseokPark Dev-log</a>
      </Link>
      <nav className="space-x-4">
        <Link href="/blog">
          <a>블로그</a>
        </Link>
        <Link href="/projects">
          <a>프로젝트</a>
        </Link>
        {session ? (
          <>
            {session.user.username === 'Parkyongseok1120' && (
              <Link href="/write">
                <a className="px-3 py-1 bg-green-500 rounded">글 작성</a>
              </Link>
            )}
            <button onClick={() => signOut()} className="px-3 py-1 border rounded">로그아웃</button>
          </>
        ) : (
          <button onClick={() => signIn('github')} className="px-3 py-1 border rounded">GitHub 로그인</button>
        )}
      </nav>
    </header>
  );
}

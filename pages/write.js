import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function WritePage() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('blog'); // 'blog' 또는 'project'

  if (status === 'loading') return <div>로딩중...</div>;
  if (!session) return (
    <div className="p-8">
      <p>로그인이 필요합니다.</p>
      <button onClick={() => signIn('github')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">GitHub로 로그인</button>
    </div>
  );

  // 로그인한 계정이 지정한 계정이 아닐 경우 처리
  if (session.user.username !== 'Parkyongseok1120') {
    return <div className="p-8">접근 권한이 없습니다.</div>;
  }

  const handleSubmit = async () => {
    const postData = { title, content, section };
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (res.ok) {
      alert('게시글이 저장되었습니다!');
      // 저장 후 리다이렉트 등 추가 처리 가능
    } else {
      alert('저장 실패, 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">새 글 작성</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="mb-4">
        <select value={section} onChange={(e) => setSection(e.target.value)} className="p-2 border rounded">
          <option value="blog">블로그</option>
          <option value="project">프로젝트</option>
        </select>
      </div>
      <div className="border border-gray-300 rounded p-4">
        <MDEditor value={content} onChange={setContent} height={400} />
      </div>
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        저장하기
      </button>
    </div>
  );
}

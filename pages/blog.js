import Header from '../components/Header';
import Footer from '../components/Footer';
import PostList from '../components/PostList';

export default function Blog() {
  // 예시용 더미 데이터
  const posts = [
    { id: 1, title: '첫 번째 블로그 글', date: '2025-04-06', excerpt: '첫 번째 글의 요약 내용입니다.' },
    { id: 2, title: '두 번째 블로그 글', date: '2025-04-05', excerpt: '두 번째 글의 요약 내용입니다.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6">블로그</h1>
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

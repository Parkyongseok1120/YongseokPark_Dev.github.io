import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">환영합니다, YongseokPark Dev-log 입니다.</h1>
        <p className="mb-6">여기는 블로그와 프로젝트 섹션이 함께 있는 포트폴리오 사이트입니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">블로그</h2>
            <p>최신 기술 이야기와 글들을 확인해보세요.</p>
            <Link href="/blog">
              <a className="mt-4 inline-block text-blue-500">블로그 보러가기 &rarr;</a>
            </Link>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">프로젝트</h2>
            <p>진행 중인 프로젝트와 결과물을 확인해보세요.</p>
            <Link href="/projects">
              <a className="mt-4 inline-block text-blue-500">프로젝트 보러가기 &rarr;</a>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from 'next/link';

export default function PostList({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded hover:shadow">
          <h2 className="text-2xl font-bold">
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </h2>
          <p className="text-gray-600 text-sm">{post.date}</p>
          <p className="mt-2">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

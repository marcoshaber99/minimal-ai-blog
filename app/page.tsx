import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>
      <Link href="/create">
        <Button>Create New Post</Button>
      </Link>
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <Link href={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold hover:text-blue-600">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


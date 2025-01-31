import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      notes: true,
    },
  })

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }

  const body = await request.json()
  const { id } = body

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })

  if (!note?.isPublic && note?.userId !== user.id) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }

  if (!note) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(note), { status: 200 })
}

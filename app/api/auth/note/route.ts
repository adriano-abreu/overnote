import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function PUT(request: Request) {
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

  const note = await prisma.note.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      content: body.content,
      isPublic: body.isPublic,
    },
  })

  if (!note) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(note), { status: 200 })
}

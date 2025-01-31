import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return redirect('/login')
  }

  try {
    const body = await request.json()

    const nota = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        isPublic: body.isPublic,
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify(nota), { status: 200 })
  } catch (error) {
    console.error('Erro ao ler o corpo da requisição:', error)
    return new Response('Erro ao processar a requisição', { status: 500 })
  }
}

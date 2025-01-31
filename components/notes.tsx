import { Skeleton } from './ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '@/app/functions/get-notes'
import { Lock, LockOpen, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { getAvatarFallback } from '@/lib/get-avatar-fallback'

import DOMPurify from 'dompurify'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import Link from 'next/link'

dayjs.locale('pt-br')

export function Notes() {
  const { data } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    staleTime: 1000 * 30,
  })

  if (!data) {
    return (
      <>
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
        <Skeleton className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70" />
      </>
    )
  }
  const avatarFallback = getAvatarFallback(data.name)
  return (
    <>
      {data &&
        data.notes.map((note) => {
          const doc = new DOMParser().parseFromString(note.content, 'text/html')
          const rawHtml = doc.body.innerHTML
          const safeHtml = DOMPurify.sanitize(rawHtml)
          const cleanedHtml = safeHtml.replace(/^"|"$/g, '')
          return (
            <div
              key={note.id}
              className="aspect-video rounded-xl bg-muted/50 p-4 cursor-pointer hover:bg-muted/70 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-blue-950"></div>
                  <span className="text-xl font-semibold text-blue-950">
                    {note.title}
                  </span>
                </div>
                <button className="bg-muted p-2 rounded-md text-muted-foreground hover:opacity-80 ">
                  {note.isPublic ? (
                    <LockOpen className="size-5" />
                  ) : (
                    <Lock className="size-5" />
                  )}
                </button>
              </div>
              <div
                className="flex-1 max-w-[460px] line-clamp-5"
                dangerouslySetInnerHTML={{ __html: cleanedHtml }}
              />

              <div className="w-full h-px bg-slate-200 mt-5 mb-5" />
              <div className="flex items-center gap-4 justify-between">
                <div className="space-x-2 flex">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {data?.name && (
                      <AvatarImage src={data.image} alt={data.name} />
                    )}
                    <AvatarFallback className="rounded-lg">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-left text-sm leading-tight bg-muted p-1 rounded-md">
                    <span className="truncate font-semibold flex-1 lg:block hidden">
                      {data.name}
                    </span>
                    <span className="capitalize lg:block hidden">
                      {dayjs(note.createdAt).format('MMM DD, YYYY')}
                    </span>
                  </div>
                </div>

                <Link href={`/dashboard/note/${note.id}`}>
                  <MoreHorizontal className="size-5" />
                </Link>
              </div>
            </div>
          )
        })}

      {data.notes.length === 0 && (
        <div className="h-screen flex items-start">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-xl font-bold">Nenhuma nota encontrada</h1>
            <p className="text-sm">
              Crie uma nova nota para começar a escrever!
            </p>
          </div>
        </div>
      )}
    </>
  )
}

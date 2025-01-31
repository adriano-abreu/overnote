// Nota.tsx
'use client'
import { getNote } from '@/app/functions/get-note'
import { useMutation, useQuery } from '@tanstack/react-query'
import { NewEditor, type OnContentUpdatedParams } from './editor'
import { useMemo, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { deleteNote } from '@/app/functions/delete-note'
import { putNote } from '@/app/functions/put-note'
import { queryClient } from '@/lib/react-query'
import { NoteDialog } from './note-dialog'
import { redirect } from 'next/navigation'

interface Props {
  noteId: string
  title: string
  content: string
  isPublic: boolean
}

export function Note({ noteId }: { noteId: string }) {
  const { mutateAsync: mutateAsyncDeleteNote, isPending: isPendingDelete } =
    useMutation({
      mutationFn: () => deleteNote({ id: noteId! }),
      onSuccess: () => (window.location.href = '/dashboard'),
    })

  const { data: dataNote, isFetching } = useQuery({
    queryKey: [noteId, 'nota'],
    queryFn: () => getNote({ id: noteId! }),
  })

  const timeoutRef = useRef<NodeJS.Timeout>()
  const noteIdRef = useRef(noteId)
  const latestDataRef = useRef<OnContentUpdatedParams | Props | null>(null)

  useEffect(() => {
    noteIdRef.current = noteId
  }, [noteId])

  const { mutateAsync: mutateAsyncPutNote, isPending } = useMutation({
    mutationFn: putNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['note'] })

    },
  })

  async function handleSaveImmediately() {
    if (latestDataRef.current) {
      await mutateAsyncPutNote({
        id: noteIdRef.current!,
        title: latestDataRef.current.title,
        content: latestDataRef.current.content,
        isPublic: latestDataRef.current.isPublic,
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  function handleEditorContentUpdated(data: OnContentUpdatedParams) {
    latestDataRef.current = data
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      mutateAsyncPutNote({
        id: noteIdRef.current!,
        title: data.title,
        content: data.content,
        isPublic: false,
      })
    }, 5000) // 5 segundos
  }

  useEffect(() => {
    return () => {
      if (latestDataRef.current) {
        mutateAsyncPutNote({
          id: noteIdRef.current!,
          title: latestDataRef.current.title,
          content: latestDataRef.current.content,
          isPublic: false,
        })
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const initialContent = useMemo(() => {
    if (dataNote) {
      return `<h1>${dataNote.title}</h1> ${dataNote.content ?? '<p></p>'}`
    }
    return ''
  }, [dataNote])

  const handlePublicChange = async (isPublic: boolean) => {
    await mutateAsyncPutNote({
      id: noteIdRef.current!,
      title: dataNote?.title ?? '',
      content: dataNote?.content ?? '',
      isPublic,
    })
  }

  if (!dataNote) {
    return (
      <>
        <h1 className="text-2xl font-bold mt-4">...</h1>
      </>
    )
  }

  if (!dataNote.id && !isFetching) {
    return redirect('/dashboard')
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-center gap-4 ml-auto">
        <Button
          onClick={handleSaveImmediately}
          className="flex items-center justify-center disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Salvando...' : 'Salvar Nota'}
        </Button>
        <Button
          variant="destructive"
          onClick={() => mutateAsyncDeleteNote()}
          className="flex items-center justify-center w-10 disabled:opacity-50"
          disabled={isPendingDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {!isFetching && dataNote && (
        <NewEditor
          initialContent={initialContent}
          onUpdatePublic={{
            noteId: noteId!,
            isPublic: latestDataRef.current?.isPublic ?? dataNote?.isPublic,
          }}
          onContentUpdated={handleEditorContentUpdated}
        />
      )}
      <NoteDialog
        noteProps={{
          noteId: noteId!,
          title: latestDataRef.current?.title ?? dataNote?.title,
          content: latestDataRef.current?.content ?? dataNote?.content,
          isPublic: latestDataRef.current?.isPublic ?? dataNote?.isPublic,
        }}
        onPublicChange={handlePublicChange}
      />
    </div>
  )
}

import { createNote } from '@/app/functions/create-note'
import { useMutation } from '@tanstack/react-query'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { queryClient } from '@/lib/react-query'

export function CreateNote() {
  const { mutateAsync, data } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['note'] })

    },
  })

  if (data) {
    redirect(`/dashboard/note/${data.id}`)
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      await mutateAsync({
        title: 'Untitled',
        content: '',
        isPublic: false,
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Button type="submit">
        <span>Criar Nota!</span>
        <Plus />
      </Button>
    </form>
  )
}

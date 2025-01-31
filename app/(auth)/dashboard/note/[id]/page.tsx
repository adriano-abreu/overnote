'use client'

import { Note } from '@/components/note'
import { useParams } from 'next/navigation'

export default function NotePage() {
  const { id } = useParams()
  const noteId = id.toString()
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Note noteId={noteId} />
    </div>
  )
}

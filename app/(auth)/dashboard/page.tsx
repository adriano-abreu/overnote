'use client'
import { CreateNote } from '@/components/create-note'
import { Notes } from '@/components/notes'

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Minhas Notas</h1>
        <CreateNote />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Notes />
      </div>
    </div>
  )
}

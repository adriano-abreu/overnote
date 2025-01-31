interface Note {
  name: string
  image?: string
  notes: {
    id: string
    title: string
    content: string
    isPublic: boolean
    createdAt: string
  }[]
}

export async function getNotes(): Promise<Note> {
  const res = await fetch('/api/auth/notes')
  const data = await res.json()
  return data
}

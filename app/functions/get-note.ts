interface GetNoteResponse {
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export async function getNote({
  id,
}: {
  id: string
}): Promise<GetNoteResponse> {
  const res = await fetch('/api/auth/get-note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  })

  return res.json()
}

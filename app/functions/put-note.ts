export async function putNote({
  id,
  title,
  content,
  isPublic,
}: {
  id: string
  title: string
  content?: string
  isPublic: boolean
}) {
  const res = await fetch('/api/auth/note', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      title,
      content,
      isPublic,
    }),
  })
  return res.json()
}

export async function createNote({
  title,
  content,
  isPublic,
}: {
  title: string
  content?: string
  isPublic: boolean
}) {
  const response = await fetch('/api/auth/create-note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
      isPublic,
    }),
  })

  return response.json()
}

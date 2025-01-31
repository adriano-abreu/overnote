export async function deleteNote({ id }: { id: string }) {
  const res = await fetch('/api/auth/delete-note', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  return res
}

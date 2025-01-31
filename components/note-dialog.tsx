// NoteDialog.tsx
'use client'
import { useState, useEffect } from 'react'
import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Check, Copy } from 'lucide-react'

interface NoteFormProps {
  noteProps: {
    noteId: string
    title: string
    content: string
    isPublic: boolean
  }
  onPublicChange?: (isPublic: boolean) => void // Nova prop para lidar com a mudança de estado público
}

export function NoteDialog({ noteProps, onPublicChange }: NoteFormProps) {
  const [isPublic, setIsPublic] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const url = `${window.location.origin}/dashboard/note/${noteProps.noteId}`

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  async function handleCopyUrl() {
    if (!isPublic) return
    await navigator.clipboard.writeText(url)
    setIsCopied(true)
  }

  // Função para lidar com a mudança do checkbox
  const handlePublicChange = (checked: boolean) => {
    setIsPublic(checked)
    if (onPublicChange) {
      onPublicChange(checked) // Chama a função passada pelo componente pai
    }
  }

  return (
    <DialogContent>
      <DialogTitle>Compartilhar Nota</DialogTitle>
      <DialogDescription>
        Para compartilhar uma nota, você pode torná-la pública.
      </DialogDescription>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={handleCopyUrl}
          disabled={!isPublic}
          className={`text-sm text-muted-foreground bg-zinc-300 rounded-md px-2 py-1 text-center transition-all ${
            isPublic
              ? 'cursor-pointer hover:bg-zinc-400'
              : 'cursor-not-allowed opacity-50'
          } relative`}
        >
          <span className={isCopied ? 'invisible' : 'visible'}>{url}</span>
          {isCopied && (
            <span className="absolute inset-0 flex items-center justify-center gap-1">
              <Copy className="h-4 w-4" />
              Copiado!
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <Checkbox
            id="isPublic"
            defaultChecked={noteProps.isPublic}
            onCheckedChange={(checked) => handlePublicChange(checked === true)}
            className="flex size-[25px] appearance-none items-center justify-center rounded bg-zinc-300 border border-zinc-950"
          >
            <CheckboxIndicator>
              <Check className="size-5 text-zinc-950" />
            </CheckboxIndicator>
          </Checkbox>
          <label
            className="text-md leading-none text-muted-foreground"
            htmlFor="isPublic"
          >
            Tornar a nota pública
          </label>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <DialogClose>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

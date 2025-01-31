import { EditorProvider } from '@tiptap/react'
import { MenuBar } from './menu-bar'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'

export interface OnContentUpdatedParams {
  noteId: string
  title: string
  content: string
  isPublic: boolean
}

export function NewEditor({
  initialContent,
  onUpdatePublic,
  onContentUpdated,
}: {
  initialContent: string
  onUpdatePublic?: {
    noteId: string
    isPublic: boolean
  }
  onContentUpdated: (params: OnContentUpdatedParams) => void
}) {
  const extensions = [
    StarterKit.configure({ document: false }),
    Document.extend({ content: 'heading block*' }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight.configure({ multicolor: true }),
    Typography,
    Placeholder.configure({
      placeholder: 'Untitled',
      emptyEditorClass:
        'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
    }),
  ]
  const editorProps = {
    autofocus: 'end',
    attributes: {
      class:
        'min-w-[65ch] focus:outline-none prose prose-headings:mt-0 bg-transparent p-2 prose-p:my-0 prose-p:leading-snug',
    },
  }

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      onUpdate={({ editor }) => {
        const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
        const parsedContent = editor.getHTML().match(contentRegex)?.groups
        const title = parsedContent?.title ?? 'Untitled'

        const content = parsedContent?.content ?? ''
        const noteId = onUpdatePublic?.noteId ?? ''
        const isPublic = onUpdatePublic?.isPublic ?? false
        onContentUpdated({ noteId, title, content, isPublic })
      }}
      editorProps={editorProps}
      extensions={extensions}
      content={initialContent}
    />
  )
}

import { useCurrentEditor } from '@tiptap/react'
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './ui/toolbar'
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons'
import { DialogTrigger } from './ui/dialog'
export function MenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Toolbar>
      <ToolbarToggleGroup type="multiple">
        <ToolbarToggleItem
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <FontBoldIcon />
        </ToolbarToggleItem>

        <ToolbarToggleItem
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon />
        </ToolbarToggleItem>

        <ToolbarToggleItem
          value="strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single">
        <ToolbarToggleItem
          value="left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          disabled={!editor.can().chain().focus().setTextAlign('left').run()}
        >
          <TextAlignLeftIcon />
        </ToolbarToggleItem>

        <ToolbarToggleItem
          value="center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          disabled={!editor.can().chain().focus().setTextAlign('center').run()}
        >
          <TextAlignCenterIcon />
        </ToolbarToggleItem>

        <ToolbarToggleItem
          value="right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          disabled={!editor.can().chain().focus().setTextAlign('right').run()}
        >
          <TextAlignRightIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarButton>
        <DialogTrigger>Compartilhar</DialogTrigger>
      </ToolbarButton>
    </Toolbar>
  )
}

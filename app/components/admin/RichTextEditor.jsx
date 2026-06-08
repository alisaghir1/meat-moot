'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

/**
 * TipTap rich-text editor with H2/H3/H4 buttons, lists, blockquote, bold/italic.
 * Outputs sanitized HTML via `onChange(html)`. Always re-sanitize server-side
 * before storing — `sanitizeHtml()` from `@/lib/sanitize`.
 */
export default function RichTextEditor({ value, onChange, dir = 'ltr', placeholder }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        dir,
        class:
          'article-body min-h-[300px] w-full px-4 py-3 focus:outline-none bg-white text-neutral-900',
        ...(placeholder ? { 'data-placeholder': placeholder } : {}),
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  })

  // Sync external value changes (e.g. when editing a different record)
  useEffect(() => {
    if (!editor) return
    if (value && value !== editor.getHTML()) {
      editor.commands.setContent(value, false)
    }
  }, [value, editor])

  if (!editor) return null

  const btn = (active) =>
    `px-2 py-1 text-sm rounded border transition ${
      active
        ? 'bg-neutral-900 text-white border-neutral-900'
        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
    }`

  return (
    <div className="rounded-md border border-neutral-300 overflow-hidden">
      <div className="flex flex-wrap gap-1 px-2 py-2 bg-neutral-50 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btn(editor.isActive('heading', { level: 2 }))}
          aria-label="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btn(editor.isActive('heading', { level: 3 }))}
          aria-label="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={btn(editor.isActive('heading', { level: 4 }))}
          aria-label="Heading 4"
        >
          H4
        </button>
        <span className="mx-1 h-6 w-px bg-neutral-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive('bold'))}
          aria-label="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive('italic'))}
          aria-label="Italic"
        >
          <em>I</em>
        </button>
        <span className="mx-1 h-6 w-px bg-neutral-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive('bulletList'))}
          aria-label="Bullet list"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive('orderedList'))}
          aria-label="Numbered list"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btn(editor.isActive('blockquote'))}
          aria-label="Quote"
        >
          ❝
        </button>
        <span className="mx-1 h-6 w-px bg-neutral-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={btn(false)}
          aria-label="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={btn(false)}
          aria-label="Redo"
        >
          ↷
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

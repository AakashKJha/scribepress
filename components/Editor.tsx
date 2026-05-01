'use client';

import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const extensions = useMemo(
    () => [
      markdown(),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': { fontSize: '14px', height: '100%' },
        '.cm-content': {
          fontFamily:
            "'JetBrains Mono', ui-monospace, monospace",
          padding: '24px 28px',
          caretColor: '#A8321E',
        },
        '.cm-gutters': {
          backgroundColor: 'transparent',
          border: 'none',
          color: '#B5A89A',
        },
        '.cm-activeLine': { backgroundColor: 'rgba(168, 50, 30, 0.04)' },
        '.cm-activeLineGutter': { backgroundColor: 'transparent', color: '#A8321E' },
        '&.cm-focused': { outline: 'none' },
      }),
    ],
    []
  );

  return (
    <div className="h-full overflow-auto bg-paper">
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
        }}
        theme="light"
        height="100%"
        style={{ height: '100%', minHeight: '100%' }}
      />
    </div>
  );
}

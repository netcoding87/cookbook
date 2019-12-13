import JoditEditor from 'jodit-react'
import React from 'react'

const config = {
  placeholder: 'Lorem ipsum',
  toolbarButtonSize: 'large',
  enter: 'P',
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  buttons:
    'bold,underline,italic,|,|,ul,ol,|,outdent,indent,|,|,undo,redo,|,fullsize',
}

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleOnChange = (value: string) => {
    onChange(value)
  }

  return <JoditEditor value={value} config={config} onChange={handleOnChange} />
}

export default Editor

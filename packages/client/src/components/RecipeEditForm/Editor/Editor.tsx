import JoditEditor from 'jodit-react'
import React from 'react'

const config = {
  buttons:
    'bold,underline,italic,|,|,ul,ol,|,outdent,indent,|,|,undo,redo,|,fullsize',
  enter: 'P',
  placeholder: '',
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  toolbarAdaptive: false,
  toolbarButtonSize: 'large',
}

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleOnBlur = (value: string) => {
    onChange(value)
  }

  return <JoditEditor value={value} config={config} onBlur={handleOnBlur} />
}

export default Editor

import React from 'react'
import ReactMarkdown from 'react-markdown'
import './index.scss'

// import PropsWithChildren from "../../@types/PropsWithChildren"

type IProps = {
  textContent: string
}

const MdViewer: React.FC<IProps> = (props: IProps) => {
  const { textContent } = props
  return (
    <div className="md-viewer">
      <ReactMarkdown>{textContent}</ReactMarkdown>
    </div>
  )
}

export default MdViewer

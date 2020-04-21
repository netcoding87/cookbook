import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { HeadlineContainer } from './PreparationView.styles'

interface PreparationViewProps {
  preparations: string | null | undefined
}

const PreparationView: React.FC<PreparationViewProps> = ({
  preparations = undefined,
}) => {
  return (
    <>
      <HeadlineContainer>
        <h5>
          <FontAwesomeIcon icon={['fas', 'blender']} /> Zubereitung
        </h5>
      </HeadlineContainer>
      {
        <div data-testid="preparations">
          {preparations ? (
            ReactHtmlParser(preparations)
          ) : (
            <i>Keine Zubereitung vorhanden</i>
          )}
        </div>
      }
    </>
  )
}

export default PreparationView

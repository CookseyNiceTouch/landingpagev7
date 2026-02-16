import type { ReactElement } from 'react'
import { useModal } from '../../contexts/ModalContext'

interface GetAppBlockProps {
  title?: string
  description?: string
  className?: string
}

function GetAppBlock({
  title = 'Get the App',
  description = 'Start using Nice Touch in your video editing workflow today.',
  className = '',
}: GetAppBlockProps): ReactElement {
  const { openGetAppModal } = useModal()

  return (
    <section className={`get-app-block ${className}`.trim()}>
      <div className="get-app-block-content">
        <h2 className="get-app-block-title">{title}</h2>
        {description && <p className="get-app-block-description">{description}</p>}
        <button onClick={openGetAppModal} className="get-app-button">
          Get the App
        </button>
      </div>
    </section>
  )
}

export default GetAppBlock





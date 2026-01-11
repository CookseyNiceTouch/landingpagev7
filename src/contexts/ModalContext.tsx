import { createContext, useContext, useState, type ReactNode, type ReactElement } from 'react'
import GetAppModal from '../components/GetAppModal'

interface ModalContextType {
  openGetAppModal: () => void
  closeGetAppModal: () => void
  isGetAppModalOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }): ReactElement {
  const [isGetAppModalOpen, setIsGetAppModalOpen] = useState(false)

  const openGetAppModal = () => setIsGetAppModalOpen(true)
  const closeGetAppModal = () => setIsGetAppModalOpen(false)

  return (
    <ModalContext.Provider value={{ openGetAppModal, closeGetAppModal, isGetAppModalOpen }}>
      {children}
      <GetAppModal isOpen={isGetAppModalOpen} onClose={closeGetAppModal} />
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextType {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}


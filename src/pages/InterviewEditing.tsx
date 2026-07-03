import type { ReactElement } from 'react'
import VerticalLanding from '@/components/VerticalLanding'
import { getVertical } from '@/data/verticals'

export default function InterviewEditing(): ReactElement {
  return <VerticalLanding data={getVertical('/interview-editing')!} />
}

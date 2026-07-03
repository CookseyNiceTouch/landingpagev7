import type { ReactElement } from 'react'
import VerticalLanding from '@/components/VerticalLanding'
import { getVertical } from '@/data/verticals'

export default function SermonEditing(): ReactElement {
  return <VerticalLanding data={getVertical('/sermon-editing')!} />
}

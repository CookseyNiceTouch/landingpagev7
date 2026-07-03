import type { ReactElement } from 'react'
import VerticalLanding from '@/components/VerticalLanding'
import { getVertical } from '@/data/verticals'

export default function PodcastEditing(): ReactElement {
  return <VerticalLanding data={getVertical('/podcast-editing')!} />
}

/** Analytics stub. Replace the body of `track` once an analytics destination is
 *  picked (HubSpot tracking, GA, Plausible, etc.). The event names below are
 *  the contract the rest of the app uses. */

export type TranscribeEvent =
  | 'transcribe_uploaded'
  | 'transcribe_queued'
  | 'transcribe_completed'
  | 'transcribe_failed'
  | 'transcribe_form_submitted'
  | 'transcribe_downloaded'

export function track(event: TranscribeEvent, props?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, props ?? {})
  }
}

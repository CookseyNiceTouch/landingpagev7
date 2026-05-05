/** Transcript export generators (TXT, RTF, SRT, VTT).
 *  Pure functions — no DOM, no fetch. The TXT generator is kept for
 *  potential future use; the live UI ships RTF, SRT, and VTT. */

export interface Word {
  start: number
  end: number
  text: string
}

export interface Utterance {
  speaker: string
  start: number
  end: number
  text: string
  words?: Word[]
}

export interface Transcript {
  text: string | null
  words: Word[] | null
  utterances: Utterance[] | null
}

export interface TxtOptions {
  speakers: boolean
  timestamps: boolean
}

/** Format milliseconds as `HH:MM:SS,mmm` for SRT. */
function formatSrtTimestamp(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const hh = Math.floor(totalSec / 3600).toString().padStart(2, '0')
  const mm = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0')
  const ss = (totalSec % 60).toString().padStart(2, '0')
  const mmm = Math.max(0, Math.floor(ms % 1000)).toString().padStart(3, '0')
  return `${hh}:${mm}:${ss},${mmm}`
}

/** Format milliseconds as `HH:MM:SS.mmm` for VTT. */
function formatVttTimestamp(ms: number): string {
  return formatSrtTimestamp(ms).replace(',', '.')
}

/** Compact human time for inline TXT timestamps: `[mm:ss]` or `[hh:mm:ss]`. */
function formatHumanTimestamp(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const hh = Math.floor(totalSec / 3600)
  const mm = Math.floor((totalSec % 3600) / 60)
  const ss = totalSec % 60
  if (hh > 0) {
    return `[${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}]`
  }
  return `[${mm}:${ss.toString().padStart(2, '0')}]`
}

/** Group consecutive words into ~6-second SRT cues. Used when no utterances exist. */
function chunkWordsToCues(words: Word[], maxDurationMs = 6000): Array<{ start: number; end: number; text: string }> {
  if (words.length === 0) return []
  const cues: Array<{ start: number; end: number; text: string }> = []
  let buffer: Word[] = []
  let bufferStart = words[0]!.start

  for (const w of words) {
    if (buffer.length > 0 && w.end - bufferStart > maxDurationMs) {
      cues.push({
        start: bufferStart,
        end: buffer[buffer.length - 1]!.end,
        text: buffer.map((b) => b.text).join(' '),
      })
      buffer = []
      bufferStart = w.start
    }
    buffer.push(w)
  }
  if (buffer.length > 0) {
    cues.push({
      start: bufferStart,
      end: buffer[buffer.length - 1]!.end,
      text: buffer.map((b) => b.text).join(' '),
    })
  }
  return cues
}

export function toTxt(transcript: Transcript, opts: TxtOptions): string {
  const { speakers, timestamps } = opts

  if (transcript.utterances && transcript.utterances.length > 0) {
    return transcript.utterances
      .map((u) => {
        const parts: string[] = []
        if (timestamps) parts.push(formatHumanTimestamp(u.start))
        if (speakers) parts.push(`Speaker ${u.speaker}:`)
        parts.push(u.text.trim())
        return parts.join(' ')
      })
      .join('\n\n')
  }

  if (timestamps && transcript.words && transcript.words.length > 0) {
    return chunkWordsToCues(transcript.words)
      .map((c) => `${formatHumanTimestamp(c.start)} ${c.text.trim()}`)
      .join('\n')
  }

  return (transcript.text ?? '').trim()
}

export function toSrt(transcript: Transcript): string {
  const cues = transcript.utterances && transcript.utterances.length > 0
    ? transcript.utterances.map((u) => ({
        start: u.start,
        end: u.end,
        text: u.text.trim(),
        speaker: u.speaker,
      }))
    : transcript.words
      ? chunkWordsToCues(transcript.words).map((c) => ({ ...c, speaker: undefined }))
      : []

  if (cues.length === 0) {
    return transcript.text
      ? `1\n00:00:00,000 --> 00:00:05,000\n${transcript.text.trim()}\n`
      : ''
  }

  return cues
    .map((c, i) => {
      const idx = i + 1
      const stamp = `${formatSrtTimestamp(c.start)} --> ${formatSrtTimestamp(c.end)}`
      const line = c.speaker ? `Speaker ${c.speaker}: ${c.text}` : c.text
      return `${idx}\n${stamp}\n${line}\n`
    })
    .join('\n')
}

/**
 * Escape a string for safe insertion into an RTF document.
 *
 *   `\` → `\\`
 *   `{` → `\{`     (RTF group delimiter)
 *   `}` → `\}`
 *   `\n` → `\line` (soft line break inside a paragraph)
 *   non-ASCII → `\uN?` Unicode escape with ASCII fallback (the `?`)
 */
function escapeRtfText(s: string): string {
  let out = ''
  for (const ch of s) {
    if (ch === '\\') {
      out += '\\\\'
      continue
    }
    if (ch === '{') {
      out += '\\{'
      continue
    }
    if (ch === '}') {
      out += '\\}'
      continue
    }
    if (ch === '\r') continue
    if (ch === '\n') {
      out += '\\line\n'
      continue
    }
    if (ch === '\t') {
      out += '\\tab '
      continue
    }
    const code = ch.codePointAt(0)
    if (code === undefined) continue
    if (code < 0x80) {
      out += ch
    } else if (code <= 0xffff) {
      const signed = code > 32767 ? code - 65536 : code
      out += `\\u${signed}?`
    } else {
      const adjusted = code - 0x10000
      const hi = 0xd800 + (adjusted >> 10)
      const lo = 0xdc00 + (adjusted & 0x3ff)
      const hSigned = hi > 32767 ? hi - 65536 : hi
      const lSigned = lo > 32767 ? lo - 65536 : lo
      out += `\\u${hSigned}?\\u${lSigned}?`
    }
  }
  return out
}

/** `12:34` style for inline RTF timestamps (no brackets). */
function formatRtfTimestamp(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const hh = Math.floor(totalSec / 3600)
  const mm = Math.floor((totalSec % 3600) / 60)
  const ss = totalSec % 60
  if (hh > 0) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
  }
  return `${mm}:${ss.toString().padStart(2, '0')}`
}

export interface RtfMeta {
  /** Source file name (with or without extension). Used as the document title. */
  fileName: string
  /** Defaults to `new Date()` if omitted. */
  generatedAt?: Date
}

/**
 * Branded RTF document. Opens in Word, Pages, TextEdit, Google Docs, LibreOffice.
 *
 * Layout:
 *   Nice Touch          (36pt bold pink)
 *   Transcript          (28pt bold)
 *   <fileName>          (small grey)
 *   Generated <date>    (small grey)
 *
 *   Speaker A · 12:34   (bold pink, timestamp grey if enabled)
 *   Body text…
 *
 *   Speaker B · 12:38
 *   Body text…
 *
 *   Generated by Nice Touch — nicetouch.app/transcribe   (footer, small grey)
 */
export function toRtf(
  transcript: Transcript,
  opts: TxtOptions,
  meta: RtfMeta,
): string {
  const { speakers, timestamps } = opts
  const date = (meta.generatedAt ?? new Date()).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const out: string[] = []

  // ── Document preamble ────────────────────────────────────────────────────
  // \rtf1   RTF 1.0
  // \ansi   ANSI character set
  // colortbl: ;\red255\green0\blue140; (pink, idx 1) ;\red102\green102\blue102; (grey, idx 2)
  // Font 0 = Helvetica (sans), Font 1 = Georgia (serif body, falls back gracefully)
  out.push('{\\rtf1\\ansi\\ansicpg1252\\deff0')
  out.push(
    '{\\fonttbl{\\f0\\fswiss\\fcharset0 Helvetica;}{\\f1\\froman\\fcharset0 Georgia;}}',
  )
  out.push('{\\colortbl;\\red255\\green0\\blue140;\\red102\\green102\\blue102;}')
  out.push('{\\*\\generator Nice Touch Transcribe;}')
  // US Letter, 1in margins (1440 twips = 1 inch)
  out.push('\\paperw12240\\paperh15840\\margl1440\\margr1440\\margt1440\\margb1440')
  // Default body style: 11pt Helvetica with paragraph spacing
  out.push('\\pard\\sa120\\sl276\\slmult1\\f0\\fs22')

  // ── Branded header ───────────────────────────────────────────────────────
  out.push('{\\fs36\\b\\cf1 Nice Touch}\\par')
  out.push('{\\fs28\\b Transcript}\\par')
  out.push(
    `{\\cf2\\fs20 ${escapeRtfText(meta.fileName)}\\line Generated ${escapeRtfText(date)}}\\par`,
  )
  out.push('\\par')

  // ── Body ─────────────────────────────────────────────────────────────────
  if (transcript.utterances && transcript.utterances.length > 0) {
    for (const u of transcript.utterances) {
      const parts: string[] = []
      if (speakers) {
        parts.push(`{\\b\\cf1 Speaker ${escapeRtfText(u.speaker)}}`)
      }
      if (timestamps) {
        const stamp = formatRtfTimestamp(u.start)
        if (parts.length > 0) {
          parts.push(`{\\cf2  \\u183?  ${escapeRtfText(stamp)}}`)
        } else {
          parts.push(`{\\cf2 ${escapeRtfText(stamp)}}`)
        }
      }
      if (parts.length > 0) {
        out.push(parts.join('') + '\\par')
      }
      out.push(`${escapeRtfText(u.text.trim())}\\par`)
      out.push('\\par')
    }
  } else if (transcript.text && transcript.text.trim().length > 0) {
    out.push(`${escapeRtfText(transcript.text.trim())}\\par`)
  } else {
    out.push('{\\cf2\\i No speech detected.}\\par')
  }

  // ── Footer ───────────────────────────────────────────────────────────────
  out.push('\\par')
  out.push('{\\fs18\\cf2 Generated by Nice Touch \\u8212?  nicetouch.app/transcribe}\\par')
  out.push('}')

  return out.join('\n')
}

export function toVtt(transcript: Transcript): string {
  const cues = transcript.utterances && transcript.utterances.length > 0
    ? transcript.utterances.map((u) => ({
        start: u.start,
        end: u.end,
        text: u.text.trim(),
        speaker: u.speaker,
      }))
    : transcript.words
      ? chunkWordsToCues(transcript.words).map((c) => ({ ...c, speaker: undefined }))
      : []

  const header = 'WEBVTT\n\n'

  if (cues.length === 0) {
    return transcript.text
      ? `${header}00:00:00.000 --> 00:00:05.000\n${transcript.text.trim()}\n`
      : header
  }

  return (
    header +
    cues
      .map((c) => {
        const stamp = `${formatVttTimestamp(c.start)} --> ${formatVttTimestamp(c.end)}`
        const line = c.speaker ? `<v Speaker ${c.speaker}>${c.text}` : c.text
        return `${stamp}\n${line}\n`
      })
      .join('\n')
  )
}

import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { SANTANA_KNOWLEDGE } from '@/lib/santana-knowledge'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), { status: 500 })
  }

  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const body = await req.json()
  const messages = body.messages ?? []

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `Tu es SANTANA AI, l'assistant officiel et intelligent de la SANTANA FAMILLE.
Tu as une personnalité forte, directe et loyale à la famille.
Tu réponds exclusivement en français, avec respect et autorité.
Tu ne révèles JAMAIS le lien WhatsApp du groupe principal (confidentiel).
Pour rejoindre la famille, renvoie vers : /recrutement

Voici ta base de connaissance officielle :
${SANTANA_KNOWLEDGE}`,
    messages,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}

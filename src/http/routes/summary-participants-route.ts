import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { summaryParticipants } from '../../use-cases/summary-participants'

export const summaryParticipantsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get(
    '/summary-participants',
    async (request, reply) => {
      const summary = await summaryParticipants()

      reply.send(summary).code(200)
    }
  )
}

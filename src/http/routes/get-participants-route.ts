import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchParticipants } from '../../use-cases/fetch-participants'

export const getParticipantsRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.get(
    '/participants',
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().default(1),
          limit: z.coerce.number().default(10),
        }),
      },
    },
    async (request, reply) => {
      const { query } = request

      const participants = await fetchParticipants(query)

      reply.send(participants).code(200)
    }
  )
}

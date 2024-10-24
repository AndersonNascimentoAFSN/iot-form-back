import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getParticipant } from '../../use-cases/get-participant'

export const getParticipantRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get(
    '/participant',
    {
      schema: {
        querystring: z.object({
          name: z.string().optional(),
          uuid: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { query } = request

      const participants = await getParticipant(query)

      reply.send(participants).code(200)
    }
  )
}

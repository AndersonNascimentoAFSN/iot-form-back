import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { drawParticipant } from '../../use-cases/draw-participants'

export const getDrawParticipantRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get(
    '/draw-participant',
    {
      schema: {
        querystring: z.object({
          numberOfParticipants: z.coerce.number().default(1).optional(),
        }),
      },
    },
    async (request, reply) => {
      const { query } = request

      const participants = await drawParticipant(query)

      reply.send(participants).code(200)
    }
  )
}

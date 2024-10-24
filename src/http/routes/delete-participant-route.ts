import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteParticipants } from '../../use-cases/delete-participants'

export const deleteParticipantRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.delete(
    '/participants',
    {
      schema: {
        querystring: z.object({
          name: z.string().optional(),
          uuid: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, uuid } = request.query

      if (!name && !uuid) {
        reply
          .send({
            message: 'Você precisa definir um nome ou um uuid do participante',
          })
          .code(404)
      }

      await deleteParticipants({
        name,
        uuid,
      })

      reply.code(204)
    }
  )
}

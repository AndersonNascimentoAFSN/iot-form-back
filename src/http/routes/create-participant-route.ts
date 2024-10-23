import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createParticipant, Gender } from '../../use-cases/create-participant'

export const createParticipantRoute: FastifyPluginAsyncZod = async (app, _opts) => {
  app.post(
    '/participants',
    {
      schema: {
        body: z.object({
          name: z.string(),
          dateOfBirth: z.string(),
          gender: z.nativeEnum(Gender),
          hasStudiedProgramming: z.boolean(),
          isUfalStudent: z.boolean(),
          educationLevelId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const {
        name,
        gender,
        dateOfBirth,
        educationLevelId,
        hasStudiedProgramming,
        isUfalStudent,
      } = request.body

      const participantCreated = await createParticipant({
        name,
        gender,
        dateOfBirth,
        educationLevelId,
        hasStudiedProgramming,
        isUfalStudent,
      })

      reply.send(participantCreated).code(201)
    }
  )
}

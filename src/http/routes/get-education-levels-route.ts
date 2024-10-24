import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { fetchEducationLevels } from '../../use-cases/fetch-education-levels'

export const getEducationLevelsRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get('/education-levels', async (_, reply) => {
    const participants = await fetchEducationLevels()

    reply.send(participants).code(200)
  })
}

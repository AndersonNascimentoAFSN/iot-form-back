import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'

import fastifyCors from '@fastify/cors'

import { getParticipantsRoute } from './routes/get-participants-route'
import { createParticipantRoute } from './routes/create-participant-route'
import { getEducationLevelsRoute } from './routes/get-education-levels-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getParticipantsRoute)
app.register(createParticipantRoute)
app.register(getEducationLevelsRoute)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.info(`Server is running on http://localhost:${env.PORT}`)
  })
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })

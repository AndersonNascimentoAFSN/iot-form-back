import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '../env'

import fastifyCors from '@fastify/cors'

import { createParticipantRoute } from './routes/create-participant-route'
import { deleteParticipantRoute } from './routes/delete-participant-route'
import { getDrawParticipantRoute } from './routes/draw-participant-route'
import { getEducationLevelsRoute } from './routes/get-education-levels-route'
import { getParticipantRoute } from './routes/get-participant-route'
import { getParticipantsRoute } from './routes/get-participants-route'
import { summaryParticipantsRoute } from './routes/summary-participants-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getParticipantsRoute)
app.register(getParticipantRoute)
app.register(createParticipantRoute)
app.register(deleteParticipantRoute)
app.register(getEducationLevelsRoute)
app.register(summaryParticipantsRoute)
app.register(getDrawParticipantRoute)

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

import { client, db } from './index'
import { educationLevels, participants } from './schema'
;(async function seed() {
  await db.delete(participants)
  await db.delete(educationLevels)

  await db
    .insert(educationLevels)
    .values([
      { levelName: 'Ensino Fundamental (Completo)' },
      { levelName: 'Ensino Fundamental (Incompleto)' },
      { levelName: 'Ensino Médio (Completo)' },
      { levelName: 'Ensino Médio (Incompleto)' },
      { levelName: 'Curso Técnico (Completo)' },
      { levelName: 'Curso Técnico (em andamento)' },
      { levelName: 'Superior (completo)' },
      { levelName: 'Superior (em andamento)' },
      { levelName: 'Pós-Graduação (especialização)' },
      { levelName: 'Mestrado' },
      { levelName: 'Doutorado' },
      { levelName: 'Outro' },
    ])
    .returning()
    .execute()
})().finally(() => client.end())

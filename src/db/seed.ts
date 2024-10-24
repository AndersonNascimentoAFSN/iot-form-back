import { client, db } from './index'
import { educationLevels, participants } from './schema'
;(async function seed() {
  await db.delete(participants)
  await db.delete(educationLevels)

  const result = await db
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

  await db.insert(participants).values([
    {
      name: 'Alice',
      dateOfBirth: new Date().toISOString(),
      gender: 'female',
      hasStudiedProgramming: true,
      isUfalStudent: true,
      educationLevelId: result[0].id,
      createdAt: new Date(),
    },
    {
      name: 'Bob',
      dateOfBirth: new Date().toISOString(),
      gender: 'male',
      hasStudiedProgramming: true,
      isUfalStudent: true,
      educationLevelId: result[1].id,
      createdAt: new Date(),
    },
    {
      name: 'Charlie',
      dateOfBirth: new Date().toISOString(),
      gender: 'male',
      hasStudiedProgramming: false,
      isUfalStudent: false,
      educationLevelId: result[2].id,
      createdAt: new Date(),
    },
    {
      name: 'Diana',
      dateOfBirth: new Date().toISOString(),
      gender: 'female',
      hasStudiedProgramming: false,
      isUfalStudent: false,
      educationLevelId: result[3].id,
      createdAt: new Date(),
    },
    {
      name: 'Eve',
      dateOfBirth: new Date().toISOString(),
      gender: 'female',
      hasStudiedProgramming: true,
      isUfalStudent: false,
      educationLevelId: result[4].id,
      createdAt: new Date(),
    },
  ])
})().finally(() => client.end())

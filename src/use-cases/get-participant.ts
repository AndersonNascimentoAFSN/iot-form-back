import { eq, like, or, sql } from 'drizzle-orm'
import { db } from '../db'
import { educationLevels, participants } from '../db/schema'

interface IFetchParticipants {
  name?: string
  uuid?: string
}

export async function getParticipant({ name, uuid }: IFetchParticipants) {
  const data = await db
    .select({
      id: participants.id,
      name: participants.name,
      gender: participants.gender,
      dateOfBirth: participants.dateOfBirth,
      hasStudiedProgramming: participants.hasStudiedProgramming,
      isUfalStudent: participants.isUfalStudent,
      educationLevel: educationLevels.levelName,
      createdAt: participants.createdAt,
      age: sql`EXTRACT(YEAR FROM AGE(${participants.dateOfBirth}))`
        .mapWith(Number)
        .as('age'),
    })
    .from(participants)
    .innerJoin(
      educationLevels,
      eq(participants.educationLevelId, educationLevels.id)
    )
    .where(
      or(
        // name ? like(participants.name, `%${name}%`) : sql`false`,
        name ? eq(participants.name, name) : sql`false`,
        uuid ? eq(participants.id, uuid) : sql`false`
      )
    )
    .limit(1)

  return {
    data,
    filter: {
      search: {
        name,
        uuid,
      },
    },
  }
}

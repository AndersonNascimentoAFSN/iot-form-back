import { count, eq } from 'drizzle-orm'
import { db } from '../db'
import { educationLevels, participants } from '../db/schema'

interface IFetchParticipants {
  page: number
  limit: number
}

export async function fetchParticipants({ page = 1, limit = 10 }: IFetchParticipants) {
  const offset = (page - 1) * limit

  const [{ count: total }] = await db.select({ count: count() }).from(participants)

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
    })
    .from(participants)
    .innerJoin(
      educationLevels,
      eq(participants.educationLevelId, educationLevels.id)
    )
    .orderBy(participants.name)
    .limit(limit)
    .offset(offset)

  return {
    data,
    limit,
    page,
    total: total || 0,
  }
}

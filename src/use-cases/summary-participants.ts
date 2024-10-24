import { count, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { educationLevels, participants } from '../db/schema'

export async function summaryParticipants() {
  const data = await db
    .select({
      totalIsUfalStudent: sql<number>`COUNT(*) FILTER (WHERE ${participants.isUfalStudent} = true)`.mapWith(Number),
      totalHasStudiedProgramming: sql`COUNT(*) FILTER (WHERE ${participants.hasStudiedProgramming} = true)`.mapWith(Number),
      totalBirthdayThisMonth: sql`COUNT(*) FILTER (WHERE EXTRACT(MONTH FROM ${participants.dateOfBirth}) = ${new Date().getMonth() + 1})`.mapWith(Number),
      totalBirthdayThisDay: sql`COUNT(*) FILTER (WHERE EXTRACT(MONTH FROM ${participants.dateOfBirth}) = ${new Date().getMonth() + 1} AND EXTRACT(DAY FROM ${participants.dateOfBirth}) = ${new Date().getDate()})`.mapWith(Number),
      totalMale: sql`COUNT(*) FILTER (WHERE ${participants.gender} = 'male')`.mapWith(Number),
      totalFemale: sql`COUNT(*) FILTER (WHERE ${participants.gender} = 'female')`.mapWith(Number),
      totalOther: sql`COUNT(*) FILTER (WHERE ${participants.gender} = 'other')`.mapWith(Number),
      totalParticipant: sql`COUNT(*)`.mapWith(Number),
    })
    .from(participants)
    .innerJoin(
      educationLevels,
      eq(participants.educationLevelId, educationLevels.id)
    );

  return { data };
}

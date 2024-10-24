import { sql } from 'drizzle-orm'

import { db } from '../db'
import { participants } from '../db/schema'

interface IDrawParticipants {
  numberOfParticipants?: number
}

export async function drawParticipant({
  numberOfParticipants = 1,
}: IDrawParticipants) {
  const randomParticipant = await db
    .select({
      id: participants.id,
      name: participants.name,
      gender: participants.gender,
      age: sql`EXTRACT(YEAR FROM AGE(${participants.dateOfBirth}))`
        .mapWith(Number)
        .as('age'),
    })
    .from(participants)
    .orderBy(sql`RANDOM()`)
    .limit(numberOfParticipants)

  return { data: randomParticipant }
}

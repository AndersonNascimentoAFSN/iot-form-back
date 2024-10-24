import { eq, or, sql } from 'drizzle-orm'
import { db } from '../db'
import { participants } from '../db/schema'

interface IFetchParticipants {
  name?: string
  uuid?: string
}

export async function getParticipant({ name, uuid }: IFetchParticipants) {
  const data = await db
    .select()
    .from(participants)
    .where(
      or(
        name ? eq(participants.name, name) : sql`false`,
        uuid ? eq(participants.id, uuid) : sql`false`,
      )
    )
    .limit(1);

  return {
    data,
    filter: {
      search: {
        name,
        uuid,
      }
    },
  }
}

import { eq, or, sql } from 'drizzle-orm';
import { db } from '../db'
import { participants } from '../db/schema'

interface DeleteParticipantsRequest {
  name?: string
  uuid?: string
}

export async function deleteParticipants({
  name,
  uuid,
}: DeleteParticipantsRequest) {
  const result = await db
    .delete(participants)
    .where(
      or(
        name ? eq(participants.name, name) : sql`false`,
        uuid ? eq(participants.id, uuid) : sql`false`,
      )
    ).returning()
}

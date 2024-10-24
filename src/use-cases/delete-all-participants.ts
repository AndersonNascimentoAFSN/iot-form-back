import { db } from '../db'
import { participants } from '../db/schema'

export async function deleteParticipants() {
  await db
    .delete(participants)
    .execute();
}

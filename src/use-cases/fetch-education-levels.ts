import { db } from '../db'
import { educationLevels } from '../db/schema'

export async function fetchEducationLevels() {
  const data = await db
    .select()
    .from(educationLevels)
    .orderBy(educationLevels.id)

  return {
    data,
  }
}

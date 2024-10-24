import { db } from '../db'
import { participants } from '../db/schema'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type GenderValues = (typeof Gender)[keyof typeof Gender]

interface CreateParticipantRequest {
  name: string
  dateOfBirth: string
  gender: GenderValues
  hasStudiedProgramming: boolean
  isUfalStudent: boolean
  educationLevelId: string
}

export async function createParticipant({
  name,
  dateOfBirth,
  gender,
  hasStudiedProgramming,
  isUfalStudent,
  educationLevelId,
}: CreateParticipantRequest) {
  const result = await db
    .insert(participants)
    .values({
      name,
      dateOfBirth,
      educationLevelId,
      gender,
      hasStudiedProgramming,
      isUfalStudent,
    })
    .returning()

  const participant = result.at(0)

  return {
    participant,
  }
}

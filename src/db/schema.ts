import { createId } from '@paralleldrive/cuid2'
import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const educationLevels = pgTable('education_levels', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  levelName: varchar('level_name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull() // withTimezone detalhe de fuso horário
    .defaultNow(),
})

export const participants = pgTable('participants', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull().unique(),
  dateOfBirth: date('birth_date').notNull(),
  gender: varchar('gender', {
    length: 10,
    enum: ['male', 'female', 'other'],
  }).notNull(),
  hasStudiedProgramming: boolean('has_studied_programming').notNull(),
  isUfalStudent: boolean('is_ufal_student').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull() // withTimezone detalhe de fuso horário
    .defaultNow(),
  educationLevelId: text('education_level_id')
    .references(() => educationLevels.id)
    .notNull(),
})

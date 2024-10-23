CREATE TABLE IF NOT EXISTS "education_levels" (
	"id" text PRIMARY KEY NOT NULL,
	"level_name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "education_levels_level_name_unique" UNIQUE("level_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"birth_date" date NOT NULL,
	"gender" varchar(10) NOT NULL,
	"has_studied_programming" boolean NOT NULL,
	"is_ufal_student" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"education_level_id" text NOT NULL,
	CONSTRAINT "participants_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_education_level_id_education_levels_id_fk" FOREIGN KEY ("education_level_id") REFERENCES "public"."education_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

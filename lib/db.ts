import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS candidates (
      id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      full_name   TEXT NOT NULL,
      pseudo      TEXT NOT NULL,
      age         TEXT,
      country     TEXT,
      technical_level TEXT,
      previous_clans  TEXT,
      experience  TEXT,
      years_active TEXT,
      motivation  TEXT,
      availability TEXT,
      email       TEXT,
      whatsapp    TEXT,
      skills      TEXT,
      status      TEXT DEFAULT 'pending',
      notes       TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export type Candidate = {
  id: string
  full_name: string
  pseudo: string
  age?: string
  country?: string
  technical_level?: string
  previous_clans?: string
  experience?: string
  years_active?: string
  motivation?: string
  availability?: string
  email?: string
  whatsapp?: string
  skills?: string
  status: string
  notes?: string
  created_at: string
}

export async function getAllCandidates(): Promise<Candidate[]> {
  const rows = await sql`SELECT * FROM candidates ORDER BY created_at DESC`
  return rows as Candidate[]
}

export async function getCandidateById(id: string): Promise<Candidate | null> {
  const rows = await sql`SELECT * FROM candidates WHERE id = ${id}`
  return (rows[0] as Candidate) ?? null
}

export async function createCandidate(data: Omit<Candidate, 'id' | 'created_at'>): Promise<Candidate> {
  const rows = await sql`
    INSERT INTO candidates (full_name,pseudo,age,country,technical_level,previous_clans,experience,years_active,motivation,availability,email,whatsapp,skills,status)
    VALUES (${data.full_name},${data.pseudo},${data.age||null},${data.country||null},${data.technical_level||null},${data.previous_clans||null},${data.experience||null},${data.years_active||null},${data.motivation||null},${data.availability||null},${data.email||null},${data.whatsapp||null},${data.skills||null},'pending')
    RETURNING *
  `
  return rows[0] as Candidate
}

export async function updateCandidateStatus(id: string, status: string, notes?: string): Promise<void> {
  await sql`UPDATE candidates SET status=${status},notes=${notes||null} WHERE id=${id}`
}

export async function deleteCandidate(id: string): Promise<void> {
  await sql`DELETE FROM candidates WHERE id=${id}`
}

export async function getStats() {
  const [total, pending, approved, rejected] = await Promise.all([
    sql`SELECT COUNT(*) FROM candidates`,
    sql`SELECT COUNT(*) FROM candidates WHERE status='pending'`,
    sql`SELECT COUNT(*) FROM candidates WHERE status='approved'`,
    sql`SELECT COUNT(*) FROM candidates WHERE status='rejected'`,
  ])
  return {
    total: Number(total[0].count),
    pending: Number(pending[0].count),
    approved: Number(approved[0].count),
    rejected: Number(rejected[0].count),
  }
}

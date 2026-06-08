import type { Candidate } from './db'

export function candidatesToCsv(candidates: Candidate[]): string {
  const headers = ['ID','Nom','Pseudo','Âge','Pays','Niveau','Anciens clans','Expérience','Années actif','Motivation','Disponibilité','Email','WhatsApp','Compétences','Statut','Notes','Date']
  const rows = candidates.map(c => [
    c.id, c.full_name, c.pseudo, c.age||'', c.country||'',
    c.technical_level||'', c.previous_clans||'', c.experience||'', c.years_active||'',
    c.motivation||'', c.availability||'', c.email||'', c.whatsapp||'',
    c.skills||'', c.status, c.notes||'', c.created_at,
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  return [headers.join(','), ...rows].join('\n')
}

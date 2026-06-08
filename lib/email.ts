import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = 'SANTANA FAMILLE <noreply@santanafamille.fr>'
const NOTIFY_TO = 'santanafamille50@gmail.com'
const WA_GROUP = 'https://chat.whatsapp.com/DRVPRL8tyU71T4sndCdVQ3'

function baseHtml(content: string) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>SANTANA FAMILLE</title></head>
<body style="margin:0;padding:0;background:#060609;font-family:'Segoe UI',Arial,sans-serif;color:#f0f0f5;">
<div style="max-width:600px;margin:40px auto;padding:0 20px;">
  <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;">
    <div style="background:rgba(220,38,38,0.08);border-bottom:1px solid rgba(220,38,38,0.2);padding:28px 32px;display:flex;align-items:center;gap:12px;">
      <img src="https://files.catbox.moe/sn4lrd.jpg" alt="" style="height:36px;width:36px;border-radius:50%;object-fit:cover;border:1px solid rgba(220,38,38,0.3);" />
      <div>
        <div style="font-size:13px;font-weight:800;letter-spacing:0.1em;color:#fff;">SANTANA <span style="color:#dc2626;">FAMILLE</span></div>
        <div style="font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.2em;">LES DÉMONS DE LA TERREUR</div>
      </div>
    </div>
    <div style="padding:32px;">${content}</div>
    <div style="border-top:1px solid rgba(255,255,255,0.05);padding:20px 32px;text-align:center;">
      <div style="font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:0.3em;font-family:monospace;">𝐒𝚫𝐍𝐓𝚫𝐍𝚫 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵</div>
      <div style="font-size:9px;color:rgba(255,255,255,0.15);margin-top:6px;">© ${new Date().getFullYear()} SANTANA FAMILLE</div>
    </div>
  </div>
</div></body></html>`
}

export async function sendCandidateConfirmationEmail(to: string, fullName: string, pseudo: string) {
  if (!to) return
  const content = `
    <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#fff;">Candidature enregistrée !</h2>
    <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0 0 20px;line-height:1.6;">Bonjour <strong style="color:#fff;">${fullName}</strong>, votre candidature pour rejoindre la SANTANA FAMILLE sous le pseudo <strong style="color:#dc2626;">${pseudo}</strong> a bien été reçue.</p>
    <div style="background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:8px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#25D366;">Groupe d'évaluation WhatsApp</p>
      <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">Rejoignez le groupe officiel pour participer aux tests d'évaluation et suivre l'avancement de votre candidature.</p>
      <a href="${WA_GROUP}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.1em;">REJOINDRE LE GROUPE</a>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,0.25);font-style:italic;margin:16px 0 0;line-height:1.6;">"L'élite ne se rejoint pas. Elle se mérite."</p>
  `
  await resend.emails.send({ from: FROM, to, subject: '✅ Candidature reçue — SANTANA FAMILLE', html: baseHtml(content) })
}

export async function sendAdminNotificationEmail(candidateName: string, pseudo: string, email: string, whatsapp: string, motivation: string) {
  const content = `
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:800;color:#fff;">🔔 Nouvelle candidature</h2>
    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      ${[['Nom', candidateName],['Pseudo', pseudo],['Email', email || '—'],['WhatsApp', whatsapp || '—']].map(([k,v]) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);width:120px;">${k}</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#fff;">${v}</td></tr>`
      ).join('')}
    </table>
    <div style="margin-top:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:16px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.3);">Motivation</p>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.6);line-height:1.6;">${motivation || '—'}</p>
    </div>
  `
  await resend.emails.send({ from: FROM, to: NOTIFY_TO, subject: `🔔 Nouvelle candidature — ${candidateName} (${pseudo})`, html: baseHtml(content) })
}

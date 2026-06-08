# SANTANA FAMILLE — Plateforme officielle de recrutement

> *"L'élite ne se rejoint pas. Elle se mérite."*

Plateforme web officielle de la **SANTANA FAMILLE — Les Démons de la Terreur**.  
Interface de recrutement premium avec IA intégrée, gestion des candidatures et administration complète.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 15 (App Router, Edge Runtime) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova) |
| Animations | Framer Motion |
| Base de données | PostgreSQL via Neon Serverless |
| Email | Resend |
| IA | OpenAI GPT-4o-mini via AI SDK |
| Auth admin | JWT (jose) + cookie httpOnly |
| Déploiement | Vercel / Cloudflare Workers |

## Fonctionnalités

- **Hero vidéo** — Fond vidéo immersif plein écran avec superpositions gradient
- **Formulaire multi-étapes** — Email → Profil → Candidature, anti-spam (honeypot + rate limiting)
- **Lien groupe WhatsApp confidentiel** — Révélé uniquement après soumission de candidature
- **Santana AI** — Chatbot IA officiel avec connaissance complète de la famille
- **Emails automatiques** — Confirmation candidat (Resend) + notification admin
- **Interface d'administration** — Tableau de bord complet avec statuts, notes, export CSV
- **Design premium** — Dark theme minimaliste, typographie précise, micro-animations
- **SEO & Performance** — Métadonnées complètes, Edge Runtime, images optimisées

## Structure du projet

```
├── app/
│   ├── (site)/               # Layout public (navbar + footer)
│   │   ├── page.tsx          # Accueil
│   │   ├── recrutement/      # Formulaire de candidature
│   │   ├── a-propos/         # Histoire et vision
│   │   ├── hierarchie/       # Grades et structure
│   │   ├── reglement/        # Règlement officiel
│   │   ├── santana-ai/       # Chat IA plein écran
│   │   └── contact/          # Contacts officiels
│   ├── administration/       # Interface admin (protégée JWT)
│   └── api/chat/             # API Edge pour l'IA
├── components/
│   ├── home/                 # Hero, sections, leader
│   ├── admin/                # Dashboard, login
│   └── ui/                   # Composants shadcn
└── lib/                      # DB, email, auth, export, knowledge
```

## Installation locale

```bash
npm install
cp .env.example .env.local
# Remplissez les variables dans .env.local
npm run dev
```

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `DATABASE_URL` | Connexion Neon PostgreSQL | ✅ |
| `OPENAI_API_KEY` | Clé API OpenAI (GPT-4o-mini) | ✅ |
| `RESEND_API_KEY` | Clé API Resend pour les emails | ✅ |
| `ADMIN_PASSWORD` | Mot de passe du panneau admin | ✅ |
| `JWT_SECRET` | Secret JWT (min. 32 caractères) | ✅ |

## Déploiement

### Vercel (recommandé)

Importez le repo dans Vercel et configurez les variables d'environnement dans le tableau de bord.

### Cloudflare Workers

```bash
npm run build && wrangler deploy
```

## Administration

Accès : `/administration`

Fonctionnalités :
- Vue de toutes les candidatures avec filtrage par statut
- Mise à jour du statut (En attente / En test / Approuvé / Rejeté)
- Ajout de notes internes par candidat
- Suppression de candidatures
- Export CSV complet

## Sécurité

- Honeypot anti-bot sur le formulaire de recrutement
- Rate limiting : 3 soumissions par IP par heure
- JWT httpOnly pour l'authentification admin
- Validation stricte côté serveur (Server Actions)
- Lien WhatsApp groupe principal jamais exposé publiquement

---

<div align="center">

**𝐒𝚫𝐍𝐓𝚫𝐍𝚫 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵**

[GitHub](https://github.com/Med12-q) · [WhatsApp](https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F) · [Telegram](https://t.me/varnox_official)

</div>

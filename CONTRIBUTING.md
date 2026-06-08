# Contribuer à la plateforme SANTANA FAMILLE

## Prérequis

- Node.js 20+, npm, PostgreSQL (Neon recommandé)

## Mise en place locale

```bash
npm install && cp .env.example .env.local && npm run dev
```

## Conventions

- TypeScript strict, pas de `any` non justifié
- Un composant par fichier, `kebab-case` pour les fichiers
- Tailwind tokens uniquement (`bg-background`, `text-foreground`)
- Server Actions pour toute écriture en base

## Workflow

1. Créez une branche `feat/ma-fonctionnalite`
2. Committez avec des messages clairs : `feat: ajoute X`, `fix: corrige Y`
3. Ouvrez une Pull Request vers `main` avec description détaillée

---

*L'élite ne se rejoint pas. Elle se mérite.*

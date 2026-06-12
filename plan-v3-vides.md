# Plan V3 : Corriger les vides dans les pages

## Problèmes identifiés

### Home.tsx
- **Ligne 313** : `min-h-[100dvh]` sur chaque EditorialModule → 4 modules = 400vh de hauteur minimale
- **Padding 96px** entre sections (KeyFigures, News, etc.) trop généreux
- Fix : Supprimer min-h-[100dvh], remplacer par hauteur auto, réduire padding

### Pages internes : héros sans padding-top
- Services, Démarches, Politiques, Transparence, About, Contact, Actualités
- Leur héro n'a pas de padding-top pour le header fixed de 80px
- Fix : Ajouter padding-top: 100px à chaque hero section

### Espaces excessifs entre sections
- Padding '96px 0' → réduire à '64px 0' ou '48px 0'
- Padding '80px 0' → réduire à '48px 0'
- Des gaps de 48px → réduire à 24px

## Agents
1. **HomeFix** : Corrige Home.tsx (modules 100vh, padding)
2. **PagesFix1** : Services + Démarches + Actualités + Contact (padding héros, vides)
3. **PagesFix2** : Politiques + Transparence + About (padding héros, vides)

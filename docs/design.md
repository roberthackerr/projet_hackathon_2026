# MadaAI Hub — Design System & Direction Artistique

## Vision Générale

MadaAI Hub adopte une direction artistique moderne appelée :

> **Cinematic AI Operating System UI**

Le but de cette interface est de créer une expérience immersive, futuriste et premium qui donne immédiatement l’impression d’utiliser une plateforme d’intelligence artificielle internationale.

Le design mélange :

* SaaS premium moderne
* Glassmorphism subtil
* Dashboard IA immersif
* Minimalisme cinématique
* UX futuriste
* Identité africaine moderne

---

# Objectifs Psychologiques du Design

L’interface doit transmettre immédiatement les sensations suivantes :

* Technologie avancée
* Produit crédible
* Plateforme internationale
* IA en temps réel
* Fluidité et modernité
* Simplicité malgré la puissance

L’utilisateur doit ressentir qu’il entre dans un véritable :

> "AI Operating System"

et non dans un simple site web.

---

# Palette de Couleurs

## Couleurs Principales

| Usage                | Couleur   | Description               |
| -------------------- | --------- | ------------------------- |
| Background principal | `#081018` | Bleu nuit profond premium |
| Surface secondaire   | `#0F172A` | Cartes et panels          |
| Card background      | `#111827` | Conteneurs principaux     |
| Texte principal      | `#F8FAFC` | Blanc cassé doux          |
| Texte secondaire     | `#94A3B8` | Gris moderne              |
| Accent vert          | `#10B981` | IA, énergie, succès       |
| Accent cyan          | `#06B6D4` | Technologie, data         |
| Accent bleu          | `#3B82F6` | Navigation et highlights  |

---

# Style Visuel Principal

## 1. Glassmorphism Premium

Le glassmorphism utilisé dans MadaAI Hub est léger et élégant.

### Règles

* Transparence subtile
* Blur doux
* Bordures très fines
* Ombres diffuses
* Jamais trop flashy

### Classes Tailwind typiques

```css
bg-white/5
backdrop-blur-xl
border border-white/10
```

---

## 2. Glow System

Les effets lumineux servent à créer une ambiance IA vivante.

### Types de glow

* Glow cyan : technologie
* Glow vert : intelligence et activité
* Glow bleu : profondeur système

### Exemple

```css
shadow-[0_0_40px_rgba(16,185,129,0.25)]
```

### Important

Le glow doit rester :

* diffus
* professionnel
* cinématique
* jamais gaming

---

# Typographie

## Police principale

### Titres

* Space Grotesk
* Satoshi

### Texte

* Inter

---

## Hiérarchie Typographique

| Élément       | Taille      |
| ------------- | ----------- |
| Hero Title    | 64px → 96px |
| Section Title | 32px → 48px |
| Card Title    | 18px → 24px |
| Texte normal  | 14px → 16px |
| Micro labels  | 12px        |

---

# Background System

Le fond de l’application ne doit jamais être vide.

## Éléments utilisés

### 1. Radial gradients

Créent une lumière immersive.

### 2. Grid futuriste

Donne une sensation cyberspace.

### 3. Noise texture

Ajoute du réalisme visuel.

### 4. Floating blur blobs

Ajoutent du mouvement implicite.

---

# Navbar Design

## Style

> Floating Glass Navigation

### Caractéristiques

* sticky top navigation
* backdrop blur
* border translucide
* hover fluide
* spacing généreux

### Sensation recherchée

* système d’exploitation moderne
* SaaS premium
* fluidité native

---

# Hero Section

Le hero est la partie la plus importante.

## Structure

### Partie gauche

* Titre massif
* Gradient text
* CTA principal
* Description produit
* Social proof

### Partie droite

* Dashboard IA immersif
* Cartes IA live
* Activité temps réel
* Widgets système

---

# Boutons

## Style Principal

### Composition

* Gradient dynamique
* Glow subtil
* Coins très arrondis
* Hover scale
* Animation fluide

### Exemple

```css
bg-gradient-to-r from-cyan-500 to-emerald-500
hover:scale-105
transition-all duration-300
```

---

## Style Secondaire

* Transparent
* Minimaliste
* Border glass
* Hover doux

---

# Cards IA

Les cartes représentent les IA du marketplace.

## Objectif

Chaque IA doit sembler :

* vivante
* intelligente
* premium
* interactive

## Composition d’une card

### Obligatoire

* Logo IA
* Gradient personnalisé
* Nom IA
* Description
* Tags
* Rating
* Utilisateurs actifs
* CTA

---

## Effets Visuels

### Hover lift

```css
hover:-translate-y-1
```

### Glow dynamique

### Border translucide

### Background glass

---

# Dashboard Style

Le dashboard doit ressembler à un centre de contrôle IA.

## Inspirations

* Linear
* Vercel
* Raycast
* OpenAI
* Framer

## Éléments importants

* Activity feed
* Live indicators
* Metrics widgets
* Floating panels
* Realtime system feeling

---

# Layout Rules

## Espacement

Le design doit respirer.

### Règles

* grands paddings
* beaucoup d’espace négatif
* sections aérées
* pas d’éléments collés

---

## Border Radius

Style très moderne.

### Valeurs recommandées

| Élément | Radius      |
| ------- | ----------- |
| Buttons | 16px → 24px |
| Cards   | 24px → 32px |
| Panels  | 32px        |
| Pills   | full        |

---

# Animations

## Philosophie

Les animations doivent être :

* lentes
* naturelles
* fluides
* premium

Pas d’animations agressives.

---

## Technologies recommandées

* Framer Motion
* Lenis Smooth Scroll
* React Spring

---

## Animations clés

| Élément   | Animation       |
| --------- | --------------- |
| Cards     | Floating hover  |
| Buttons   | Scale + glow    |
| Hero      | Fade-up stagger |
| Navbar    | Blur on scroll  |
| Dashboard | Live pulse      |
| Widgets   | Floating motion |

---

# Marketplace Design

Le marketplace doit mélanger :

* Netflix UI
* AI Dashboard
* App Store premium

## Grid responsive

| Device       | Colonnes |
| ------------ | -------- |
| Mobile       | 1        |
| Tablet       | 2        |
| Desktop      | 3        |
| Large screen | 4        |

---

# Mobile UX

## Mobile-first obligatoire

### Spécificités mobile

* Bottom navigation
* Swipe interactions
* Floating action buttons
* Cards compactes
* Animations allégées

---

# Identité Malagasy Moderne

## Important

L’identité malgache doit rester :

* élégante
* subtile
* moderne
* internationale

## À utiliser

* couleurs inspirées nature tropicale
* paysages premium Madagascar
* esthétique africaine futuriste

## À éviter

* surcharge ethnique
* motifs folkloriques excessifs
* couleurs trop saturées

---

# Inspirations Design

## Références Principales

* Linear
* Vercel
* Stripe
* Framer
* Raycast
* Supabase
* OpenAI

---

# Stack UI Recommandée

| Outil         | Usage              |
| ------------- | ------------------ |
| Tailwind CSS  | Styling principal  |
| shadcn/ui     | Composants UI      |
| Framer Motion | Animations         |
| Lucide React  | Icônes             |
| Aceternity UI | Sections premium   |
| Magic UI      | Composants IA      |
| Three.js      | Effets avancés     |
| React Bits    | Micro interactions |

---

# Philosophie Finale

Le design de MadaAI Hub doit donner l’impression :

* d’une startup IA internationale
* d’une plateforme futuriste crédible
* d’un système intelligent vivant
* d’une expérience premium fluide

Le mot-clé principal est :

> Immersion

Chaque écran doit sembler faire partie d’un véritable écosystème IA moderne.

# Portfolio — Noham Sami

Portfolio one-page, statique (HTML / CSS / JS sans dépendance), prêt pour GitHub Pages.

## Nouveautés V3 (alignement sur la maquette)

- **Hero** : vrai globe terrestre de nuit (image NASA, domaine public) rendu en canvas, avec Montréal, Dijon et Santander placées à leurs coordonnées réelles et des arcs animés.
- **À propos** : texte + photo avec badge « Basé à Dijon », 4 valeurs illustrées (icônes au trait).
- **Parcours** : frise horizontale avec points, photos et puces ; filtres Tout / Études / Expériences ; version verticale sur mobile.
- **Projets** : cartes photo avec logo, tags et « Voir le projet → ».
- **Fiche projet** : mise en page deux colonnes (contexte, problématique, rôle, réalisations, résultat, durée / lieu / équipe) et galerie avec miniatures, compteur et flèches (clavier ← →).
- **Compétences** : 4 cartes, logos réparés (12 logos Microsoft & co renvoyaient une 404 chez Simple Icons — remplacés via Iconify).
- **International** : cartes villes, carte NASA avec arcs, chiffres clés (3 pays, 18 mois à l'étranger, 3 langues).
- **Contact** : décor crépusculaire, email (avec bouton copier), téléphone, LinkedIn + GitHub, CV France / Canada.
- FR / EN complet (langue du navigateur détectée au premier chargement), accessibilité clavier, `prefers-reduced-motion`.

## Structure

- `index.html` : structure du site
- `styles.css` : design et responsive
- `js/data.js` : **tout le contenu** (parcours, projets, compétences, villes, photos…)
- `js/i18n.js` : textes de l'interface FR / EN
- `js/globe.js` : rendu du globe du hero
- `js/app.js` : rendu des sections, fiche projet, menus, animations
- `assets/images/` : illustrations locales
- `assets/cv/` : CV France et Canada

## Lancer le site en local

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. (Le globe a besoin d'une connexion Internet pour charger l'image NASA.)

## Ajouter ta photo

Dépose simplement ta photo dans `assets/images/profile.jpg` (format paysage 4:3 idéalement). Tant que le fichier n'existe pas, un monogramme « NS » s'affiche.

## Ajouter des captures à un projet

Dans `js/data.js`, chaque projet a une liste `gallery`. Ajoute des chemins d'images (ex. `'assets/images/aprr-dashboard.png'`) : les miniatures, le compteur « 1 / 4 » et les flèches apparaissent automatiquement.

Les infos `meta` (durée, lieu, équipe) s'affichent en bas de la fiche ; une valeur vide n'est pas affichée.

## Ajouter une étape au parcours

Ajoute un objet dans `timeline` (`type: 'study'` ou `type: 'work'` pour les filtres).

## GitHub Pages

1. Pousser les fichiers à la racine du dépôt.
2. `Settings > Pages` → `Deploy from a branch` → `main` / `(root)`.

## Ressources distantes

Les photos (Wikimedia Commons, voir `credits.html`) et les logos de compétences (Iconify) sont chargés en ligne. Pour un site 100 % autonome, télécharge-les dans `assets/` et remplace les URLs dans `js/data.js`.

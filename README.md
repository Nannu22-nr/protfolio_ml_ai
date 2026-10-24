# Ohidul Alam — Portfolio

AI/ML Engineer & Biomedical Engineering portfolio.
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 · Motion · Lucide.
No backend, database or paid API is required.

## Where to edit content

| What | File |
| --- | --- |
| Email, GitHub, LinkedIn, resume path, site URL | `src/config/site.ts` |
| The two live app URLs | `src/config/site.ts` → `projectUrls` |
| Projects (add / hide / verify) | `src/data/projects.ts` |
| Research entries | `src/data/research.ts` |
| Experience, education, leadership | `src/data/experience.ts` |
| Intro text, skills, certifications | `src/data/profile.ts` |
| Technical Lab diagrams | `src/data/lab.ts` |
| Nav items | `src/config/navigation.ts` |
| Portrait / resume files | `public/images/portrait.webp`, `public/resume/Ohidul_Alam_CV.pdf` |

## Interactive & 3D parts

| What | File |
| --- | --- |
| Cursor-reactive text (name, headings, objective) | `src/components/ui/InteractiveText.tsx` |
| 3D tilt for cards and project illustrations | `src/components/ui/Tilt.tsx` |
| Canvas engine (resize, pointer, pause off-screen, reduced motion) | `src/components/canvas/AnimatedCanvas.tsx` |
| ECG / EEG / MRI brain / RNA-DNA helix animations | `src/components/canvas/Ecg3D.tsx`, `Eeg3D.tsx`, `Brain3D.tsx`, `Helix3D.tsx` |
| Hero network backdrop | `src/components/canvas/ParticleField.tsx` |
| 3D project illustrations | `src/components/visuals/AimscribeVisual.tsx`, `AssistantVisual.tsx` |
| "All Projects" section (filter + detailed cards) | `src/components/sections/AllProjects.tsx` |

All 3D visuals are synthetic schematics, drawn with the Canvas 2D API and CSS 3D transforms (no extra libraries).
Motion is disabled on touch devices where it needs a pointer, and a static frame is drawn when the user prefers reduced motion.

### Adding a project
Append an object to `projects` in `src/data/projects.ts`. No layout edits needed.
`featured: true` gives a large showcase and a case-study page; `featured: false` adds it to the "All Projects" section; `visible: false` hides it.
For index projects add a `group` (filter chip) and `details` (`problem`, `pipeline`, `demonstrates`) to get the detailed card.
Add `repoUrl`, `metrics` or a `previewImage` only when verified.

## Windows PowerShell commands

Requires Node.js 20.9+ (`node -v`).

```powershell
# 1. open the project folder
cd path\to\ohidul-alam-portfolio

# 2. install dependencies
npm install

# 3. start the dev server  ->  http://localhost:3000
npm run dev

# 4. checks (ESLint + TypeScript)
npm run check

# 5. production build, then run it locally
npm run build
npm run start
```

## Push to GitHub

Create an empty repository on github.com first (no README), then:

```powershell
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Nannu22-nr/YOUR-REPO-NAME.git
git push -u origin main
```

## Deploy on Vercel

1. Sign in at vercel.com with GitHub.
2. **Add New → Project**, then import the repository.
3. Framework preset is detected automatically as **Next.js**. Leave build settings as they are.
4. No environment variables are needed. Click **Deploy**.
5. After deploying, if your URL differs from `https://protfolio-ohidul.vercel.app`, update `siteConfig.url` in `src/config/site.ts` and push again (used for metadata, sitemap and Open Graph).

Every push to `main` redeploys automatically.

## Notes

- External links use `target="_blank"` with `rel="noopener noreferrer"`. The portfolio does not embed the live apps in iframes and does not depend on them being online.
- Case-study sections marked "Not yet documented" are intentional: they stay empty until verified details are added.
- Illustrations and diagrams are labeled as illustrative; none are presented as real data or real screenshots.

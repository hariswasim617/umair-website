# Muhammad Umair — Personal Portfolio

Personal website of **Muhammad Umair**, first-year MBBS student at Amna Inayat Medical College, Lahore, Pakistan.

Built with React, Vite, Tailwind CSS v4, Framer Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Editing content

All text, links and image paths live in **`src/data/content.js`**. You don't need to edit any component to change content.

### Replacing images

| What | How |
| --- | --- |
| Profile photo (hero + about) | Add your photo to `public/images/` (e.g. `umair.jpg`), then set `profile.image` / `profile.aboutImage` in `content.js` to `asset('/images/umair.jpg')`. A 4:5 portrait works best. |
| Project thumbnails | Each project shows built-in artwork while `image: null`. Set `image: '/images/your-thumbnail.jpg'` to use a photo (3:2 works best). |
| CV | Replace `public/cv/Muhammad-Umair-CV.pdf` with your real CV, keeping the same file name. |
| Social preview | `public/og-image.png` (1200×630). |

### Instagram link

The exact Instagram handle wasn't available, so Instagram buttons currently open an Instagram search for "Hidayat ul Quran". Set `contact.instagramUrl` in `content.js` to the real profile URL to link to it directly.

## Contact form

The form validates all fields. Out of the box it **does not send messages itself**: when submitted, it opens the visitor's email app with the message pre-filled, addressed to `umair206@gmail.com`, and the page tells them so.

To have the form send messages directly, create a free form endpoint (for example on [Formspree](https://formspree.io)) and add it to a `.env` file:

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id
```

Rebuild, and the form will POST JSON (`name`, `email`, `subject`, `message`) to that endpoint and show a success or error message.

## Deployment (GitHub Pages)

The site deploys automatically with `.github/workflows/deploy.yml` on every push to `main`. It can also be run by hand from the **Actions** tab.

**One-time setup:** in the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The live site is at **https://hariswasim617.github.io/umair-website/**.

- The build uses the base path `/umair-website/`. Reference files in `public/` through `asset('/path')` in `content.js` so they resolve correctly.
- For a custom domain, update the absolute URLs (canonical, `og:url`, `og:image`) in `index.html`. The workflow sets the base path from the Pages configuration automatically.
- To make the contact form send directly, add a repository **variable** (Settings → Secrets and variables → Actions → Variables) named `VITE_CONTACT_ENDPOINT`.

## Project structure

```
src/
  data/content.js          ← all site content
  components/
    layout/                ← navbar, footer, preloader, background, back-to-top, cursor glow
    sections/              ← Hero, About, Interests, Skills, Projects, Education, Certifications, Vision, Contact
    art/ProjectArt.jsx     ← SVG project thumbnails
    ui/                    ← reusable building blocks (Button, Reveal, SectionHeading, Spotlight…)
  hooks/                   ← active-section tracking, scroll state, pointer detection
public/                    ← favicon, icons, OG image, CV, images
```

## Accessibility & performance

- Respects `prefers-reduced-motion`: animations, smooth scrolling and the intro are reduced or skipped.
- Skip link, visible focus styles, labelled form fields with announced errors, a keyboard-trappable mobile menu that closes with Esc.
- The particle canvas pauses when off-screen or when the tab is hidden; the cursor glow only runs on mouse or trackpad devices.

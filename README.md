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
| Profile photo (hero + about) | Add your photo to `public/images/` (e.g. `umair.jpg`), then set `profile.image` / `profile.aboutImage` in `content.js` to `'/images/umair.jpg'`. A 4:5 portrait works best. |
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

## Deployment

The `dist/` folder is a static site. Deploy it to Netlify, Vercel, GitHub Pages or any static host. After deploying, update the `og:image` / `twitter:image` tags in `index.html` to absolute URLs on your domain so link previews work everywhere.

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

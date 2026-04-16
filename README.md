# The Snack Pack Co. — Holding Page

A coming-soon page for **The Snack Pack Co.**, a new children's book franchise for ages 2–5.

🌐 Live at: *thesnackpackco.com* (once DNS is pointed)

## About

Food characters, secretly alive when humans aren't looking. A connected universe of picture books built in the spirit of Mr Men, Toy Story, and the MCU.

- **Book 1** — *Brocky's First Adventure* (in production)
- **Book 2** — *Carra Can't Stop*
- **Book 3** — *Peppe Has Opinions*

## Structure

```
.
├── index.html      ← the whole page (single file, no build step)
├── logo.jpg        ← brand logo
└── README.md
```

## Running locally

No build needed. Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In repo **Settings → Pages**, set source to `main` branch, `/ (root)` folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.
4. To use `thesnackpackco.com`: in **Settings → Pages**, add the custom domain, and point your DNS `A` / `CNAME` records as instructed by GitHub.

## Email capture

The signup form currently logs to the browser console. To make it live, wire the form action up to one of:

- **Formspree** (quick, free tier, no backend) — easiest
- **Buttondown** — simple newsletter tool
- **Mailchimp** or **ConvertKit** — if you want full marketing tooling
- **Resend + a small serverless function** — most flexible, keeps data fully in your control

Look for the `TODO` comment in `index.html` and swap the `handleSubmit` function for a `fetch` call to your chosen endpoint.

## Credits

Built by The Snack Pack Co.
© 2026. All rights reserved.

# Shakespeare Study Book

A visual digital book for studying Shakespeare. It includes all 15 posters supplied for this project, arranged in four chapters:

1. Iambic Pentameter
2. Wrenching, Enjambment & Caesura
3. Shakespeare’s Language
4. Literary Devices

Readers can select a chapter or page, use Previous and Next, navigate with the left and right arrow keys, swipe on touch screens, and enlarge each poster for detailed reading. Page URLs use `#page-1` through `#page-15`.

## Run locally

This is a static site with no build step. Serve the `dist` folder with any local HTTP server, for example:

```sh
python3 -m http.server 8000 -d dist
```

Open `http://localhost:8000`.

## Deploy on Netlify

Import this GitHub repository in Netlify. The included `netlify.toml` sets the publish directory to `dist`; no build command is needed. Pushes to the connected production branch can then deploy automatically.

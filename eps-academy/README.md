# EPS Engineering Leadership Academy
Static site: HTML, CSS, vanilla JS. No build step.
## Publish on GitHub Pages
1. Create a repository and push these files to the root of `main`.
2. Repository Settings > Pages.
3. Source: Deploy from a branch. Branch: `main`, folder `/ (root)`. Save.
4. Open `https://<user>.github.io/<repo>/` after a minute or two.
## Structure
`index.html`, `assets/styles.css`, `assets/app.js`, `chapters/NN-name.html`. The chapter list lives in one array at the top of `assets/app.js`; sidebar, search and prev/next all read it. Each chapter needs `<main>`, a `<div class="pn"></div>` for navigation, and the two asset links.

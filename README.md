# The Service Window

A cellar list for fast food. Pick a restaurant and a dish. The page returns a wine, a straight tasting note, the reason the pairing works, how to serve it, and a less expensive bottle.

The voice is a sommelier who does not change registers between a tasting menu and a paper bag. The wines and the regions are real. The site is not affiliated with any restaurant named on it.

## Run it

No build step and no server are required. Open `index.html` in a browser.

To serve it locally:

```bash
python3 -m http.server 8747
```

Then visit `http://127.0.0.1:8747`.

The menu grid shows ten dishes, listed in `CELLAR.menu` inside `data/pairings.js`. The other pairings stay in that file and are not shown. A card uses the WebP at its `image` path when that file is present (4:3, about 800×600). Until then it shows a cream panel with the dish name.

Pairings are shareable. A Big Mac, for example, lives at `#/mcdonalds/big-mac`.

## GitHub Pages

Pushing `main` runs `.github/workflows/pages.yml`, which publishes this folder as a static site. Asset paths are relative, so the site also works at a project address such as `/the-service-window/`. In the repository settings, set Pages to deploy with GitHub Actions.

## Add a dish

Edit `data/pairings.js`. Each house has an `items` array. Copy an existing item and keep the id unique within that house.

Required fields: `id`, `name`, `wine`, `place`, `food`, `why`, `service`, `budgetWine`, `budgetPlace`, `budget`.

`keys` is optional extra search text.

## Type

Fraunces, Source Serif 4, and Outfit are included under the SIL Open Font License. See `fonts/OFL.txt` and `fonts/NOTICE.txt`.

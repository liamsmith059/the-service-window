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

Source Serif 4 and Outfit are included under the SIL Open Font License. See `fonts/OFL.txt` and `fonts/NOTICE.txt`.

## The Crate

The vinyl catalogue lives at `/crate/` and is drawn from `data/crate.js` (`window.CRATE`). Most entries come from Liam's public Discogs collection (user Liamsmith112). Artist-name disambiguators such as "Peach Pit (3)" and "Boogie (26)" are stripped, and `year` is the original album year rather than the year of a later pressing. Faces (Mac Miller) and Live Vol. 1 (Parcels) are included from his photographs even though they are not on the Discogs list.

To add a record, append an object with `artist`, `title`, and a `slug`. `year` and `note` are optional. Save sleeve art as WebP in `images/sleeves/`:

- `images/sleeves/<slug>.webp` — up to 480px wide, natural aspect (sleeves are usually square)
- `images/sleeves/<slug>-240.webp` — 240px wide companion

Do not upscale. Quality about 85, LANCZOS. Set `coverWidth` / `coverHeight` to the pixel size of the 480w file, or leave them off and the page will assume 480×480.

The Archives tile (`images/hub/crate.webp`, plus 800 and 480 variants) is a composite of three sleeves — *Faces* (Mac Miller), *Harry's House* (Harry Styles), and *Live in '25* (Peach Pit) — overlapping on a dark backdrop in the same manner as the Library and Screening Room tiles. Each source photograph was cropped to just its square sleeve, then all three were scaled to identical pixel dimensions before composing, so no sleeve appears larger or more zoomed-in than the others. Sleeve art lives in `images/sleeves/`. Faces, Live Vol. 1, Live in '25, and Harry's House use his photographs; the others use square crops of the Discogs cover images.

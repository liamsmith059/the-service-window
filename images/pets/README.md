# Pet photographs

Drop each portrait here as a WebP, named to match the card slug on the Pets page:

    images/pets/<slug>.webp

A narrower `images/pets/<slug>-480.webp` companion is also used in the `srcset` when one exists.

Already in place:

- `larry.webp` / `larry-480.webp` (960px and 480px wide, landscape)
- `fred.webp` / `fred-480.webp` (960px and 480px wide, portrait)
- `larry-and-fred.webp` / `larry-and-fred-480.webp` (960px and 480px wide, portrait; the family portrait at the top of the page)

Then, in `pets/index.html`, add a card (there is a commented template on the page) and point the `<img>` at those files. Use the photograph’s natural aspect ratio; the frame will follow it, the same way Library covers do. For a pet that has died, add the class `is-memoriam` to the article and an “In memoriam” label.

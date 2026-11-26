# The Crate sleeve art

Used on `/crate/` for each record in `data/crate.js`.

Save official (or photographed) sleeve art as WebP:

- `<slug>.webp` — up to 480px wide, natural aspect (album sleeves are usually square)
- `<slug>-240.webp` — 240px wide companion

Do not upscale. Quality about 85, LANCZOS. Set `coverWidth` / `coverHeight` on the entry to the pixel size of the 480w file.

Faces, Live Vol. 1, Live in '25, and Harry's House use photographs of the copies he owns. The rest of the catalogue uses square crops of the Discogs cover images.

The Archives tile (`images/hub/crate.webp`, plus 800 and 480 variants) is a composite of three photographed sleeves: *Faces* (Mac Miller), *Harry's House* (Harry Styles), and *Live in '25* (Peach Pit).

If the composite is remade:

1. Crop each photograph to just its square sleeve, detecting the sleeve edges, so surrounding table, background, or a peeking disc is not included.
2. Scale all three cropped sleeves to identical pixel dimensions before composing, so no sleeve appears larger or more zoomed-in than the others.

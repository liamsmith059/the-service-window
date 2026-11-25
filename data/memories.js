/* Photograph albums, in the order the pictures were taken.

 * To add a memory:
 *   1. Compress the photograph to WebP. Make two files and keep the
 *      originals off the repository; they are too large for GitHub Pages.
 *        images/memories/<name>.webp        long edge about 1600px
 *        images/memories/<name>-480.webp    a smaller thumbnail of the same crop
 *   2. Append an object to window.MEMORIES:
 *        {
 *          date: "2019-07-12",   // YYYY-MM-DD, or YYYY-MM, or YYYY
 *          src: "2019-07-12-cottage.webp",
 *          alt: "A short description of the photograph.",
 *          caption: "An optional line shown under the picture."
 *        }
 *      `src` is the 1600px filename under images/memories/. If it contains
 *      a slash, it is treated as a path from the site root instead.
 *      An optional `thumb` overrides the default <name>-480.webp.
 *      Optional `width` and `height` help the grid reserve space.
 *   3. The page sorts oldest to newest and groups by year. Do not invent
 *      dates or photographs.
 */
window.MEMORIES = [];

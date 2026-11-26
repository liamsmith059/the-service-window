/* The Crate catalogue.
 *
 * Source of truth for every record on /crate/.
 * The page is rendered from this list by js/crate.js.
 *
 * Most entries come from Liam's public Discogs collection
 * (user Liamsmith112). Artist-name disambiguators such as
 * "Peach Pit (3)" and "Boogie (26)" are stripped. `year` is the
 * original album year, not the year of a later pressing.
 * Faces (Mac Miller) and Live Vol. 1 (Parcels) are included from
 * his photographs even though they are not on the Discogs list.
 *
 * To add a record:
 *   1. Append an object to CRATE, in catalogue order (original
 *      year, then artist, then title).
 *   2. Save sleeve art as WebP in images/sleeves/:
 *        images/sleeves/<slug>.webp      (up to 480px wide, square;
 *                                        album sleeves are usually square)
 *        images/sleeves/<slug>-240.webp  (240px wide companion)
 *      Do not upscale. Quality about 85, LANCZOS.
 *      Use a photograph of the copy he owns when one exists;
 *      otherwise a Discogs cover image, cropped square.
 *   3. Set coverWidth / coverHeight to the pixel size of the 480w file.
 *      If omitted, the renderer assumes a 480×480 sleeve.
 *
 * Fields:
 *   slug          filename stem; also the stable id
 *   artist        performer or group
 *   title         album (or EP / mixtape) title
 *   year          optional original release year
 *   note          optional remark; omit if he did not write one
 *   cover         optional filename or path; defaults to <slug>.webp
 *   coverAlt, coverWidth, coverHeight
 */
window.CRATE = [
  {
    "slug": "kush-and-oj",
    "artist": "Wiz Khalifa",
    "title": "Kush & OJ",
    "year": 2010,
    "coverAlt": "Sleeve for Kush & OJ by Wiz Khalifa.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "house-of-balloons",
    "artist": "The Weeknd",
    "title": "House of Balloons",
    "year": 2011,
    "coverAlt": "Sleeve for House of Balloons by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "thursday",
    "artist": "The Weeknd",
    "title": "Thursday",
    "year": 2011,
    "coverAlt": "Sleeve for Thursday by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "rolling-papers",
    "artist": "Wiz Khalifa",
    "title": "Rolling Papers",
    "year": 2011,
    "coverAlt": "Sleeve for Rolling Papers by Wiz Khalifa.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "kiss-land",
    "artist": "The Weeknd",
    "title": "Kiss Land",
    "year": 2013,
    "coverAlt": "Sleeve for Kiss Land by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "faces",
    "artist": "Mac Miller",
    "title": "Faces",
    "year": 2014,
    "coverAlt": "Sleeve for Faces by Mac Miller.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "trapsoul",
    "artist": "Bryson Tiller",
    "title": "Trapsoul",
    "year": 2015,
    "coverAlt": "Sleeve for Trapsoul by Bryson Tiller.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "sweet-fa",
    "artist": "Peach Pit",
    "title": "Sweet F.A.",
    "year": 2016,
    "coverAlt": "Sleeve for Sweet F.A. by Peach Pit.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "starboy",
    "artist": "The Weeknd",
    "title": "Starboy",
    "year": 2016,
    "coverAlt": "Sleeve for Starboy by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "views",
    "artist": "Drake",
    "title": "Views",
    "year": 2016,
    "coverAlt": "Sleeve for Views by Drake.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "everythings-for-sale",
    "artist": "Boogie",
    "title": "Everything's For Sale",
    "year": 2019,
    "coverAlt": "Sleeve for Everything's For Sale by Boogie.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "savage-mode-ii",
    "artist": "21 Savage & Metro Boomin",
    "title": "Savage Mode II",
    "year": 2020,
    "coverAlt": "Sleeve for Savage Mode II by 21 Savage & Metro Boomin.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "what-could-possibly-go-wrong",
    "artist": "Dominic Fike",
    "title": "What Could Possibly Go Wrong",
    "year": 2020,
    "coverAlt": "Sleeve for What Could Possibly Go Wrong by Dominic Fike.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "live-vol-1",
    "artist": "Parcels",
    "title": "Live Vol. 1",
    "year": 2020,
    "coverAlt": "Sleeve for Live Vol. 1 by Parcels.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "you-and-your-friends",
    "artist": "Peach Pit",
    "title": "You and Your Friends",
    "year": 2020,
    "coverAlt": "Sleeve for You and Your Friends by Peach Pit.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "after-hours",
    "artist": "The Weeknd",
    "title": "After Hours",
    "year": 2020,
    "coverAlt": "Sleeve for After Hours by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "harrys-house",
    "artist": "Harry Styles",
    "title": "Harry's House",
    "year": 2022,
    "coverAlt": "Sleeve for Harry's House by Harry Styles.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "dawn-fm",
    "artist": "The Weeknd",
    "title": "Dawn FM",
    "year": 2022,
    "coverAlt": "Sleeve for Dawn FM by The Weeknd.",
    "coverWidth": 480,
    "coverHeight": 480
  },
  {
    "slug": "live-in-25",
    "artist": "Peach Pit",
    "title": "Live in '25",
    "year": 2026,
    "coverAlt": "Sleeve for Live in '25 by Peach Pit.",
    "coverWidth": 480,
    "coverHeight": 480
  }
];

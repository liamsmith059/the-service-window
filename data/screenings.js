/* The Screening Room catalogue.
 *
 * Source of truth for every film and television entry on /screening-room/.
 * The page is rendered from this list by js/screening-room.js.
 *
 * Catalogue order is Liam's list order (films first, then television),
 * with Red Dragon placed immediately after The Silence of the Lambs.
 * Films later imported from his public Letterboxd diary are added
 * after the original film list and before television.
 *
 * To add an entry later (including a Letterboxd or IMDb import):
 *   1. Add an object to SCREENINGS, in catalogue order.
 *   2. Save official posters as WebP in images/posters/:
 *        images/posters/<slug>.webp      (up to 480px wide, natural aspect)
 *        images/posters/<slug>-240.webp  (240px wide companion)
 *      Do not upscale. Quality about 85, LANCZOS.
 *   3. Set posterWidth / posterHeight to the pixel size of the 480w file.
 *
 * Fields:
 *   slug          filename stem; also the stable id
 *   type          "film" or "tv"
 *   title         display title
 *   year          theatrical year, or the year of this season
 *   director      film director, or season director(s) when known
 *   creator       television creator
 *   runtime       running time in minutes, for films
 *   season        season number, when the card is one season of a series
 *   episodes      episode count, for television
 *   genres        short genre tags
 *   rating        Liam's score out of 10; omit if he has not rated it
 *   ratingNote    a non-numeric rating label (used for Red Dragon)
 *   unfinished    true if he has not finished it (The House)
 *   quote         memorable quote, shown as a pull-quote
 *   review        his review, verbatim; omit if he did not write one
 *   posterAlt, posterWidth, posterHeight
 *
 * Ratings display as "8.4 / 10". Unrated titles show "Not yet rated".
 * Unfinished titles show "Not yet finished". Do not invent personal
 * details such as when or where something was seen.
 */
window.SCREENINGS = [
  {
    "slug": "hell-or-high-water",
    "type": "film",
    "title": "Hell or High Water",
    "year": 2016,
    "director": "David Mackenzie",
    "runtime": 102,
    "genres": [
      "Western",
      "Crime",
      "Drama"
    ],
    "rating": 8.2,
    "review": "Really well done.",
    "posterAlt": "Official theatrical poster for Hell or High Water (2016).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "house-of-a-thousand-corpses",
    "type": "film",
    "title": "House of 1000 Corpses",
    "year": 2003,
    "director": "Rob Zombie",
    "runtime": 89,
    "genres": [
      "Horror"
    ],
    "rating": 7.5,
    "review": "Went in with no clue what I was watching, left satisfied.",
    "posterAlt": "Official theatrical poster for House of 1000 Corpses (2003).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "hostel",
    "type": "film",
    "title": "Hostel",
    "year": 2005,
    "director": "Eli Roth",
    "runtime": 94,
    "genres": [
      "Horror"
    ],
    "rating": 7.7,
    "review": "What on earth did I just watch?",
    "posterAlt": "Official theatrical poster for Hostel (2005).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "silence-of-the-lambs",
    "type": "film",
    "title": "The Silence of the Lambs",
    "year": 1991,
    "director": "Jonathan Demme",
    "runtime": 118,
    "genres": [
      "Crime",
      "Thriller",
      "Drama"
    ],
    "rating": 8.4,
    "review": "Fantastic movie.",
    "posterAlt": "Official theatrical poster for The Silence of the Lambs (1991).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "red-dragon",
    "type": "film",
    "title": "Red Dragon",
    "year": 2002,
    "director": "Brett Ratner",
    "runtime": 124,
    "genres": [
      "Crime",
      "Thriller",
      "Horror"
    ],
    "ratingNote": "Five stars",
    "posterAlt": "Official theatrical poster for Red Dragon (2002).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-conjuring",
    "type": "film",
    "title": "The Conjuring",
    "year": 2013,
    "director": "James Wan",
    "runtime": 112,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "rating": 7.8,
    "review": "Genuinely creeped me out on one occasion.",
    "posterAlt": "Official theatrical poster for The Conjuring (2013).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "la-confidential",
    "type": "film",
    "title": "L.A. Confidential",
    "year": 1997,
    "director": "Curtis Hanson",
    "runtime": 138,
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "rating": 7.9,
    "review": "Enjoyable movie.",
    "posterAlt": "Official theatrical poster for L.A. Confidential (1997).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "mission-impossible-fallout",
    "type": "film",
    "title": "Mission: Impossible - Fallout",
    "year": 2018,
    "director": "Christopher McQuarrie",
    "runtime": 147,
    "genres": [
      "Action",
      "Adventure"
    ],
    "rating": 8.0,
    "review": "Exceeded my expectations in all honesty.",
    "posterAlt": "Official theatrical poster for Mission: Impossible - Fallout (2018).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "scarface",
    "type": "film",
    "title": "Scarface",
    "year": 1983,
    "director": "Brian De Palma",
    "runtime": 170,
    "genres": [
      "Crime",
      "Drama"
    ],
    "rating": 8.1,
    "quote": "\"Say hello to my little friend\"",
    "review": "Classic.",
    "posterAlt": "Official theatrical poster for Scarface (1983).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "halloween-h20",
    "type": "film",
    "title": "Halloween H20: 20 Years Later",
    "year": 1998,
    "director": "Steve Miner",
    "runtime": 86,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "rating": 5.5,
    "review": "Typically stupid. Extremely predictable and a little over the top. Some acting was not the greatest.",
    "posterAlt": "Official theatrical poster for Halloween H20: 20 Years Later (1998).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "im-thinking-of-ending-things",
    "type": "film",
    "title": "I'm Thinking of Ending Things",
    "year": 2020,
    "director": "Charlie Kaufman",
    "runtime": 135,
    "genres": [
      "Mystery",
      "Thriller",
      "Drama"
    ],
    "rating": 6.9,
    "review": "Enjoyed this movie. Slow burn.",
    "posterAlt": "Official theatrical poster for I'm Thinking of Ending Things (2020).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-nice-guys",
    "type": "film",
    "title": "The Nice Guys",
    "year": 2016,
    "director": "Shane Black",
    "runtime": 116,
    "genres": [
      "Comedy",
      "Crime",
      "Action"
    ],
    "rating": 7.3,
    "review": "Fun enjoyable crime flick.",
    "posterAlt": "Official theatrical poster for The Nice Guys (2016).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "knives-out",
    "type": "film",
    "title": "Knives Out",
    "year": 2019,
    "director": "Rian Johnson",
    "runtime": 131,
    "genres": [
      "Comedy",
      "Crime",
      "Mystery"
    ],
    "rating": 8.0,
    "quote": "\"My house, my rules, my coffee\"",
    "review": "Took a while to get going but really enjoyed this movie. Not what I first expected it to be.",
    "posterAlt": "Official theatrical poster for Knives Out (2019).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "frailty",
    "type": "film",
    "title": "Frailty",
    "year": 2001,
    "director": "Bill Paxton",
    "runtime": 100,
    "genres": [
      "Drama",
      "Thriller",
      "Crime"
    ],
    "rating": 7.8,
    "review": "Great movie and great performance by MM.",
    "posterAlt": "Official theatrical poster for Frailty (2001).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-house",
    "type": "film",
    "title": "The House",
    "year": 2022,
    "director": "Emma de Swaef, Marc James Roels, Niki Lindroth von Bahr, and Paloma Baeza",
    "runtime": 97,
    "genres": [
      "Animation",
      "Drama",
      "Horror"
    ],
    "unfinished": true,
    "posterAlt": "Official poster for The House (2022), the Netflix stop-motion anthology.",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "halloweentown-2",
    "type": "film",
    "title": "Halloweentown II: Kalabar's Revenge",
    "year": 2001,
    "director": "Mary Lambert",
    "runtime": 81,
    "genres": [
      "Family",
      "Fantasy",
      "Comedy"
    ],
    "rating": 5.0,
    "review": "Honestly not good. First is a classic but this really fell flat. When I rewatched I didn't remember it being that uneventful. Not a great movie.",
    "posterAlt": "Official poster for Halloweentown II: Kalabar's Revenge (2001).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "talk-to-me",
    "type": "film",
    "title": "Talk to Me",
    "year": 2023,
    "director": "Danny Philippou and Michael Philippou",
    "runtime": 95,
    "genres": [
      "Horror"
    ],
    "rating": 7.8,
    "quote": "\"Talk to me. I let you in\"",
    "review": "Need to rewatch this one. Was honestly very impressive and the head-bashing scene cut to hospital bed is absolutely terrifying. Last third of the movie I wasn't fully invested and need to reconsider - could be higher score.",
    "posterAlt": "Official theatrical poster for Talk to Me (2023).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "aftersun",
    "type": "film",
    "title": "Aftersun",
    "year": 2022,
    "director": "Charlotte Wells",
    "runtime": 101,
    "genres": [
      "Drama"
    ],
    "review": "Beautiful movie. Was very slow but it really set the stage for the point it was trying to make.",
    "posterAlt": "Official theatrical poster for Aftersun (2022).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "glass-onion",
    "type": "film",
    "title": "Glass Onion: A Knives Out Mystery",
    "year": 2022,
    "director": "Rian Johnson",
    "runtime": 140,
    "genres": [
      "Comedy",
      "Crime",
      "Mystery"
    ],
    "rating": 7.8,
    "review": "Good movie. I still give the first one the edge but this was not far off. I really enjoyed how they skipped right over the murder concept. I thought for sure it was going down that road and I wasn't necessarily looking forward to it. Great movie.",
    "posterAlt": "Official theatrical poster for Glass Onion: A Knives Out Mystery (2022).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "saltburn",
    "type": "film",
    "title": "Saltburn",
    "year": 2023,
    "director": "Emerald Fennell",
    "runtime": 131,
    "genres": [
      "Drama",
      "Comedy",
      "Thriller"
    ],
    "rating": 6.9,
    "review": "Very very strange movie. Cool concept, cool British cast away vibe, cool atmosphere, but overly strange. Seemed like they wanted to get some brownie points from the cult following for just some weird over the top scenes that really are what made the movie so hyped in the first place. Not bad, worth the watch sure, but not one I'm going to be watching again.",
    "posterAlt": "Official theatrical poster for Saltburn (2023).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "shrek",
    "type": "film",
    "title": "Shrek",
    "year": 2001,
    "director": "Andrew Adamson and Vicky Jenson",
    "runtime": 90,
    "genres": [
      "Animation",
      "Comedy",
      "Family"
    ],
    "rating": 7.5,
    "review": "Honestly a really enjoyable watch that caught me by surprise. So many adult jokes that would have gone straight over my head as a kid and I found it very entertaining. Not something I might watch again soon, but a worthwhile watch if you haven't seen it since being a kid.",
    "posterAlt": "Official theatrical poster for Shrek (2001).",
    "posterWidth": 480,
    "posterHeight": 715
  },
  {
    "slug": "insomnia",
    "type": "film",
    "title": "Insomnia",
    "year": 2002,
    "director": "Christopher Nolan",
    "runtime": 118,
    "genres": [
      "Thriller",
      "Crime",
      "Drama"
    ],
    "rating": 7.8,
    "review": "Good classic detective movie. Fun little twist throughout and Robin Williams played a great role I've yet to see him in.",
    "posterAlt": "Official theatrical poster for Insomnia (2002).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "close-encounters",
    "type": "film",
    "title": "Close Encounters of the Third Kind",
    "year": 1977,
    "director": "Steven Spielberg",
    "runtime": 137,
    "genres": [
      "Science Fiction",
      "Drama"
    ],
    "posterAlt": "Official theatrical poster for Close Encounters of the Third Kind (1977).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "terrifier",
    "type": "film",
    "title": "Terrifier",
    "year": 2016,
    "director": "Damien Leone",
    "runtime": 84,
    "genres": [
      "Horror"
    ],
    "rating": 7.5,
    "review": "All around crazy movie. Great concept and good scares for what it is. Enjoyed this one.",
    "posterAlt": "Official theatrical poster for Terrifier (2016).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "black-swan",
    "type": "film",
    "title": "Black Swan",
    "year": 2010,
    "director": "Darren Aronofsky",
    "runtime": 108,
    "genres": [
      "Drama",
      "Thriller",
      "Horror"
    ],
    "rating": 7.8,
    "review": "Solid movie. Very intriguing watch as you were very much thrown into the story line, however fell a little flat in my opinion. Kind of confusing, became a little over the top. Great watch nonetheless.",
    "posterAlt": "Official theatrical poster for Black Swan (2010).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "late-night-with-the-devil",
    "type": "film",
    "title": "Late Night with the Devil",
    "year": 2024,
    "director": "Cameron Cairnes and Colin Cairnes",
    "runtime": 93,
    "genres": [
      "Horror"
    ],
    "rating": 7.7,
    "quote": "\"Have you paid your dues, Jim?\"",
    "review": "Great movie. Kind of strange at points and the ending had me confused, but otherwise an intriguing watch that had me glued to the screen the entire time. Enjoyed the concept of a skeptic who is faced with the unexplainable.",
    "posterAlt": "Official theatrical poster for Late Night with the Devil (2024).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-vanishing",
    "type": "film",
    "title": "The Vanishing",
    "year": 1988,
    "director": "George Sluizer",
    "runtime": 106,
    "genres": [
      "Thriller",
      "Mystery"
    ],
    "rating": 8.5,
    "posterAlt": "Official theatrical poster for The Vanishing (1988), the Dutch film also known as Spoorloos.",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "fast-times",
    "type": "film",
    "title": "Fast Times at Ridgemont High",
    "year": 1982,
    "director": "Amy Heckerling",
    "runtime": 90,
    "genres": [
      "Comedy",
      "Drama"
    ],
    "review": "Really great feel good 80s movie. Brings back memories of high school, university, and life as a young adult navigating the world.",
    "posterAlt": "Official theatrical poster for Fast Times at Ridgemont High (1982).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "shutter-island",
    "type": "film",
    "title": "Shutter Island",
    "year": 2010,
    "director": "Martin Scorsese",
    "runtime": 138,
    "genres": [
      "Drama",
      "Thriller",
      "Mystery"
    ],
    "rating": 10.0,
    "posterAlt": "Official theatrical poster for Shutter Island (2010).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "bring-her-back",
    "type": "film",
    "title": "Bring Her Back",
    "year": 2025,
    "director": "Danny Philippou and Michael Philippou",
    "runtime": 104,
    "genres": [
      "Horror"
    ],
    "rating": 10.0,
    "review": "Extremely interesting and well done. Realistically 4.75/5.",
    "posterAlt": "Official theatrical poster for Bring Her Back (2025).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "mads",
    "type": "film",
    "title": "MadS",
    "year": 2024,
    "director": "David Moreau",
    "runtime": 89,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "rating": 9.0,
    "review": "One of the most intriguing starts to a movie I've ever seen. The suspense is killer.",
    "posterAlt": "Official theatrical poster for MadS (2024).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "frozen-2010",
    "type": "film",
    "title": "Frozen",
    "year": 2010,
    "director": "Adam Green",
    "runtime": 94,
    "genres": [
      "Thriller"
    ],
    "rating": 5.0,
    "review": "Interesting, I'll give it that. But overall extremely predictable and typical dumber than dumb protagonists.",
    "posterAlt": "Official theatrical poster for Frozen (2010), the Adam Green survival thriller.",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "obsession",
    "type": "film",
    "title": "Obsession",
    "year": 2026,
    "director": "Curry Barker",
    "runtime": 109,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "rating": 8.0,
    "review": "Pretty good movie, I thought they really brought it home in the second half. 3.75/5.",
    "posterAlt": "Official theatrical poster for Obsession (2026).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "weapons",
    "type": "film",
    "title": "Weapons",
    "year": 2025,
    "director": "Zach Cregger",
    "runtime": 128,
    "genres": [
      "Horror",
      "Mystery"
    ],
    "rating": 6.0,
    "review": "Pretty good movie in all honesty, but something about it just didn't do it for me. Not something I have any real interest in watching again.",
    "posterAlt": "Official theatrical poster for Weapons (2025).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "barbarian",
    "type": "film",
    "title": "Barbarian",
    "year": 2022,
    "director": "Zach Cregger",
    "runtime": 103,
    "genres": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "rating": 8.0,
    "review": "Extremely underrated. Very slow start but that middle half was fantastic.",
    "posterAlt": "Official theatrical poster for Barbarian (2022).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "longlegs",
    "type": "film",
    "title": "Longlegs",
    "year": 2024,
    "director": "Osgood Perkins",
    "runtime": 101,
    "genres": [
      "Crime",
      "Horror",
      "Mystery"
    ],
    "rating": 8.0,
    "review": "Really good movie. Slightly strange at times but genuinely creepy.",
    "posterAlt": "Official theatrical poster for Longlegs (2024).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-girl-who-got-away",
    "type": "film",
    "title": "The Girl Who Got Away",
    "year": 2021,
    "director": "Michael Morrissey",
    "runtime": 117,
    "genres": [
      "Horror",
      "Thriller",
      "Mystery"
    ],
    "rating": 7.0,
    "review": "Thoroughly entertaining. Quite surprised by the negative reviews.",
    "posterAlt": "Official theatrical poster for The Girl Who Got Away (2021).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "true-detective-s1",
    "type": "tv",
    "title": "True Detective (Season 1)",
    "year": 2014,
    "creator": "Nic Pizzolatto",
    "director": "Cary Fukunaga",
    "season": 1,
    "episodes": 8,
    "genres": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "rating": 9.5,
    "review": "Hands down the greatest television show I have ever seen and it's not even close. Amazing. Absolutely amazing.",
    "posterAlt": "Official poster for True Detective, season 1 (2014).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "true-detective-s3",
    "type": "tv",
    "title": "True Detective (Season 3)",
    "year": 2019,
    "creator": "Nic Pizzolatto",
    "director": "Jeremy Saulnier, Nic Pizzolatto, and Daniel Sackheim",
    "season": 3,
    "episodes": 8,
    "genres": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "rating": 9.3,
    "quote": "\"There is no goodnight without I love you\"",
    "review": "Arguably better than the first season in the long run but lost for simple nostalgia points. Wow. Just wow. Fantastic show. Absolutely incredible.",
    "posterAlt": "Official poster for True Detective, season 3 (2019).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-watcher",
    "type": "tv",
    "title": "The Watcher",
    "year": 2022,
    "creator": "Ryan Murphy and Ian Brennan",
    "episodes": 7,
    "genres": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "rating": 7.8,
    "review": "Intriguing show. Kind of strange, kind of great, overall unsure. Looking forward to another season to smooth some confusion.",
    "posterAlt": "Official poster for The Watcher (2022).",
    "posterWidth": 480,
    "posterHeight": 712
  },
  {
    "slug": "mindhunter-s1",
    "type": "tv",
    "title": "Mindhunter (Season 1)",
    "year": 2017,
    "creator": "Joe Penhall",
    "director": "David Fincher",
    "season": 1,
    "episodes": 10,
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "rating": 8.4,
    "review": "Fantastic opener to a new show. Great concept and it's a shame they are so slow to add more episodes.",
    "posterAlt": "Official poster for Mindhunter, season 1 (2017).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "mindhunter-s2",
    "type": "tv",
    "title": "Mindhunter (Season 2)",
    "year": 2019,
    "creator": "Joe Penhall",
    "director": "David Fincher",
    "season": 2,
    "episodes": 9,
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "rating": 8.0,
    "review": "Great second season. It was a little bit slow in the beginning but it ramped up rather quickly and ended in a good manner.",
    "posterAlt": "Official poster for Mindhunter, season 2 (2019).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "the-stranger",
    "type": "tv",
    "title": "The Stranger",
    "year": 2020,
    "creator": "Harlan Coben",
    "director": "Daniel O'Hara and Hannah Quinn",
    "episodes": 8,
    "genres": [
      "Crime",
      "Thriller"
    ],
    "rating": 8.6,
    "review": "Truly enjoyed this show. Exceeded all of my expectations.",
    "posterAlt": "Official poster for The Stranger (2020).",
    "posterWidth": 480,
    "posterHeight": 720
  },
  {
    "slug": "behind-her-eyes",
    "type": "tv",
    "title": "Behind Her Eyes",
    "year": 2021,
    "creator": "Steve Lightfoot",
    "director": "Erik Richter Strand",
    "episodes": 6,
    "genres": [
      "Mystery",
      "Drama",
      "Fantasy"
    ],
    "rating": 8.7,
    "review": "Really enjoyed this one.",
    "posterAlt": "Official poster for Behind Her Eyes (2021).",
    "posterWidth": 480,
    "posterHeight": 720
  }
];

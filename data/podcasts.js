/* Podcast catalogue.
 *
 * To add a show:
 *   1. Append an object to window.PODCASTS with slug, name, and episodes
 *      (each episode is { title, note? }). An optional blurb is a one-line
 *      description shown on the hub tile. Optional art is a filename stem
 *      under images/podcasts/ -- replace these two files when new art arrives:
 *        images/podcasts/<stem>.webp
 *        images/podcasts/<stem>-200.webp
 *      and update artWidth, artHeight, artAlt, and artSource (and
 *      images/podcasts/SOURCES.txt). If art is omitted, the hub tile uses
 *      monogram, or initials derived from the name.
 *   2. Copy podcasts/joe-rogan-experience/index.html to
 *      podcasts/<slug>/index.html and update the title, canonical/og URL,
 *      data-show attribute, heading, and intro line.
 *   3. Add the show URL to sitemap.xml.
 * The hub lists every show in this array automatically, in this order.
 *
 * Show art was supplied by Liam (25 November 2026). See
 * images/podcasts/SOURCES.txt for the files to replace.
 */
window.PODCASTS = [
  {
    "slug": "joe-rogan-experience",
    "name": "The Joe Rogan Experience",
    "monogram": "JRE",
    "art": "joe-rogan-experience",
    "artWidth": 400,
    "artHeight": 400,
    "artAlt": "The Joe Rogan Experience logo.",
    "artSource": "Supplied by Liam, 25 November 2026.",
    "episodes": [
      {
        "title": "#1459 - Tom O’Neill",
        "note": "The true story behind Charles Manson and his connection to the CIA."
      },
      {
        "title": "#1315 - Bob Lazar & Jeremy Corbell",
        "note": "A supposed former area-51 worker shares his story on alien crafts the government is trying to reverse engineer."
      },
      {
        "title": "#1828 - Michio Kaku",
        "note": "The future of human kind in connection to space travel, alien plausibility, and our development into a Type-1 civilization."
      },
      {
        "title": "#1976 - James Fox",
        "note": "UFO investigator who discusses one of the most documented and covered-up alien sightings in history, taking place in Brazil."
      },
      {
        "title": "#1965 - David Choe",
        "note": "Maybe the most interesting man on the planet. And yes, that can be interpreted as either good or bad…"
      },
      {
        "title": "#1945 - Eric Weinstein",
        "note": "Alien technology, the future of our civilization, secret societies, and Eric Weinstein feeling left out."
      },
      {
        "title": "#1922 - Sam & Colby",
        "note": "YouTubers who explore abandoned buildings which have a history of being haunted. They discuss their personal experiences with ghosts, life, overcoming confidence issues as teens, and much more. I never heard or watched their Channel beforehand, and honestly I wouldn’t necessarily recommend it. This more chilled out, honest and humble version of Sam & Colby was much more entertaining."
      },
      {
        "title": "#1905 - More Plates More Dates",
        "note": "Steroids, liver king, health, wellness, bodybuilding, supplementation… This one is for the bro’s."
      },
      {
        "title": "#1860 - Tim Dillon",
        "note": "The future of America is most likely doomed… Take it from Comedian and seemingly political activist Tim Dillon."
      },
      {
        "title": "#1616 - Jamie Metzl",
        "note": "In the midst of the outbreak of COVID-19, Jamie Metzl, a member of the World Health Organization (WHO), addresses issues of lab-leak theory, the origin of corona-viruses, gene mutation, and the future of gene selection."
      },
      {
        "title": "#1979 - Dr. Aseem Malhorta",
        "note": "The dangers of statins, misinformation in medicine and COVID-19 hypocrisy. Solid conversation worth the listen."
      },
      {
        "title": "#1980 - Michio Kaku",
        "note": "An in depth conversation on the future of quantum computing and human life. I would highly recommend listening to Eric Weinstein’s episode #1945 after this one to truly have your mind warped. How can the smartest man you ever heard speak be labeled as a kook? The world of physics is a blunder to say the least."
      },
      {
        "title": "#1516 - Post Malone",
        "note": "Aliens, shrooms, music, life, and an entire carton of cigarettes. Need I say more?"
      },
      {
        "title": "#1863 - Mark Zuckerberg",
        "note": "The future of social networking in the midst of the age of misinformation. Although he is a pretty controversial and polarizing figure that is not liked by many in the space, this conversation gave me a lot more respect for the “person” that Mark is. Does he put up an incredible poker face? Maybe. Is he simply wrapped up in something bigger than he could ever foresee it becoming and dealing with the consequences of such a platform? Maybe that as well. Decide for yourself."
      },
      {
        "title": "#1815 - The Black Keys",
        "note": "Simply a great and fun conversation… Just give this one a listen."
      },
      {
        "title": "#1744 - More Plates More Dates",
        "note": "Drug testing in sports, cheating, dosing, steroids and bodybuilding."
      },
      {
        "title": "#1733 - Ben Shapiro",
        "note": "Political conversation that weaves the boundaries of personal responsibility, the limitations of current liberal ideology, abortion, and much more."
      },
      {
        "title": "#1678 - Michael Pollan",
        "note": "Psychedelics, plant medicine, changing your mind on new-aged therapies and plant chemistry."
      },
      {
        "title": "#1136 - Hamilton Morris",
        "note": "Psychedelic research, drug use, drug reform, an overall interesting individual and great conversation"
      },
      {
        "title": "#1593 - Dr. Carl Hart",
        "note": "The normalization of drug use, human psychology, substance use for grown ups, criminal persecution of drug users and the future of drug policy."
      },
      {
        "title": "#1515 - Alex Jones & Tim Dillon",
        "note": "Conspiracy theories, conspiracy theories, and many many more conspiracy theories."
      },
      {
        "title": "#1518 - David Choe",
        "note": "Living in the Congo amongst African Tribes, traveling across America, earning over $300 million dollars in Facebook stock and the overall experience of being the worlds most interesting man."
      },
      {
        "title": "#1405 - Sober October 3 Recap",
        "note": "Any Sober October episode is always enjoyable - Motivation, limiting drug use, the benefits of abstaining from substances and returning to them, limiting dependence, great conversation, loads of fun."
      },
      {
        "title": "#1482 - Jordan Jonas",
        "note": "Winning $500,000 alone in the forest with only 10 items, killing a wolverine with an axe, taking juvenile youth to Siberia - Jordan Jonas has a story worth listening to."
      },
      {
        "title": "#1109 - Mathew Walker",
        "note": "The expert in all things sleep. Why we sleep, the effects of marijuana and alcohol on sleep, the importance of sleep QUALITY - An essential listen for anyone who does not prioritize their moments of rest."
      },
      {
        "title": "#1419 - Daryl Davis",
        "note": "A black man who sought out interviews with members and leaders of the Ku Klux Klan. An extremely interesting listen that speaks for itself."
      },
      {
        "title": "#317 - David Choe & Yoshi",
        "note": "Beating a stepmother and putting her in the hospital for 2 months, your mother killing your father and blaming suicide, porn, anal, shemales, this podcast has it all and really is one of the most ridiculous conversations ive ever heard. The last 30 minutes will leave you in a state of unease."
      },
      {
        "title": "#1921 - Peter Zeihan",
        "note": "Russia, Ukraine, the end of the world as we know it. This is one of those podcasts that simply flips the narrative of the world upside down on its head."
      },
      {
        "title": "#1999 - Robert Kennedy Jr.",
        "note": "Vaccine misinformation, the assassination of his father, and much larger government conspiracies."
      },
      {
        "title": "#1981 - Pauly Shore",
        "note": "An overall great conversation that I never expected. Covered topics of Pauly’s mom in the relation of many comedians success, origin stories of the comedy club, Joe’s new club, and much much more. This is an episode I put off for a long time because of Pauly’s crazy nature, but I would undoubtedly listen to this again."
      },
      {
        "title": "#2010 - Marc Andreessen",
        "note": "Smart people conversing about AI, the future of our civilization, the vision which is Elon Musk and much more. Fantastic guest and well worth the listen."
      },
      {
        "title": "#05/08/2023 - Fight Companion",
        "note": "Eddie Bravo, Brendan Schaub, and Joe Rogan react to the Nate Diaz vs Jake Paul fight in addition to the Cory Sandhagen vs Rob Font fight. Just another great convo of the boys hanging out and having some drinks."
      },
      {
        "title": "#2018 - Post Malone",
        "note": "Haven’t even listened yet and I already know that based on the 4 hour and 41 minute duration its going to be a 10/10 conversation. Such a down to earth and chill guy, we need more people like Post Malone. (Maybe I spoke too soon… Check out the first one instead)."
      },
      {
        "title": "#142 - JRE MMA Show - Matt Serra, Din Thomas & John Rallo",
        "note": "Who knew that Matt Serra was one of the funniest men on the planet. Drunk stories, injuries, fighting, life. Just an overall easy listen that you will not be disappointed with."
      },
      {
        "title": "#141 - JRE MMA Show - Mike Perry",
        "note": "Former UFC fighter turned pro Bare Knuckle Boxer. Mike Perry has a soft side you need to see and an incredibly generous, intelligent, down to earth young man. Tough upbringings can build character and there’s no better example than the African American himself, Mike Perry."
      },
      {
        "title": "#712 - Wim Hof",
        "note": "The power of breathing and how you can control your nervous system with the mind. Truly interesting character with some spectacular advice."
      },
      {
        "title": "#2034 - Jeremy Jones",
        "note": "Professional pool player shares his stories of growing up in an industry destined for no future, only to make it out as one of the best and most successful in the business."
      },
      {
        "title": "#2036 - Kurt Angle",
        "note": "Pro wrestler and olympic gold medalist describes performing several times with a broken neck and having doctors load up his neck with novocain before winning the championship. Tony Hinchcliffe joins in on this episode and is the perfect example of knowing when to speak and when to shut up."
      },
      {
        "title": "#2037 - Alex Berenson",
        "note": "Ok… Maybe not one of my favourite JRE episodes of all time, but a truly entertaining conversation that is well worth the listen. Medical misinformation, the shrinking of health standards in society alongside the push to pharmaceuticals, Vince McMaan being a jacked 78 year old, and much more. Alex is one of those guys you don’t love, but have a hard time not liking."
      },
      {
        "title": "#143 - JRE MMA Show - Sean Strickland",
        "note": "White supremacy, guns at 14, talking his own brother into suicide, Sean Strickland is as white trash and as honest of a man as they come. This podcast took place right before becoming the current UFC Middleweight champion and it couldn’t be funnier. Sean is an absolute real one whose viewpoints while aggressive, are often times hard to disagree with. Listen to this podcast if you want a good laugh or some motivation that no matter what trajectory you are on, there are other realities worth pursuing."
      },
      {
        "title": "#147 - JRE MMA Show - Sean O’Malley & Tim Welch",
        "note": "Sean’s first appearance on JRE after defeating Aljo for the Bantamweight UFC Championship of the world. Pretty interesting conversation to say the least. Won’t go down as the greatest JRE episode of all time, but it’s worth the listen."
      },
      {
        "title": "#2044 - Sam Altman",
        "note": "The founder of OpenA.I. Discusses the future of ChatGPT, artificial intelligence, and how far out we are from a truly “different” society that we are in today. Very interesting conversation and a very interesting guy."
      },
      {
        "title": "#11/22/23 - Fight Companion",
        "note": "In all honesty this was one of my least favourite fight companions. It wasn’t bad, but it wasn’t all that great either. The reason it got on this list is because this was the very first time I was able to watch a fight companion live alongside a UFC event; truly an iconic moment. Not sure how it’s taken so long, but it has finally been done and overall it was a decent episode with decent commentary. The cover art speaks for itself and will be remembered forever."
      },
      {
        "title": "#2052 - Danny & Michael Philippou",
        "note": "The first podcast in a long time where Joe seems visibly annoyed at his guest throughout the course of the interview. The two are the directors of “talk to me” a highly acclaimed new aged horror film that quickly gained popularity. These two are absolute characters to say the least and based on their antics im not entirely surprised Joe was acting this way. Was it the 3 blackouts that happened throughout the conversation, or was it extreme ADHD personalty that got Joe in a strange mood? Listen and judge for yourself."
      },
      {
        "title": "#2054 - Elon Musk",
        "note": "The return of the great Elon Musk. May I say more? Double pineapple and double anchovy pizza was all I needed to hear in order to add this one to the list. Not to mention Elon asking to order a pizza live on the podcast and Joe Rogan shooting a bow at the cyber truck. I’m 40 minutes in and this has potential for podcast of the year."
      },
      {
        "title": "#528 - Michael Stevens (Vsauce)",
        "note": "A very entertaining listen. This conversation goes anywhere and everywhere and I loved every second of it. Joe is a fantastic host in this episode and reminds me of why I loved the early episodes of JRE so much. Great podcast!"
      },
      {
        "title": "#545 - Tony Hinchcliffe",
        "note": "Truly hilarious podcast. Google glass being able to analyze faces, fake cell towers creeping our privacy, and tons more random topics that are the very reason we all love the Joe Rogan podcast. Really funny episode that had a smile glued to my face while I walked the golf course late at night. “Is that google glass or are you just happy to see me?”. Also, Joe’s hate for pro wrestling really shines through on this one. We know it’s fake Joe, I think you are missing the point."
      },
      {
        "title": "#446 - Andreas Antonopolous",
        "note": "A great conversation about bitcoin that had me very intrigued. Basically an everything you need to know about crypto, and why you should have invested back then, which would have made you basically a billionaire in todays world."
      },
      {
        "title": "#2081 - Diana Walsh Pasulka",
        "note": "Picked this one on a whim as the guests background of being a professor of religious studies sounded interesting enough. It took me until about half way through until I realized how much I enjoyed this woman speaking and found her story to be intriguing to say the least."
      },
      {
        "title": "#2105 - Dr. Phil",
        "note": "Migrants willingly being sent over the border for sex work and allowed through, the pitfalls of our generation from gender politics to liberal ideology, and much much more that makes this a great conversation."
      },
      {
        "title": "#2106 - Kid Rock",
        "note": "From punching a “kid” at Bohemian Grove, confronting Joe on lying that he has a Golden Shower to correct him that its a golden bathroom, to pro-Trump politics, this conversation was a fun one. It’s worth listening to just to see how awkward it got in the final moments when Joe Asked the kid what he thought about Jesus. From such a seemingly intelligent guy, his answer sure made you question just about every single thing he said leading up to that point."
      },
      {
        "title": "#2111 - Katt Williams",
        "note": "Black people liking menthol being a racist question, answered through the lens of African Americans liking a strong product, this podcast was an interesting one. Katt Williams is one very intelligent man who is simultaneously one of the most controversial people in the room. Constantly calling out joes questions for being provocative or incorrect, while answering in the most conspiratorial and ambiguous way possible. Great listen, love Katt."
      },
      {
        "title": "#2119 - James Lindsay",
        "note": "Borders being dissolved, US wanting China to become a threat, ultimate wealth, and Klaus Schwab being a complete weirdo, this is a must listen."
      },
      {
        "title": "#2120 - That Mexican OT",
        "note": "Stumbled across this one randomly and turns out to be one of the greats. Sure there was a lot of filler at times, what do you expect from Joe talking to a rapper literally a quarter of his age, but that guy was cool and had real humility for the position he was in. Always have to respect the people who are grateful for JRE having them on and showing true love. Good talk."
      },
      {
        "title": "#2136 - Graham Hancock & Flint Dibble",
        "note": "The great debate between theories of an advanced civilization to the current contemporary understanding of archeology."
      },
      {
        "title": "#2108 - Tom Green",
        "note": "The godfather of podcasting himself. Tom Green is one intelligent dude who is disguised in the body of a hippy stoner. It’s interesting hearing these people who are written off easily, speak about their nuanced perspectives on a number of issues. Also defended all the Canadians out there who aren’t in support of the current Liberal administration."
      },
      {
        "title": "#2138 - Tucker Carlson",
        "note": "An understood man in the modern age of controversy. Tucker is an interesting character to say the least and I truly didnt expect this conversation to go down the way it did, but what do you expect, this is the Joe Rogan Experience. From aliens, government sci-ops, all the way to Alex Jones being a trustworthy figure, this is well worth the listen."
      },
      {
        "title": "#155 - JRE MMA Show - Max Holloway",
        "note": "The BMF himself appears on Joe Rogan after having the greatest knockout in UFC history vs the baddest man in UFC history."
      },
      {
        "title": "#241 - James Bobo Fay",
        "note": "A podcast for all things bigfoot. When you hear someone tell Joe Rogan he is “dead wrong” for him not believing a video showing Bigfoot, I knew it had to be added to the list."
      },
      {
        "title": "Snoop Dogg"
      },
      {
        "title": "#2141 - Bart Sibrel",
        "note": "A decently convincing argument for why NASA, but more broadly the US government, faked the moon landing."
      },
      {
        "title": "#2149 - Sebastian Maniscalco"
      },
      {
        "title": "#2151 - Rizwan Virk",
        "note": "Some really interesting takes on the simulation hypothesis. I found the idea of reality constantly changing quite interesting and if you’ve ever had “Deja vu” you might have went down that rabbit hole before."
      },
      {
        "title": "#2152 - Terrence Howard",
        "note": "Description of this episode is unavailable as I didn’t seem to understand a single thing that was said. On that, it was an amazing podcast."
      },
      {
        "title": "#2171 - Terrence Howard & Eric Weinstein",
        "note": "The debate of all debates. Is Terrence Howard mentally insane or is there any truth to a single thing he has said in relation to mathematics and modern day physics."
      },
      {
        "title": "Dorian Yates"
      },
      {
        "title": "Jon Jones"
      },
      {
        "title": "#2190 - Peter Thiel",
        "note": "A conversation on all things monetary from a government level financial prospective. Not sure if that even makes sense, but this podcast certainly does. Great guest."
      },
      {
        "title": "#2420 - Chris Masterjohn",
        "note": "Basically everything nutrition related. Interesting take on diet focused supplementing. Rather than taking ultra specific vitamins you don’t know you need, but may think you need, take broader food groups that contain those nutrients to also get other related things your body may be missing. A lot on seed oils as well."
      },
      {
        "title": "#2411 - Gavin de Becker",
        "note": "The podcast that will turn you into an anti-vaxer. As much as I question all the things that were said, the segment on HIV/AIDS was very very interesting to say the LEAST. And for me, that alone is worth the listen."
      }
    ]
  },
  {
    "slug": "huberman-lab",
    "name": "Huberman Lab",
    "monogram": "HL",
    "blurb": "A science podcast hosted by Andrew Huberman.",
    "art": "huberman-lab",
    "artWidth": 400,
    "artHeight": 400,
    "artAlt": "Huberman Lab cover art.",
    "artSource": "Supplied by Liam, 25 November 2026.",
    "episodes": []
  },
  {
    "slug": "dwarkesh-podcast",
    "name": "Dwarkesh Podcast",
    "monogram": "DP",
    "blurb": "Interviews hosted by Dwarkesh Patel.",
    "art": "dwarkesh-podcast",
    "artWidth": 400,
    "artHeight": 400,
    "artAlt": "Dwarkesh Podcast cover art.",
    "artSource": "Supplied by Liam, 25 November 2026.",
    "episodes": []
  },
  {
    "slug": "cheeky-pint",
    "name": "Cheeky Pint",
    "monogram": "CP",
    "blurb": "A conversation podcast hosted by John Collison.",
    "art": "cheeky-pint",
    "artWidth": 400,
    "artHeight": 400,
    "artAlt": "Cheeky Pint cover art.",
    "artSource": "Supplied by Liam, 25 November 2026.",
    "episodes": []
  }

];

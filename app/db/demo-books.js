// Extra demo catalogue (UI polish, outside the Release 1.0 backlog and NFR-02). Loaded only by db/seed-demo.js,
// never by db/seed.js, so the 30-book seed that the tests and UAT rely on stays exactly as it is.
//
// Sources
// - Bibliographic facts (work id, cover id) come from the Open Library API (https://openlibrary.org/developers/api).
//   Open Library catalogue data is published under CC0. Looked up on 10/11/2026.
// - Cover images are NOT stored in this repo: cover_url points to the Open Library Covers API by cover id
//   (https://openlibrary.org/dev/docs/api/covers), which Open Library offers for display on other sites.
//   The footer credits Open Library. Cover art remains the property of its publishers.
// - Descriptions and author notes are short summaries written by the team (not copied from publishers' blurbs).
// - Prices (VND) and stock are invented demo values.
const coverUrl = (coverId) => `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

const AUTHORS = {
  lee: { name: 'Harper Lee', bio: 'American novelist (1926–2016), author of To Kill a Mockingbird.' },
  orwell: { name: 'George Orwell', bio: 'English novelist and essayist (1903–1950).' },
  fitzgerald: { name: 'F. Scott Fitzgerald', bio: 'American novelist of the Jazz Age (1896–1940).' },
  salinger: { name: 'J. D. Salinger', bio: 'American writer (1919–2010).' },
  marquez: { name: 'Gabriel García Márquez', bio: 'Colombian novelist (1927–2014), Nobel Prize in Literature 1982.' },
  coelho: { name: 'Paulo Coelho', bio: 'Brazilian novelist (born 1947).' },
  murakami: { name: 'Haruki Murakami', bio: 'Japanese novelist and translator (born 1949).' },
  alcott: { name: 'Louisa May Alcott', bio: 'American novelist (1832–1888).' },
  ebronte: { name: 'Emily Brontë', bio: 'English novelist and poet (1818–1848).' },
  hosseini: { name: 'Khaled Hosseini', bio: 'Afghan-American novelist and physician (born 1965).' },
  vtnguyen: { name: 'Viet Thanh Nguyen', bio: 'Vietnamese-American novelist (born 1971), Pulitzer Prize for Fiction 2016.' },
  baoninh: { name: 'Bảo Ninh', bio: 'Vietnamese novelist (born 1952), a veteran of the war he writes about.' },
  duongthuhuong: { name: 'Dương Thu Hương', bio: 'Vietnamese novelist (born 1947).' },
  quemai: { name: 'Nguyễn Phan Quế Mai', bio: 'Vietnamese poet and novelist (born 1973) who writes in Vietnamese and English.' },
  tolkien: { name: 'J. R. R. Tolkien', bio: 'English writer and philologist (1892–1973).' },
  rowling: { name: 'J. K. Rowling', bio: 'British author (born 1965).' },
  martin: { name: 'George R. R. Martin', bio: 'American novelist and screenwriter (born 1948).' },
  rothfuss: { name: 'Patrick Rothfuss', bio: 'American fantasy writer (born 1973).' },
  herbert: { name: 'Frank Herbert', bio: 'American science-fiction author (1920–1986).' },
  adams: { name: 'Douglas Adams', bio: 'English author and humorist (1952–2001).' },
  card: { name: 'Orson Scott Card', bio: 'American science-fiction writer (born 1951).' },
  brown: { name: 'Dan Brown', bio: 'American author of thrillers (born 1964).' },
  flynn: { name: 'Gillian Flynn', bio: 'American author and screenwriter (born 1971).' },
  larsson: { name: 'Stieg Larsson', bio: 'Swedish journalist and writer (1954–2004).' },
  christie: { name: 'Agatha Christie', bio: 'English writer of detective novels (1890–1976).' },
  doyle: { name: 'Arthur Conan Doyle', bio: 'Scottish writer and physician (1859–1930), creator of Sherlock Holmes.' },
  white: { name: 'E. B. White', bio: 'American writer (1899–1985).' },
  exupery: { name: 'Antoine de Saint-Exupéry', bio: 'French writer and aviator (1900–1944).' },
  dahl: { name: 'Roald Dahl', bio: 'British author of children’s books (1916–1990).' },
  milne: { name: 'A. A. Milne', bio: 'English author (1882–1956).' },
  sendak: { name: 'Maurice Sendak', bio: 'American illustrator and writer (1928–2012).' },
  hawking: { name: 'Stephen Hawking', bio: 'English theoretical physicist (1942–2018).' },
  sagan: { name: 'Carl Sagan', bio: 'American astronomer and science writer (1934–1996).' },
  dawkins: { name: 'Richard Dawkins', bio: 'British evolutionary biologist (born 1941).' },
  mukherjee: { name: 'Siddhartha Mukherjee', bio: 'Indian-American physician and writer (born 1970).' },
  tyson: { name: 'Neil deGrasse Tyson', bio: 'American astrophysicist and science communicator (born 1958).' },
  harari: { name: 'Yuval Noah Harari', bio: 'Israeli historian (born 1976).' },
  diamond: { name: 'Jared Diamond', bio: 'American geographer and historian (born 1937).' },
  frank: { name: 'Anne Frank', bio: 'Jewish diarist (1929–1945).' },
  beard: { name: 'Mary Beard', bio: 'English classicist (born 1955).' },
  clear: { name: 'James Clear', bio: 'American writer on habits and decision making (born 1986).' },
  covey: { name: 'Stephen R. Covey', bio: 'American educator and author (1932–2012).' },
  carnegie: { name: 'Dale Carnegie', bio: 'American writer and lecturer (1888–1955).' },
  kahneman: { name: 'Daniel Kahneman', bio: 'Israeli-American psychologist (1934–2024), Nobel Prize in Economics 2002.' },
  frankl: { name: 'Viktor E. Frankl', bio: 'Austrian psychiatrist and Holocaust survivor (1905–1997).' },
  newport: { name: 'Cal Newport', bio: 'American computer scientist and author (born 1982).' },
  thiel: { name: 'Peter Thiel', bio: 'American entrepreneur and investor (born 1967).' },
  ries: { name: 'Eric Ries', bio: 'American entrepreneur and author (born 1978).' },
  collins: { name: 'Jim Collins', bio: 'American business researcher and author (born 1958).' },
  kiyosaki: { name: 'Robert T. Kiyosaki', bio: 'American businessman and author (born 1947).' },
  housel: { name: 'Morgan Housel', bio: 'American writer on finance and behaviour (born 1984).' },
};

// [seed key, title, author key, category, price VND, stock, first published, Open Library work, cover id, description]
const BOOKS = [
  ['demo-01', 'To Kill a Mockingbird', 'lee', 'Novel', 168000, 22, 1960, 'OL3140822W', 14351077, 'In a small Alabama town, young Scout Finch watches her father, the lawyer Atticus, defend a Black man accused of a crime he did not commit. A story about growing up, prejudice and quiet courage.'],
  ['demo-02', 'Nineteen Eighty-Four', 'orwell', 'Novel', 145000, 30, 1949, 'OL1168083W', 9267242, 'Winston Smith works for the Party, rewriting history, while Big Brother watches every move. When he starts to keep a diary and falls in love, he takes the most dangerous step of all: thinking for himself.'],
  ['demo-03', 'The Great Gatsby', 'fitzgerald', 'Novel', 112000, 18, 1925, 'OL468431W', 10590366, 'Nick Carraway moves next door to the mysterious millionaire Jay Gatsby, whose lavish parties hide one wish: to win back Daisy Buchanan. A short, sharp portrait of wealth and longing in 1920s New York.'],
  ['demo-04', 'The Catcher in the Rye', 'salinger', 'Novel', 128000, 15, 1951, 'OL3335245W', 9273490, 'After leaving his boarding school, sixteen-year-old Holden Caulfield spends three restless days in New York. His voice – funny, angry and lonely – made this one of the best-known coming-of-age novels.'],
  ['demo-05', 'One Hundred Years of Solitude', 'marquez', 'Novel', 215000, 10, 1967, 'OL274505W', 12627383, 'Seven generations of the Buendía family live, love and repeat their mistakes in the town of Macondo. The landmark novel of magical realism.'],
  ['demo-06', 'The Alchemist', 'coelho', 'Novel', 99000, 40, 1988, 'OL796465W', 7414780, 'Santiago, a young shepherd from Andalusia, dreams of treasure near the pyramids and sets out to find it. A short fable about listening to your heart and following your own path.'],
  ['demo-07', 'Norwegian Wood', 'murakami', 'Novel', 156000, 14, 1987, 'OL2625457W', 2237620, 'A Beatles song takes Toru Watanabe back to his student years in late-1960s Tokyo, and to two very different young women. A quiet, moving novel about love, loss and memory.'],
  ['demo-08', 'Little Women', 'alcott', 'Novel', 135000, 20, 1868, 'OL29983W', 8775559, 'Meg, Jo, Beth and Amy March grow up in New England while their father is away at war. Warm and funny, it follows four sisters as they find their own ways in life.'],
  ['demo-09', 'Wuthering Heights', 'ebronte', 'Novel', 119000, 12, 1847, 'OL21177W', 12818862, 'On the wild Yorkshire moors, the passion between Catherine Earnshaw and the foundling Heathcliff turns into a revenge that marks two families for a generation.'],
  ['demo-10', 'The Kite Runner', 'hosseini', 'Novel', 162000, 16, 2003, 'OL5781992W', 14846827, 'Amir, the son of a wealthy man in Kabul, betrays his loyal friend Hassan. Years later, living in America, he gets one chance to make things right.'],
  ['demo-11', 'The Sympathizer', 'vtnguyen', 'Vietnamese Literature', 198000, 11, 2015, 'OL17345497W', 7913176, 'A communist double agent leaves Sài Gòn in 1975 with a South Vietnamese general and keeps spying on the exile community in Los Angeles. A darkly funny novel about divided loyalties.'],
  ['demo-12', 'The Sorrow of War', 'baoninh', 'Vietnamese Literature', 138000, 13, 1990, 'OL2946524W', 824217, 'Kiên, a soldier who collects the remains of fallen comrades after the war, tries to write his way through memories of battle and of his first love. One of the most important Vietnamese novels about the war (Nỗi buồn chiến tranh).'],
  ['demo-13', 'Paradise of the Blind', 'duongthuhuong', 'Vietnamese Literature', 129000, 9, 1988, 'OL2448895W', 8260736, 'Hằng, a young woman working abroad, looks back on her childhood in Hà Nội and on three women in her family torn apart by land reform and politics (Những thiên đường mù).'],
  ['demo-14', 'The Mountains Sing', 'quemai', 'Vietnamese Literature', 185000, 17, 2020, 'OL20658092W', 9319261, 'Through a grandmother and her granddaughter, the novel follows the Trần family across the twentieth century of Vietnam – famine, land reform, war and the long road to healing.'],
  ['demo-15', 'The Hobbit', 'tolkien', 'Fantasy & Sci-Fi', 149000, 26, 1937, 'OL27482W', 14627509, 'Bilbo Baggins likes his quiet home, until a wizard and thirteen dwarves invite him on a quest to take back a treasure guarded by the dragon Smaug.'],
  ['demo-16', 'The Fellowship of the Ring', 'tolkien', 'Fantasy & Sci-Fi', 189000, 15, 1954, 'OL27513W', 14627060, 'Frodo inherits a ring of terrible power and must carry it out of the Shire, joined by eight companions. The first part of The Lord of the Rings.'],
  ['demo-17', 'Harry Potter and the Philosopher’s Stone', 'rowling', 'Fantasy & Sci-Fi', 175000, 35, 1997, 'OL82563W', 15155833, 'On his eleventh birthday Harry learns that he is a wizard and leaves his unkind relatives for Hogwarts School of Witchcraft and Wizardry – and a mystery hidden inside it.'],
  ['demo-18', 'A Game of Thrones', 'martin', 'Fantasy & Sci-Fi', 265000, 8, 1996, 'OL257943W', 9269962, 'Noble families fight for the Iron Throne of Westeros while an ancient threat gathers beyond the Wall. Book one of A Song of Ice and Fire.'],
  ['demo-19', 'The Name of the Wind', 'rothfuss', 'Fantasy & Sci-Fi', 235000, 7, 2007, 'OL8479867W', 11480483, 'Kvothe, now an innkeeper in hiding, tells the true story of how he grew from a travelling performer’s child into the most notorious wizard of his age.'],
  ['demo-20', 'Dune', 'herbert', 'Fantasy & Sci-Fi', 228000, 19, 1965, 'OL893414W', 11481354, 'On the desert planet Arrakis, source of the most valuable substance in the universe, young Paul Atreides is drawn into a war of noble houses, prophecy and survival.'],
  ['demo-21', 'The Hitchhiker’s Guide to the Galaxy', 'adams', 'Fantasy & Sci-Fi', 115000, 21, 1979, 'OL2163649W', 12986869, 'Seconds before Earth is demolished, Arthur Dent is rescued by his friend Ford Prefect, a researcher for a travel guide. A comic tour of a very strange galaxy. Don’t panic.'],
  ['demo-22', 'Ender’s Game', 'card', 'Fantasy & Sci-Fi', 139000, 12, 1985, 'OL49488W', 12996033, 'Gifted child Ender Wiggin is sent to Battle School to train as the commander humanity needs against an alien enemy, through games that may not be games at all.'],
  ['demo-23', 'The Da Vinci Code', 'brown', 'Mystery & Thriller', 159000, 24, 2003, 'OL76837W', 9255229, 'A murder in the Louvre leaves symbols that send professor Robert Langdon and cryptologist Sophie Neveu racing across Europe after a centuries-old secret.'],
  ['demo-24', 'Gone Girl', 'flynn', 'Mystery & Thriller', 169000, 10, 2012, 'OL16239762W', 8368314, 'On their fifth anniversary Amy Dunne disappears, and her husband Nick becomes the prime suspect. Two voices tell very different stories about the same marriage.'],
  ['demo-25', 'The Girl with the Dragon Tattoo', 'larsson', 'Mystery & Thriller', 179000, 9, 2005, 'OL5784622W', 9274740, 'Journalist Mikael Blomkvist and hacker Lisbeth Salander investigate a forty-year-old disappearance inside one of Sweden’s richest families.'],
  ['demo-26', 'And Then There Were None', 'christie', 'Mystery & Thriller', 109000, 28, 1939, 'OL471565W', 11172296, 'Ten strangers are invited to an island and, one by one, they start to die. Christie’s best-selling mystery, with no detective to save them.'],
  ['demo-27', 'Murder on the Orient Express', 'christie', 'Mystery & Thriller', 109000, 23, 1934, 'OL471576W', 11100465, 'Snow stops the famous train, and a passenger is found stabbed in his locked compartment. Hercule Poirot has twelve suspects and very little time.'],
  ['demo-28', 'The Hound of the Baskervilles', 'doyle', 'Mystery & Thriller', 89000, 19, 1902, 'OL262454W', 8063264, 'A legend of a demon hound haunts the Baskerville family on Dartmoor. Sherlock Holmes and Dr Watson must find out what is really killing them.'],
  ['demo-29', 'Charlotte’s Web', 'white', 'Children', 95000, 30, 1952, 'OL483391W', 8461797, 'Wilbur the pig is saved from the butcher by a clever spider named Charlotte, who writes words in her web. A gentle story of friendship.'],
  ['demo-30', 'The Little Prince', 'exupery', 'Children', 79000, 45, 1943, 'OL10263W', 10708272, 'A pilot stranded in the desert meets a small prince from another planet, who tells him about his rose, his travels and what really matters.'],
  ['demo-31', 'Matilda', 'dahl', 'Children', 99000, 27, 1988, 'OL45846W', 12889769, 'Matilda loves books, her parents ignore her and her headmistress is a tyrant. Luckily, Matilda has discovered a remarkable power of her own.'],
  ['demo-32', 'Charlie and the Chocolate Factory', 'dahl', 'Children', 99000, 25, 1964, 'OL45790W', 12459564, 'Charlie Bucket finds a golden ticket and enters Willy Wonka’s secret chocolate factory with four very badly behaved children.'],
  ['demo-33', 'Winnie-the-Pooh', 'milne', 'Children', 89000, 22, 1926, 'OL476641W', 8610816, 'Pooh Bear, Piglet, Eeyore and Christopher Robin share small adventures in the Hundred Acre Wood.'],
  ['demo-34', 'Where the Wild Things Are', 'sendak', 'Children', 119000, 14, 1963, 'OL2568879W', 50842, 'Sent to bed without supper, Max sails away to the land of the Wild Things and becomes their king. A classic picture book.'],
  ['demo-35', 'A Brief History of Time', 'hawking', 'Science', 155000, 18, 1988, 'OL1892617W', 10432365, 'From the Big Bang to black holes, Stephen Hawking explains the biggest questions in physics for readers with no maths background.'],
  ['demo-36', 'Cosmos', 'sagan', 'Science', 185000, 11, 1980, 'OL15829966W', 8283901, 'Carl Sagan follows fifteen billion years of cosmic history and the human story of how we came to understand it.'],
  ['demo-37', 'The Selfish Gene', 'dawkins', 'Science', 175000, 9, 1976, 'OL1966488W', 133936, 'Richard Dawkins looks at evolution from the point of view of the gene, and explains why that view also helps to understand cooperation.'],
  ['demo-38', 'The Gene: An Intimate History', 'mukherjee', 'Science', 245000, 6, 2016, 'OL17762235W', 11320163, 'A history of the idea of the gene, from Mendel’s peas to genome editing, told together with the story of the author’s own family.'],
  ['demo-39', 'Astrophysics for People in a Hurry', 'tyson', 'Science', 119000, 20, 2017, 'OL17710047W', 7984709, 'Short chapters on the universe – dark matter, light, planets – that you can read on the way to work.'],
  ['demo-40', 'Sapiens: A Brief History of Humankind', 'harari', 'History', 239000, 26, 2011, 'OL17075811W', 8634250, 'How did one species of ape come to rule the world? Harari follows humans from the first stories to money, empires and science.'],
  ['demo-41', 'Guns, Germs, and Steel', 'diamond', 'History', 249000, 8, 1997, 'OL276558W', 7884018, 'Why did some societies conquer others? Jared Diamond argues that geography, crops and animals mattered more than people themselves.'],
  ['demo-42', 'The Diary of a Young Girl', 'frank', 'History', 129000, 21, 1947, 'OL27294413W', 13526331, 'The diary Anne Frank kept while hiding with her family in Amsterdam from 1942 to 1944.'],
  ['demo-43', 'SPQR: A History of Ancient Rome', 'beard', 'History', 269000, 7, 2015, 'OL17340134W', 7418788, 'Mary Beard tells the story of Rome’s first thousand years – how a small town became an empire, and what Romans thought of themselves.'],
  ['demo-44', 'Atomic Habits', 'clear', 'Self-help', 189000, 38, 2018, 'OL17930368W', 12539702, 'Small habits, repeated every day, add up to large results. A practical guide to building good habits and breaking bad ones.'],
  ['demo-45', 'The 7 Habits of Highly Effective People', 'covey', 'Self-help', 179000, 16, 1989, 'OL2629977W', 10079937, 'Seven principles for personal and team effectiveness, from “be proactive” to “sharpen the saw”.'],
  ['demo-46', 'How to Win Friends and Influence People', 'carnegie', 'Self-help', 119000, 33, 1936, 'OL1063267W', 13314878, 'Simple, still useful advice on listening, showing interest in others and handling disagreement.'],
  ['demo-47', 'Thinking, Fast and Slow', 'kahneman', 'Self-help', 229000, 12, 2011, 'OL15992072W', 13290711, 'A Nobel-winning psychologist explains our two ways of thinking – fast and intuitive, slow and careful – and the mistakes each one makes.'],
  ['demo-48', 'Man’s Search for Meaning', 'frankl', 'Self-help', 99000, 24, 1946, 'OL8257090W', 465226, 'A psychiatrist’s account of surviving the concentration camps and of how finding meaning helps people endure suffering.'],
  ['demo-49', 'Deep Work', 'newport', 'Self-help', 159000, 15, 2016, 'OL17713267W', 7988607, 'Why focused, distraction-free work is rare and valuable, and how to build a schedule that makes room for it.'],
  ['demo-50', 'Zero to One', 'thiel', 'Business', 149000, 17, 2014, 'OL17078706W', 9002334, 'Notes on start-ups and how to build companies that create something new instead of copying what already exists.'],
  ['demo-51', 'The Lean Startup', 'ries', 'Business', 169000, 13, 2011, 'OL16086010W', 7104760, 'Build, measure, learn: a method for testing ideas quickly with real customers before spending months on the wrong product.'],
  ['demo-52', 'Good to Great', 'collins', 'Business', 189000, 10, 2001, 'OL3486275W', 7431270, 'A five-year study of companies that made the leap from good to great results, and what they did differently.'],
  ['demo-53', 'Rich Dad Poor Dad', 'kiyosaki', 'Business', 129000, 29, 1997, 'OL2010879W', 8315603, 'Two father figures, two attitudes to money. An easy introduction to assets, liabilities and financial literacy.'],
  ['demo-54', 'The Psychology of Money', 'housel', 'Business', 165000, 31, 2020, 'OL21640039W', 10389354, 'Short stories about how people really behave with money, and why that matters more than knowing formulas.'],
];

// Demo books are spread six hours apart, mixed in with the 30 seed books (02/10–31/10).
const DEMO_START = Date.parse('2026-10-20T09:00:00+07:00'); // last one: 02/11/2026 – always in the past, so a book added today is still first (US-05/AC-01)
const createdAt = (index) => new Date(DEMO_START + index * 6 * 3600 * 1000).toISOString();

// Full description shown on the detail page: team summary + first publication year + source line.
const describe = ([, , , , , , year, work, , text]) =>
  `${text}\n\nFirst published ${year}. Book data: Open Library (openlibrary.org/works/${work}).`;

module.exports = { AUTHORS, BOOKS, coverUrl, createdAt, describe };

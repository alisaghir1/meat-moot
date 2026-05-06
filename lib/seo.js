import { cookies } from "next/headers";

const SITE_URL = "https://meatmoot.ae";

// Per-route metadata in 3 languages. Keep titles ≤ 60 chars, descriptions ≤ 160.
const SEO = {
  about: {
    path: "/about",
    en: {
      title: "About Meat Moot | Our Story, Vision & Smoked Meat Craft",
      description:
        "Discover the story behind Meat Moot — UAE's home of premium smoked meat. Learn about our vision, our chefs, and the craft behind every dish.",
      keywords:
        "about meat moot, smoked meat restaurant UAE, meat moot story, Dubai BBQ, premium steakhouse Dubai",
    },
    ar: {
      title: "عن میت موت | قصتنا ورؤيتنا وحرفة اللحوم المدخنة",
      description:
        "تعرّف على قصة میت موت، موطن اللحوم المدخنة الفاخرة في الإمارات. اكتشف رؤيتنا وطهاتنا والحرفة وراء كل طبق.",
      keywords: "عن میت موت, مطعم لحوم مدخنة, دبي, الإمارات",
    },
    ru: {
      title: "О Мит Мут | Наша история и искусство копчения мяса",
      description:
        "Узнайте историю Meat Moot — дом премиального копчёного мяса в ОАЭ. Наше видение, шефы и мастерство в каждом блюде.",
      keywords: "о Мит Мут, копчёное мясо, Дубай, ОАЭ",
    },
  },
  contact: {
    path: "/contact",
    en: {
      title: "Contact Meat Moot | Reservations & Branch Locations UAE",
      description:
        "Get in touch with Meat Moot. Find our branches across Dubai and Abu Dhabi, make a reservation, or send us a message.",
      keywords: "contact meat moot, reservations Dubai, restaurant booking UAE, meat moot location",
    },
    ar: {
      title: "اتصل بـ میت موت | الحجوزات وفروعنا في الإمارات",
      description:
        "تواصل مع میت موت. اعثر على فروعنا في دبي وأبوظبي، احجز طاولتك، أو أرسل لنا رسالة.",
      keywords: "اتصل میت موت, حجز مطعم, دبي, أبوظبي",
    },
    ru: {
      title: "Контакты Meat Moot | Бронирование и филиалы в ОАЭ",
      description:
        "Свяжитесь с Meat Moot. Наши филиалы в Дубае и Абу-Даби, бронирование столиков и обратная связь.",
      keywords: "контакты Мит Мут, бронирование Дубай, ресторан ОАЭ",
    },
  },
  terms: {
    path: "/terms",
    en: {
      title: "Terms & Conditions | Meat Moot",
      description:
        "Read the terms and conditions for using the Meat Moot website and services across our UAE branches.",
      keywords: "meat moot terms, terms and conditions, privacy",
    },
    ar: {
      title: "الشروط والأحكام | میت موت",
      description: "اطّلع على الشروط والأحكام الخاصة بموقع میت موت وخدماتنا في فروع الإمارات.",
      keywords: "شروط وأحكام میت موت",
    },
    ru: {
      title: "Условия использования | Meat Moot",
      description: "Условия использования сайта и сервисов Meat Moot в филиалах по ОАЭ.",
      keywords: "условия Мит Мут",
    },
  },

  // Branches
  "al-qana": {
    path: "/al-qana",
    en: {
      title: "Meat Moot Al Qana, Abu Dhabi | Premium Smoked Meat Restaurant",
      description:
        "Visit Meat Moot at Al Qana, Abu Dhabi. Smoked steaks, premium cuts and a unique dining experience by the waterfront.",
      keywords: "meat moot al qana, Abu Dhabi steakhouse, smoked meat Abu Dhabi, Al Qana restaurants",
    },
    ar: {
      title: "میت موت القنا، أبوظبي | مطعم لحوم مدخنة فاخر",
      description: "زر میت موت في القنا، أبوظبي. ستيك مدخن وقطع فاخرة وتجربة طعام مميزة على الواجهة المائية.",
      keywords: "میت موت القنا, مطعم أبوظبي, لحوم مدخنة",
    },
    ru: {
      title: "Meat Moot Аль Кана, Абу-Даби | Премиальный стейк-хаус",
      description:
        "Посетите Meat Moot в Аль Кана, Абу-Даби. Копчёные стейки, премиум-отрубы и уникальный ужин у воды.",
      keywords: "Мит Мут Аль Кана, Абу-Даби, стейк-хаус",
    },
  },
  "city-walk": {
    path: "/city-walk",
    en: {
      title: "Meat Moot City Walk, Dubai | Smoked Meat in the Heart of Dubai",
      description:
        "Meat Moot City Walk offers premium smoked meat in central Dubai. Discover signature dishes, sides and a vibrant atmosphere.",
      keywords: "meat moot city walk, City Walk Dubai restaurants, smoked meat Dubai, Dubai steakhouse",
    },
    ar: {
      title: "میت موت سيتي ووك، دبي | لحوم مدخنة في قلب دبي",
      description: "میت موت سيتي ووك يقدم لحومًا مدخنة فاخرة في وسط دبي. أطباق مميزة وأجواء حيوية.",
      keywords: "میت موت سيتي ووك, مطاعم دبي, لحوم مدخنة دبي",
    },
    ru: {
      title: "Meat Moot City Walk, Дубай | Копчёное мясо в центре Дубая",
      description: "Meat Moot City Walk — премиальное копчёное мясо в центре Дубая. Фирменные блюда и атмосфера.",
      keywords: "Мит Мут City Walk, рестораны Дубай",
    },
  },
  "dubai-hills": {
    path: "/dubai-hills",
    en: {
      title: "Meat Moot Dubai Hills | Smoked Meat Restaurant in Dubai Hills",
      description:
        "Enjoy Meat Moot's premium smoked meat at our Dubai Hills branch. Family-friendly steakhouse with signature dishes.",
      keywords: "meat moot dubai hills, Dubai Hills Mall restaurants, steakhouse Dubai Hills",
    },
    ar: {
      title: "میت موت دبي هيلز | مطعم لحوم مدخنة في دبي هيلز",
      description: "استمتع بلحوم میت موت المدخنة الفاخرة في فرع دبي هيلز. ستيك هاوس عائلي بأطباق مميزة.",
      keywords: "میت موت دبي هيلز, دبي هيلز مول",
    },
    ru: {
      title: "Meat Moot Dubai Hills | Стейк-хаус в Dubai Hills",
      description: "Премиальное копчёное мясо в филиале Dubai Hills. Семейный стейк-хаус с фирменными блюдами.",
      keywords: "Мит Мут Dubai Hills, стейк-хаус Дубай",
    },
  },
  jbr: {
    path: "/jbr",
    en: {
      title: "Meat Moot JBR | Smoked Meat Restaurant on The Walk, Dubai",
      description:
        "Meat Moot JBR brings smoked steaks and premium cuts to The Walk, Jumeirah Beach Residence. Beachside dining at its best.",
      keywords: "meat moot JBR, Jumeirah Beach Residence restaurants, The Walk JBR steakhouse",
    },
    ar: {
      title: "میت موت جي بي آر | مطعم لحوم مدخنة في ذا ووك دبي",
      description: "میت موت جي بي آر يقدم الستيك المدخن والقطع الفاخرة في ذا ووك جميرا بيتش ريزيدنس.",
      keywords: "میت موت جي بي آر, جميرا بيتش ريزيدنس",
    },
    ru: {
      title: "Meat Moot JBR | Стейк-хаус на The Walk, Дубай",
      description: "Meat Moot JBR — копчёные стейки и премиум-отрубы на The Walk, JBR. Ужин у моря.",
      keywords: "Мит Мут JBR, JBR рестораны",
    },
  },
  khawaneej: {
    path: "/khawaneej",
    en: {
      title: "Meat Moot Al Khawaneej | Smoked Meat Restaurant Dubai",
      description:
        "Meat Moot Al Khawaneej offers premium smoked meat dining in a relaxed Dubai neighborhood setting.",
      keywords: "meat moot khawaneej, Al Khawaneej restaurants, Dubai steakhouse",
    },
    ar: {
      title: "میت موت الخوانيج | مطعم لحوم مدخنة دبي",
      description: "میت موت الخوانيج يقدم تجربة لحوم مدخنة فاخرة في أجواء هادئة بدبي.",
      keywords: "میت موت الخوانيج, مطاعم الخوانيج",
    },
    ru: {
      title: "Meat Moot Аль Хавани | Стейк-хаус Дубай",
      description: "Премиальное копчёное мясо в филиале Аль Хавани в Дубае.",
      keywords: "Мит Мут Аль Хавани",
    },
  },

  // Blog index
  blogs: {
    path: "/blogs",
    en: {
      title: "Meat Moot Blog | Smoked Meat Tips, Cuts Guides & Recipes",
      description:
        "Read the Meat Moot blog for guides on beef and lamb cuts, smoking techniques, signature dishes and food culture.",
      keywords: "meat moot blog, smoked meat blog, beef cuts guide, lamb cuts guide, BBQ tips",
    },
    ar: {
      title: "مدونة میت موت | نصائح اللحوم المدخنة وأدلة القطع والوصفات",
      description: "اقرأ مدونة میت موت للحصول على أدلة قطع اللحم البقري والضأن وتقنيات التدخين والأطباق المميزة.",
      keywords: "مدونة میت موت, لحوم مدخنة, قطع اللحم",
    },
    ru: {
      title: "Блог Meat Moot | Гайды по мясу, копчению и рецепты",
      description: "Блог Meat Moot: гайды по отрубам говядины и баранины, техники копчения, рецепты.",
      keywords: "блог Мит Мут, копчёное мясо",
    },
  },
  // Blog posts
  "blogs/beef-cuts-guide": {
    path: "/blogs/beef-cuts-guide",
    en: {
      title: "Beef Cuts Explained: What Makes Each Cut Special | Meat Moot",
      description:
        "Explore the different beef cuts, their best uses, flavor profiles, and cooking methods in this comprehensive, easy-to-understand guide.",
      keywords: "beef cuts guide, ribeye, brisket, chuck, cooking beef",
    },
  },
  "blogs/food-and-friendship": {
    path: "/blogs/food-and-friendship",
    en: {
      title: "Food & Friendship: The Heart of Every Great Meal | Meat Moot",
      description:
        "Why food and friendship belong together. Discover how shared meals at Meat Moot turn into lasting memories.",
      keywords: "food and friendship, shared meals, Meat Moot stories",
    },
  },
  "blogs/global-flavors": {
    path: "/blogs/global-flavors",
    en: {
      title: "Global Flavors of Smoked Meat: A World Tour | Meat Moot",
      description:
        "Travel the world through smoked meat — from Texan brisket to Middle Eastern shawarma, explore global BBQ traditions.",
      keywords: "global BBQ, smoked meat traditions, world flavors, Texan brisket, shawarma",
    },
  },
  "blogs/lamb-cuts-guide": {
    path: "/blogs/lamb-cuts-guide",
    en: {
      title: "Lamb Cuts Guide: Choosing the Right Cut for Every Dish | Meat Moot",
      description:
        "A complete guide to lamb cuts: shoulder, leg, rack and more. Learn flavor, texture and the best ways to cook each cut.",
      keywords: "lamb cuts, lamb shoulder, lamb rack, cooking lamb",
    },
  },
  "blogs/meat-myths-busted": {
    path: "/blogs/meat-myths-busted",
    en: {
      title: "Meat Myths Busted: Facts vs Fiction About Steak & BBQ | Meat Moot",
      description:
        "Common meat myths — debunked. Learn the truth about searing, marbling, doneness and the best way to cook a steak.",
      keywords: "meat myths, steak facts, BBQ myths, cooking truth",
    },
  },
  "blogs/seasonal-menu-specials": {
    path: "/blogs/seasonal-menu-specials",
    en: {
      title: "Seasonal Menu Specials at Meat Moot | Limited-Time Dishes",
      description:
        "Discover Meat Moot's seasonal menu specials — limited-time dishes crafted around the freshest ingredients of the season.",
      keywords: "seasonal menu, Meat Moot specials, limited dishes",
    },
  },
  "blogs/secret-sauces": {
    path: "/blogs/secret-sauces",
    en: {
      title: "Secret Sauces: The Flavors Behind Meat Moot's Signature Dishes",
      description:
        "Behind every great steak is a great sauce. Explore the secret sauces and rubs that define the Meat Moot experience.",
      keywords: "BBQ sauce, secret sauce, steak rub, Meat Moot recipes",
    },
  },
  "blogs/signature-lamb-dishes": {
    path: "/blogs/signature-lamb-dishes",
    en: {
      title: "Signature Lamb Dishes at Meat Moot | Tender, Smoky & Rich",
      description:
        "From slow-roasted lamb shoulder to charcoal-grilled chops, discover the signature lamb dishes that define Meat Moot.",
      keywords: "lamb dishes, lamb shoulder, lamb chops, Meat Moot lamb",
    },
  },
  "blogs/smoking-history": {
    path: "/blogs/smoking-history",
    en: {
      title: "The History of Smoking Meat: Ancient Craft, Modern Flavor",
      description:
        "Trace the history of smoking meat from ancient preservation methods to the modern art of BBQ practiced at Meat Moot.",
      keywords: "history of smoking meat, BBQ history, meat preservation",
    },
  },
  "blogs/special-occasions": {
    path: "/blogs/special-occasions",
    en: {
      title: "Celebrate Special Occasions at Meat Moot | Private Dining UAE",
      description:
        "Birthdays, anniversaries and corporate events — celebrate your special occasions at Meat Moot across the UAE.",
      keywords: "private dining UAE, special occasions Dubai, group bookings Meat Moot",
    },
  },

  // News index
  news: {
    path: "/news",
    en: {
      title: "Meat Moot News | Openings, Events & Latest Updates",
      description:
        "Latest news from Meat Moot — branch openings, celebrity visits, events and announcements across the UAE and beyond.",
      keywords: "meat moot news, restaurant openings UAE, Dubai food news",
    },
    ar: {
      title: "أخبار میت موت | الافتتاحات والفعاليات وآخر التحديثات",
      description: "آخر أخبار میت موت — افتتاحات الفروع، زيارات المشاهير، الفعاليات والإعلانات في الإمارات وخارجها.",
      keywords: "أخبار میت موت, افتتاحات مطاعم",
    },
    ru: {
      title: "Новости Meat Moot | Открытия, события и обновления",
      description:
        "Последние новости Meat Moot — открытия филиалов, визиты знаменитостей, события и анонсы в ОАЭ и за рубежом.",
      keywords: "новости Мит Мут, рестораны Дубай",
    },
  },
  // News posts
  "news/al-ain-grand-opening": {
    path: "/news/al-ain-grand-opening",
    en: {
      title: "Meat Moot Al Ain Grand Opening | Now Open in Al Ain",
      description:
        "Meat Moot opens its doors in Al Ain. Read about the grand opening, signature dishes and what to expect at our newest branch.",
      keywords: "Al Ain grand opening, Meat Moot Al Ain, new restaurant Al Ain",
    },
  },
  "news/arab-stars-visit": {
    path: "/news/arab-stars-visit",
    en: {
      title: "Arab Stars Visit Meat Moot | Celebrity Dining Experience",
      description:
        "Top Arab stars dine at Meat Moot. See who came, what they ordered, and why Meat Moot is a celebrity favorite in the UAE.",
      keywords: "celebrity restaurant UAE, Arab stars Meat Moot, celebrity dining Dubai",
    },
  },
  "news/dubai-grand-opening": {
    path: "/news/dubai-grand-opening",
    en: {
      title: "Meat Moot Dubai Grand Opening | The Story Begins",
      description:
        "How Meat Moot opened in Dubai and quickly became a destination for premium smoked meat lovers.",
      keywords: "Dubai grand opening, Meat Moot Dubai, restaurant launch Dubai",
    },
  },
  "news/dubai-hills-branch": {
    path: "/news/dubai-hills-branch",
    en: {
      title: "Meat Moot Dubai Hills Branch | New Location Announced",
      description:
        "Meat Moot expands to Dubai Hills. Discover the new branch, the menu, and what makes this location special.",
      keywords: "Dubai Hills branch, Meat Moot Dubai Hills, new branch UAE",
    },
  },
  "news/dubai-hills-opening": {
    path: "/news/dubai-hills-opening",
    en: {
      title: "Meat Moot Dubai Hills Opening Day | Highlights & Photos",
      description: "Highlights from the Meat Moot Dubai Hills opening day — guests, dishes and unforgettable moments.",
      keywords: "Dubai Hills opening, Meat Moot launch event",
    },
  },
  "news/ertugrul-cast-visit": {
    path: "/news/ertugrul-cast-visit",
    en: {
      title: "Ertugrul Cast Visits Meat Moot | A Memorable Evening",
      description:
        "The cast of Ertugrul dined at Meat Moot. See photos and read about their unforgettable evening at our restaurant.",
      keywords: "Ertugrul cast Dubai, celebrity visit Meat Moot",
    },
  },
  "news/happy-new-year-2026": {
    path: "/news/happy-new-year-2026",
    en: {
      title: "Happy New Year 2026 from Meat Moot | Celebrate With Us",
      description:
        "Ring in 2026 with Meat Moot. Discover our New Year specials, festive menu and reservations across the UAE.",
      keywords: "New Year 2026, Meat Moot festive menu, NYE Dubai",
    },
  },
  "news/immersive-experience": {
    path: "/news/immersive-experience",
    en: {
      title: "The Meat Moot Immersive Dining Experience | More Than a Meal",
      description:
        "Meat Moot is more than a restaurant — it's an immersive dining experience. Discover the atmosphere, service and craft.",
      keywords: "immersive dining Dubai, Meat Moot experience, premium restaurant UAE",
    },
  },
  "news/jbr-branch-opening": {
    path: "/news/jbr-branch-opening",
    en: {
      title: "Meat Moot JBR Branch Opening | Now Open at The Walk",
      description:
        "Meat Moot officially opens at JBR, The Walk. Discover the new branch, menu highlights and beachside atmosphere.",
      keywords: "JBR branch opening, Meat Moot JBR, The Walk Dubai",
    },
  },
  "news/meat-moot-fastest-growing-chain": {
    path: "/news/meat-moot-fastest-growing-chain",
    en: {
      title: "Meat Moot: One of the Fastest-Growing Restaurant Chains in the UAE",
      description:
        "Meat Moot continues to expand across the UAE, becoming one of the fastest-growing premium dining chains in the region.",
      keywords: "fastest growing restaurant UAE, Meat Moot expansion",
    },
  },
  "news/meat-moot-global-success": {
    path: "/news/meat-moot-global-success",
    en: {
      title: "Meat Moot's Global Success Story | From UAE to the World",
      description:
        "How Meat Moot grew from a UAE concept into a globally recognised name in premium smoked meat dining.",
      keywords: "Meat Moot global, restaurant success story, UAE to world",
    },
  },
};

export async function buildMetadata(key) {
  const entry = SEO[key];
  if (!entry) return {};

  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";

  const lang = entry[language] ? language : "en";
  const data = entry[lang] || entry.en;

  const url = `${SITE_URL}${entry.path}`;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: { canonical: entry.path },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: "Meat Moot",
      type: entry.path.startsWith("/blogs/") || entry.path.startsWith("/news/") ? "article" : "website",
      locale: lang === "ar" ? "ar_AE" : lang === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

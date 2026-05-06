const SITE_URL = 'https://meatmoot.ae';

// All static routes in the app
const routes = [
  '',
  '/about',
  '/contact',
  '/terms',
  '/al-qana',
  '/city-walk',
  '/dubai-hills',
  '/jbr',
  '/khawaneej',
  '/blogs',
  '/blogs/beef-cuts-guide',
  '/blogs/food-and-friendship',
  '/blogs/global-flavors',
  '/blogs/lamb-cuts-guide',
  '/blogs/meat-myths-busted',
  '/blogs/seasonal-menu-specials',
  '/blogs/secret-sauces',
  '/blogs/signature-lamb-dishes',
  '/blogs/smoking-history',
  '/blogs/special-occasions',
  '/news',
  '/news/al-ain-grand-opening',
  '/news/arab-stars-visit',
  '/news/dubai-grand-opening',
  '/news/dubai-hills-branch',
  '/news/dubai-hills-opening',
  '/news/ertugrul-cast-visit',
  '/news/happy-new-year-2026',
  '/news/immersive-experience',
  '/news/jbr-branch-opening',
  '/news/meat-moot-fastest-growing-chain',
  '/news/meat-moot-global-success',
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));
}

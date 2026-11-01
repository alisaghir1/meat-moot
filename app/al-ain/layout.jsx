import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata('al-ain');
}

export default function Layout({ children }) {
  return children;
}

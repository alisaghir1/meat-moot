import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/seasonal-menu-specials");
}

export default function Layout({ children }) {
  return children;
}

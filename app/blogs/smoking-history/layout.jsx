import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/smoking-history");
}

export default function Layout({ children }) {
  return children;
}

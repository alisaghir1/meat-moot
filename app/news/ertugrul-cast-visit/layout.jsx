import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/ertugrul-cast-visit");
}

export default function Layout({ children }) {
  return children;
}

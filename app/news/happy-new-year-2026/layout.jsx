import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/happy-new-year-2026");
}

export default function Layout({ children }) {
  return children;
}

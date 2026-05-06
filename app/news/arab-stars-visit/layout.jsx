import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/arab-stars-visit");
}

export default function Layout({ children }) {
  return children;
}

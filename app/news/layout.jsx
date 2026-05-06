import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news");
}

export default function Layout({ children }) {
  return children;
}

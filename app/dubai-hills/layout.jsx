import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("dubai-hills");
}

export default function Layout({ children }) {
  return children;
}

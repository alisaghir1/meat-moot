import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("about");
}

export default function Layout({ children }) {
  return children;
}

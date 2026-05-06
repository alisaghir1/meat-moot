import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/jbr-branch-opening");
}

export default function Layout({ children }) {
  return children;
}

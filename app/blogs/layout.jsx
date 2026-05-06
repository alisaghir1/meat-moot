import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs");
}

export default function Layout({ children }) {
  return children;
}

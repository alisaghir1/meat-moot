import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/secret-sauces");
}

export default function Layout({ children }) {
  return children;
}

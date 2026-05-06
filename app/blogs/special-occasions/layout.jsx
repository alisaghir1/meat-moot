import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/special-occasions");
}

export default function Layout({ children }) {
  return children;
}

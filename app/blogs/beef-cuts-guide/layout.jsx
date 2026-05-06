import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/beef-cuts-guide");
}

export default function Layout({ children }) {
  return children;
}

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/lamb-cuts-guide");
}

export default function Layout({ children }) {
  return children;
}

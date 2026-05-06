import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/signature-lamb-dishes");
}

export default function Layout({ children }) {
  return children;
}

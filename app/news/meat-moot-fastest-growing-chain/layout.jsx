import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/meat-moot-fastest-growing-chain");
}

export default function Layout({ children }) {
  return children;
}

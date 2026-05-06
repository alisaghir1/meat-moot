import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/meat-moot-global-success");
}

export default function Layout({ children }) {
  return children;
}

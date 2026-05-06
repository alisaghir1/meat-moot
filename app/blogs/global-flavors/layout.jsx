import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/global-flavors");
}

export default function Layout({ children }) {
  return children;
}

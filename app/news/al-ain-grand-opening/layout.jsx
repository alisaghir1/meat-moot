import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/al-ain-grand-opening");
}

export default function Layout({ children }) {
  return children;
}

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("news/immersive-experience");
}

export default function Layout({ children }) {
  return children;
}

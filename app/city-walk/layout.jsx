import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("city-walk");
}

export default function Layout({ children }) {
  return children;
}

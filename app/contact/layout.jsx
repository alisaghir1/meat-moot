import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("contact");
}

export default function Layout({ children }) {
  return children;
}

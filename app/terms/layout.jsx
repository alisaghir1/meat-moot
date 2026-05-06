import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("terms");
}

export default function Layout({ children }) {
  return children;
}

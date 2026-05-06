import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("al-qana");
}

export default function Layout({ children }) {
  return children;
}

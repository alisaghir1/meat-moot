import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("jbr");
}

export default function Layout({ children }) {
  return children;
}

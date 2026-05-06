import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("blogs/food-and-friendship");
}

export default function Layout({ children }) {
  return children;
}

import { fetchAllNews } from "@/lib/news";
import Dashboard from "./components/Dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { items, fetchedAt, failed } = await fetchAllNews();
  return <Dashboard items={items} fetchedAt={fetchedAt} failed={failed} />;
}

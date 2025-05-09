import { Content } from "@/components/content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="space-y-3 w-full px-4 max-w-screen-xl">
        <Content />
      </div>
    </main>
  );
}

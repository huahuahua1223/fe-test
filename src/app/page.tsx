import { Workspace } from "@/components/workspace/workspace";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1280px] items-stretch">
        <Workspace />
      </div>
    </main>
  );
}

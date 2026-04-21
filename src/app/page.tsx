import { Workspace } from "@/components/workspace/workspace";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-stretch">
      <div className="flex min-h-screen w-full items-stretch">
        <Workspace />
      </div>
    </main>
  );
}

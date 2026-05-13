"use client";

export function MinimalStoreLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <div className="border-b border-zinc-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="h-6 w-32 animate-pulse rounded-full bg-zinc-200" />
          <div className="hidden gap-3 md:flex">
            <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[40px] bg-white p-8 shadow-sm">
          <div className="h-4 w-28 animate-pulse rounded-full bg-zinc-200" />
          <div className="mt-5 h-12 w-2/3 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-zinc-100" />
        </section>

        <section className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-[3/4] animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-100" />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
"use client";

export function GbGamesStoreLoading() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#09090B] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#5A00B1]/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#7B2CFF]/10 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="h-7 w-40 animate-pulse rounded-full bg-white/10" />

          <div className="flex items-center gap-4">
            <div className="hidden h-5 w-24 animate-pulse rounded-full bg-white/10 md:block" />

            <div className="h-12 w-36 animate-pulse rounded-2xl bg-white/10" />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="h-8 w-52 animate-pulse rounded-full bg-white/10" />

          <div className="mt-10 h-20 w-full max-w-4xl animate-pulse rounded-[32px] bg-white/10" />

          <div className="mt-6 h-8 w-full max-w-2xl animate-pulse rounded-full bg-white/5" />

          <div className="mt-12 h-14 w-56 animate-pulse rounded-2xl bg-[#5A00B1]/30" />
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10">
            <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />

            <div className="mt-4 h-10 w-72 animate-pulse rounded-2xl bg-white/10" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />

                <div className="mt-6 flex items-center justify-between">
                  <div className="h-8 w-40 animate-pulse rounded-2xl bg-white/10" />

                  <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />

            <div className="mt-4 h-10 w-80 animate-pulse rounded-2xl bg-white/10" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-[#111118]"
              >
                <div className="aspect-[4/5] animate-pulse bg-white/10" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/10" />

                  <div className="h-8 w-32 animate-pulse rounded-full bg-white/10" />

                  <div className="h-12 w-full animate-pulse rounded-2xl bg-[#5A00B1]/20" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
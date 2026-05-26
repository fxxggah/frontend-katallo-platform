import type { StoreResponse } from "@/types";

type GbGamesFooterProps = {
  store: StoreResponse;
};

export function GbGamesFooter({ store }: GbGamesFooterProps) {
  return (
    <footer className="mt-32 border-t border-white/10 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              GB GAMES
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
              Performance, tecnologia e experiência premium para gamers que
              querem elevar o setup ao próximo nível.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            {store.whatsappNumber && (
              <a
                href={`https://wa.me/${store.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#7B2CFF]/30 bg-[#7B2CFF]/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7B2CFF]/20"
              >
                Falar no WhatsApp
              </a>
            )}

            <div className="text-sm text-zinc-500">
              {store.city} • {store.state}
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              © {new Date().getFullYear()} {store.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { MapPin, Clock, Instagram, Facebook, Heart } from "lucide-react";

type EsterFooterProps = {
  store: StoreResponse;
};

export function EsterFooter({ store }: EsterFooterProps) {
  return (
    <footer className="relative mt-24 overflow-hidden">

      {/* Faixa versículo com gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#880E4F] via-[#C2185B] to-[#880E4F] py-10 text-center">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="relative mx-auto max-w-2xl px-6">
          <p
            className="text-xl font-bold italic leading-relaxed text-white/95 sm:text-2xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "Ela se veste de força e honra, e ri-se do dia de amanhã."
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Provérbios 31:25
          </p>
        </div>
      </div>

      {/* Corpo do footer */}
      <div className="bg-[#1A0311] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">

            {/* Logo e descrição */}
            <div>
              <Link href={`/${store.slug}`}>
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={200}
                    height={56}
                    className="h-14 w-auto object-contain brightness-0 invert"
                  />
                ) : (
                  <div>
                    <h3
                      className="bg-gradient-to-r from-[#F48FB1] to-[#F06292] bg-clip-text text-2xl font-black text-transparent"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {store.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                      <span className="h-px w-5 bg-current" />
                      moda evangelica
                      <span className="h-px w-5 bg-current" />
                    </div>
                  </div>
                )}
              </Link>

              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
                Moda feminina evangélica com elegância, delicadeza e qualidade 
                para mulheres que valorizam sua essência e seu estilo.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <Heart size={14} className="fill-[#E91E8C] text-[#E91E8C]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F48FB1]/70">
                  Feito com amor e fé
                </span>
              </div>
            </div>

            {/* Informações */}
            <div>
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F48FB1]">
                <span className="h-px w-4 bg-[#E91E8C]" />
                Informações
              </h4>

              <div className="mt-6 space-y-5 text-sm text-white/65">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#E91E8C]/15">
                    <MapPin size={14} className="text-[#F48FB1]" />
                  </div>
                  <span className="leading-relaxed">
                    R. Zorobabel Ferreira de Sá, 341<br />
                    Jardim Peabiru — Botucatu/SP
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#E91E8C]/15">
                    <Clock size={14} className="text-[#F48FB1]" />
                  </div>
                  <div>
                    <p className="text-white/40">Segunda a Sexta</p>
                    <p className="font-semibold text-white/80">08h às 18h</p>
                    <p className="mt-2 text-white/40">Sábado</p>
                    <p className="font-semibold text-white/80">08h às 13h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#F48FB1]">
                <span className="h-px w-4 bg-[#E91E8C]" />
                Redes Sociais
              </h4>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/ester__moda_evangelica_botu/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/75 transition-all duration-300 hover:border-[#E91E8C]/40 hover:bg-[#E91E8C]/10 hover:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#E91E8C]/30 to-[#C2185B]/20 transition-all duration-300 group-hover:from-[#E91E8C] group-hover:to-[#C2185B]">
                    <Instagram size={15} className="text-[#F48FB1] transition-colors group-hover:text-white" />
                  </div>
                  <span className="text-[12px] font-semibold">@ester__moda_evangelica_botu</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=100068184459064"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/75 transition-all duration-300 hover:border-[#E91E8C]/40 hover:bg-[#E91E8C]/10 hover:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#E91E8C]/30 to-[#C2185B]/20 transition-all duration-300 group-hover:from-[#E91E8C] group-hover:to-[#C2185B]">
                    <Facebook size={15} className="text-[#F48FB1] transition-colors group-hover:text-white" />
                  </div>
                  <span className="text-[12px] font-semibold">Ester Moda Evangélica</span>
                </a>
              </div>
            </div>

          </div>

          {/* Rodapé final */}
          <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/8 pt-8 sm:flex-row sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              © {new Date().getFullYear()} {store.name} — Todos os direitos reservados
            </p>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/25">
              <Heart size={9} className="fill-[#E91E8C]/50 text-[#E91E8C]/50" />
              Com amor para você
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
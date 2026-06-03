"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { MapPin, Clock, Instagram, Facebook } from "lucide-react";

type EsterFooterProps = {
  store: StoreResponse;
};

export function EsterFooter({ store }: EsterFooterProps) {
  return (
    <footer className="mt-24 border-t border-[#EAD593]/20 bg-[#FFF8FA]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Link href={`/${store.slug}`}>
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={220}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <h3 className="text-2xl font-black text-[#B52D4F]">
                  {store.name}
                </h3>
              )}
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#6B5560]">
              Moda feminina evangélica com elegância,
              delicadeza e qualidade para mulheres que valorizam
              sua essência e seu estilo.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.25em] text-[#B52D4F]">
              Informações
            </h4>

            <div className="mt-6 space-y-5 text-sm text-[#6B5560]">
              <div className="flex gap-3">
                <MapPin size={18} className="text-[#EB3B6F]" />

                <span>
                  R. Zorobabel Ferreira de Sá, 341
                  <br />
                  Jardim Peabiru
                  <br />
                  Botucatu/SP
                </span>
              </div>

              <div className="flex gap-3">
                <Clock size={18} className="text-[#EB3B6F]" />

                <div>
                  <p>Segunda a Sexta</p>
                  <p className="font-semibold">
                    08h às 18h
                  </p>

                  <p className="mt-2">Sábado</p>
                  <p className="font-semibold">
                    08h às 13h
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.25em] text-[#B52D4F]">
              Redes Sociais
            </h4>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href="https://www.instagram.com/ester__moda_evangelica_botu/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#EB3B6F]/15 bg-white px-5 py-4 text-[#3A2A2E] transition hover:border-[#EB3B6F]"
              >
                <Instagram
                  size={18}
                  className="text-[#EB3B6F]"
                />

                @ester__moda_evangelica_botu
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100068184459064"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[#EB3B6F]/15 bg-white px-5 py-4 text-[#3A2A2E] transition hover:border-[#EB3B6F]"
              >
                <Facebook
                  size={18}
                  className="text-[#EB3B6F]"
                />

                Ester Moda Evangélica
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#EAD593]/20 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9C8790]">
            © {new Date().getFullYear()} {store.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { KatalloFullLogo } from "@/components/brand/KatalloFullLogo";
import { KatalloLogo } from "@/components/brand/KatalloLogo";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-100 blur-3xl" />

        <div className="absolute bottom-[-160px] right-[-120px] h-[460px] w-[460px] rounded-full bg-violet-100 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-50 blur-3xl" />
      </div>

      {/* LEFT SIDE */}
      <section className="relative hidden w-full flex-col justify-between overflow-hidden border-r border-slate-100 bg-slate-950 p-12 lg:flex lg:w-[52%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_30%)]" />

        <div className="relative z-10">
          <KatalloLogo />

          <div className="mt-24 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-indigo-300">
              <Sparkles className="h-4 w-4" />
              Plataforma premium para vendas
            </div>

            <h1 className="text-6xl font-playfair font-black leading-[1.02] tracking-tight text-white">
              Sua loja digital com experiência de marca premium.
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-400">
              Organize produtos, receba pedidos e transforme seu WhatsApp em um
              fluxo profissional de vendas com a Katallo.
            </p>
          </div>

          <div className="mt-20 grid gap-5">
            {[
              {
                icon: <Store className="h-5 w-5" />,
                title: "Catálogo profissional",
                description:
                  "Tenha uma vitrine moderna e organizada em minutos.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Pedidos mais rápidos",
                description:
                  "Receba pedidos completos direto no WhatsApp.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Login seguro",
                description:
                  "Autenticação moderna e protegida com Google.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-3xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6">
          <p className="text-sm text-slate-500">
            © 2026 Katallo Tecnologias Ltda.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
              Plataforma operacional
            </span>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="relative flex w-full items-center justify-center px-6 py-10 lg:w-[48%]">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <div className="mb-10 flex justify-center lg:hidden">
            <KatalloFullLogo />
          </div>

          {/* LOGIN CARD */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
                  Bem-vindo
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  Entrar
                </h2>
              </div>
            </div>

            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Entre na plataforma utilizando sua conta Google.
            </p>

            {/* GOOGLE BUTTON */}
            <div className="mt-10">
              <Button className="group h-16 w-full rounded-2xl border border-slate-200 bg-white text-base font-bold text-slate-900 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
                {/* GOOGLE ICON */}
                <svg
                  className="mr-3 h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17 3.3 14.7 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c6.9 0 9.1-4.8 9.1-7.3 0-.5 0-.8-.1-1.2H12z"
                  />
                </svg>

                Continuar com Google

                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* SECURITY */}
            <div className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                    Login Seguro
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Utilizamos autenticação via Google para oferecer uma
                    experiência rápida, moderna e protegida.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TERMS */}
          <div className="mt-8 text-center">
            <p className="text-sm leading-relaxed text-slate-400">
              Ao continuar, você concorda com os Termos de Uso e Política de
              Privacidade da Katallo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
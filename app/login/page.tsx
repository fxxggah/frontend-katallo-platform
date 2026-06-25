"use client";

export const dynamic = "force-dynamic";

import axios from "axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Store,
  Zap,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { KatalloFullLogo } from "@/components/brand/KatalloFullLogo";
import { KatalloLogo } from "@/components/brand/KatalloLogo";

import { authService } from "@/services/authService";

const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
  "711004756306-c1qb90c3ogkkjnsvcov86of25mmrhhjp.apps.googleusercontent.com";

function LoginContent() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [status, setStatus] = useState<
    "idle" | "loading-script" | "ready" | "submitting"
  >("loading-script");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const handleLogin = async (response: { credential?: string }) => {
      if (!response?.credential) {
        setErrorMessage(
          "Não foi possível obter a credencial do Google."
        );

        setStatus("ready");

        return;
      }

      try {
        setStatus("submitting");

        setErrorMessage("");

        await authService.loginWithGoogle({
          token: response.credential,
        });

        router.push(redirect || "/admin/stores");
      } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err) && !err.response) {
          setErrorMessage(
            "Não foi possível conectar ao backend. Verifique se a API está ativa."
          );
        } else {
          setErrorMessage(
            "Não foi possível concluir o login."
          );
        }

        setStatus("ready");
      }
    };

    const initGoogle = () => {
      if (cancelled) return;

      if (!window.google?.accounts?.id) {
        setErrorMessage(
          "Google Identity Services não disponível."
        );

        setStatus("idle");

        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleLogin,
        });

        const buttonElement =
          document.getElementById("googleButton");

        if (!buttonElement) {
          setErrorMessage(
            "Elemento do botão não encontrado."
          );

          setStatus("idle");

          return;
        }

        buttonElement.innerHTML = "";

        window.google.accounts.id.renderButton(
          buttonElement,
          {
            theme: "filled_white",
            size: "large",
            shape: "pill",
            width: 360
          }
        );

        setStatus("ready");
      } catch (error) {
        console.error(error);

        setErrorMessage(
          "Erro ao inicializar login Google."
        );

        setStatus("idle");
      }
    };

    const existingScript =
      document.querySelector<HTMLScriptElement>(
        'script[src="https://accounts.google.com/gsi/client"]'
      );

    if (existingScript) {
      if (window.google?.accounts?.id) {
        initGoogle();
      } else {
        existingScript.addEventListener(
          "load",
          initGoogle,
          {
            once: true,
          }
        );
      }

      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://accounts.google.com/gsi/client";

    script.async = true;

    script.defer = true;

    script.onload = () => {
      initGoogle();
    };

    script.onerror = () => {
      if (!cancelled) {
        setErrorMessage(
          "Falha ao carregar o script de login do Google."
        );

        setStatus("idle");
      }
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [router, redirect]);

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
              A Plataforma para o seu catálogo digital
            </div>

            <h1 className="text-6xl font-playfair font-black leading-[1.02] tracking-tight text-white">
              Sua loja digital com experiência de marca premium.
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-400">
              Organize produtos, receba pedidos e transforme seu
              WhatsApp em um fluxo profissional de vendas com a
              Katallo.
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
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-indigo-600">
                Bem-vindo
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                Entrar
              </h2>
            </div>

            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Entre na plataforma utilizando sua conta Google.
            </p>

            {/* GOOGLE BUTTON CONTROLLER */}
            <div className="relative flex justify-center mt-6">
              {/* Botão Bonito Customizado (Visual) */}
              <div className="
    pointer-events-none absolute inset-0 
    flex h-14 w-full items-center justify-center gap-3 
    rounded-2xl border border-slate-200 bg-white 
    text-base font-semibold text-slate-700 shadow-sm 
    transition-all duration-300 
    hover:bg-slate-50 hover:scale-[1.01]
  ">
                {/* Ícone do Google G-Logo simplificado */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.3 1.55-1.17 2.86-2.5 3.74v3.1h4.05c2.37-2.17 3.74-5.39 3.74-8.69z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.05-3.1c-1.12.75-2.55 1.19-3.88 1.19-2.99 0-5.52-2.01-6.42-4.73H1.32v3.2A11.996 11.996 0 0012 24z" />
                  <path fill="#FBBC05" d="M5.58 14.45a7.21 7.21 0 010-4.9V6.35H1.32a11.983 11.983 0 000 11.3l4.26-3.2z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.95 11.95 0 0012 0 11.996 11.996 0 001.32 6.35l4.26 3.2c.9-2.72 3.43-4.73 6.42-4.73z" />
                </svg>
                Entrar com o Google
              </div>

              {/* Botão Real do Google (Invisível, mas mantém a lógica do clique) */}
              <div
                id="googleButton"
                className="h-14 w-full opacity-0 [&_iframe]:!w-full [&_iframe]:!h-14 cursor-pointer z-10"
              />
            </div>

            {/* LOADING STATE */}
            {(status === "loading-script" || status === "submitting") && (
              <div className="mt-6">
                <Button
                  disabled
                  className="
        h-14 w-full rounded-2xl bg-slate-900 text-base font-bold text-white
        shadow-[0_10px_30px_rgba(15,23,42,0.1)] backdrop-blur-sm
        transition-all duration-300
      "
                >
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-indigo-400" />
                  {status === "loading-script" ? "Preparando ambiente..." : "Autenticando..."}
                </Button>
              </div>
            )}

            {errorMessage && (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                {errorMessage}
              </div>
            )}

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
                    Utilizamos autenticação via Google para
                    oferecer uma experiência rápida, moderna e
                    protegida.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TERMS */}
          <div className="mt-8 text-center">
            <p className="text-sm leading-relaxed text-slate-400">
              Ao continuar, você concorda com os Termos de Uso e
              Política de Privacidade da Katallo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
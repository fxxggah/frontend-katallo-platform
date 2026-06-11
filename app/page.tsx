"use client";

import { KatalloFullLogo } from "@/components/brand/KatalloFullLogo";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Globe,
  Layout,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

// ======================================================
// HERO
// ======================================================

const Hero = () => (
  <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white pt-32 pb-20 lg:pt-44 lg:pb-32">
    {/* BACKGROUND */}
    <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2">
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-[120px]" />
      <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-violet-200/30 blur-[140px]" />
    </div>

    <div className="container mx-auto px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* BADGE */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-indigo-700 shadow-sm backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
          </span>

          Plataforma para vitrines online
        </div>

        {/* TITLE */}
        <h1 className="mb-8 text-5xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-7xl lg:text-8xl">
          Sua loja merece uma <br />
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
            presença digital.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
          A Katallo transforma seu catálogo em uma experiência moderna,
          organizada e pronta para vender pelo WhatsApp.
        </p>

        {/* BUTTONS */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/login">
          <button
            className="
              group flex w-full items-center justify-center gap-2
              rounded-2xl bg-slate-900
              px-8 py-5
              text-lg font-bold text-white
              shadow-[0_20px_50px_rgba(15,23,42,0.18)]
              transition-all duration-300
              hover:scale-[1.02]
              hover:bg-indigo-600
              sm:w-auto
            "
          >
            Começar Agora

            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          </a>

        </div>

        <div className="relative mt-24 w-full max-w-7xl">
          {/* PREMIUM GLOW */}
          <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-indigo-500/20 blur-[120px]" />

          {/* MAIN WINDOW */}
          <div
            className="
      relative overflow-hidden rounded-[2.8rem]
      border border-white/30
      bg-white/70
      shadow-[0_40px_120px_rgba(15,23,42,0.18)]
      backdrop-blur-2xl
    "
          >
            {/* LIGHT EFFECT */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_35%)]" />

            {/* TOPBAR */}
            <div
              className="
        relative flex items-center justify-between
        border-b border-slate-200/70
        bg-white/75 px-4 py-4
        backdrop-blur-xl md:px-8
      "
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-100/80 px-4 py-2 md:flex">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-xs font-semibold text-slate-500">
                    painel.katallo.com
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden h-11 w-52 items-center rounded-2xl border border-slate-200 bg-white px-4 lg:flex">
                  <div className="h-3 w-24 rounded-full bg-slate-200" />
                </div>

                {/* User */}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
                    <Store className="h-5 w-5" />
                  </div>

                  <div className="hidden text-left md:block">
                    <p className="text-xs font-black text-slate-900">
                      Katallo Store
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Premium Plan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="grid gap-6 bg-[#f8fafc] p-4 md:grid-cols-[260px_1fr] md:p-6">
              {/* SIDEBAR */}
              <div
                className="
          hidden rounded-[2rem]
          border border-slate-200/70
          bg-white/80 p-5
          backdrop-blur-xl md:block
        "
              >
                {/* STORE */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
                    <Store className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      Minha Loja
                    </p>

                    <p className="text-xs text-slate-500">
                      Painel Administrativo
                    </p>
                  </div>
                </div>

                {/* MENU */}
                <div className="space-y-2">
                  {[
                    {
                      name: "Dashboard",
                      active: true,
                    },
                    {
                      name: "Produtos",
                    },
                    {
                      name: "Categorias",
                    },
                    {
                      name: "Configurações",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`
                flex cursor-pointer items-center gap-3
                rounded-2xl px-4 py-3
                text-sm font-semibold transition-all duration-300
                ${item.active
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-500 hover:bg-slate-100"
                        }
              `}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${item.active ? "bg-white" : "bg-slate-300"
                          }`}
                      />

                      {item.name}
                    </div>
                  ))}
                </div>

                {/* BOTTOM CARD */}
                <div
                  className="
            mt-8 rounded-[1.8rem]
            bg-gradient-to-br from-slate-900 to-slate-800
            p-5 text-white
          "
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <Zap className="h-5 w-5 text-indigo-300" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Conversão
                      </p>

                      <h4 className="text-2xl font-black">
                        +32%
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300">
                    Seu catálogo está convertendo mais esta semana.
                  </p>
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="space-y-6">
                {/* HERO CARD */}
                <div
                  className="
            relative overflow-hidden rounded-[2rem]
            bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700
            p-8 text-white shadow-2xl
          "
                >
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                        <div className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                        Loja Online
                      </div>

                      <h2 className="mb-3 text-3xl font-black md:text-5xl">
                        Bem-vindo de volta 👋
                      </h2>

                      <p className="max-w-xl text-base leading-relaxed text-indigo-100 md:text-lg">
                        Seus produtos estão recebendo mais visitas hoje.
                        Continue aumentando sua conversão com uma experiência premium.
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "Visitas",
                          value: "12.4k",
                        },
                        {
                          label: "Produtos",
                          value: "324",
                        },
                        {
                          label: "Conversão",
                          value: "18%",
                        },
                        {
                          label: "Categorias",
                          value: "124",
                        },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="
                    rounded-2xl border border-white/10
                    bg-white/10 p-4
                    backdrop-blur-xl
                  "
                        >
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-100">
                            {stat.label}
                          </p>

                          <h4 className="text-2xl font-black">
                            {stat.value}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TOP CARDS */}
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Categorias",
                      value: "+124",
                      icon: <ShoppingBag className="h-5 w-5" />,
                    },
                    {
                      title: "Conversão",
                      value: "18%",
                      icon: <TrendingUp className="h-5 w-5" />,
                    },
                    {
                      title: "Produtos",
                      value: "324",
                      icon: <Store className="h-5 w-5" />,
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="
                rounded-[2rem]
                border border-slate-200/70
                bg-white/90 p-5
                shadow-sm backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
              "
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          {card.icon}
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          Online
                        </div>
                      </div>

                      <p className="mb-1 text-sm font-medium text-slate-500">
                        {card.title}
                      </p>

                      <h3 className="text-3xl font-black text-slate-900">
                        {card.value}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* PRODUCTS */}
                <div
                  className="
            rounded-[2rem]
            border border-slate-200/70
            bg-white/90 p-6
            backdrop-blur-xl
          "
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        Produtos em destaque
                      </h3>

                      <p className="text-sm text-slate-500">
                        Produtos mais visualizados hoje
                      </p>
                    </div>

                    <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                      Tempo real
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="
                  group rounded-[1.8rem]
                  border border-slate-200
                  bg-white p-4
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
                      >
                        {/* IMAGE */}
                        <div className="relative mb-4 aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.2),transparent_50%)]" />
                        </div>

                        {/* CONTENT */}
                        <div className="mb-2 h-4 w-2/3 rounded-full bg-slate-200" />

                        <div className="mb-5 h-3 w-1/2 rounded-full bg-slate-100" />

                        <div className="flex items-center justify-between">
                          <div className="h-8 w-20 rounded-xl bg-indigo-100" />

                          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                            Em estoque
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Visitas */}
                  <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <Zap className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-black text-slate-900">
                          Visitas
                        </h4>

                        <p className="text-sm text-slate-500">
                          Últimos 7 dias
                        </p>
                      </div>
                    </div>

                    <div className="flex h-44 items-end gap-3">
                      {[35, 55, 45, 80, 65, 100, 75].map((height, index) => (
                        <div
                          key={index}
                          className="
                    flex-1 rounded-t-[1rem]
                    bg-gradient-to-t from-indigo-500 to-violet-500
                    shadow-lg shadow-indigo-500/20
                  "
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CARD */}
          <div
            className="
      absolute -right-6 -bottom-6 hidden
      rounded-[2rem] border border-white/30
      bg-white/80 p-5 shadow-2xl
      backdrop-blur-2xl lg:block
    "
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 text-white shadow-lg">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Conversão
                </p>

                <h4 className="text-2xl font-black text-slate-900">
                  +32%
                </h4>
              </div>
            </div>

            <p className="max-w-[180px] text-sm font-medium leading-relaxed text-slate-500">
              Seu catálogo vende mais com uma experiência premium.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ======================================================
// PROBLEM
// ======================================================

const Problem = () => (
  <section className="bg-white py-24 md:py-32">
    <div className="container mx-auto px-6">
      <div className="mb-20 text-center">
        <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
          Vender online não <br />
          deve parecer amador.
        </h2>

        <p className="mx-auto max-w-xl text-lg font-medium text-slate-500">
          Sua loja merece uma presença moderna, organizada e feita para
          converter clientes.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "Vendas Perdidas",
            desc: "Clientes desistem por não encontrarem informações rapidamente.",
            icon: <Zap className="text-amber-500" />,
          },
          {
            title: "Trabalho Repetitivo",
            desc: "Seu catálogo responde dúvidas automaticamente.",
            icon: <Layout className="text-indigo-600" />,
          },
          {
            title: "Falta de Credibilidade",
            desc: "Uma loja organizada transmite confiança instantaneamente.",
            icon: <ShieldCheck className="text-emerald-600" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
              group rounded-[2rem]
              border border-transparent
              bg-slate-50 p-8
              transition-all duration-500
              hover:-translate-y-1
              hover:border-slate-100
              hover:bg-white
              hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]
              md:p-12
            "
          >
            <div
              className="
                mb-8 flex h-16 w-16 items-center justify-center
                rounded-2xl bg-white shadow-sm
                transition-transform duration-300
                group-hover:scale-110
                group-hover:rotate-3
              "
            >
              {item.icon}
            </div>

            <h3 className="mb-4 text-2xl font-black tracking-tight text-slate-900">
              {item.title}
            </h3>

            <p className="font-medium leading-relaxed text-slate-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ======================================================
// FEATURES
// ======================================================

const Features = () => (
  <section className="relative mx-4 my-8 overflow-hidden rounded-[2.5rem] bg-slate-900 py-24 text-white shadow-2xl md:rounded-[4rem] md:py-32">
    <div className="container mx-auto px-6 lg:px-10">
      <div className="grid items-center gap-20 lg:grid-cols-2">
        <div className="space-y-12">
          <div>
            <h2 className="mb-8 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Feito para quem{" "}
              <span className="italic text-indigo-400">
                vende rápido.
              </span>
            </h2>

            <p className="text-lg font-medium text-slate-400 md:text-xl">
              Tecnologia moderna com foco em conversão, experiência e velocidade.
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "Categorias Inteligentes",
                desc: "Organize produtos de forma visual e intuitiva.",
                icon: <Globe size={20} />,
              },
              {
                title: "Checkout via WhatsApp",
                desc: "Receba pedidos completos direto no WhatsApp.",
                icon: <ShoppingBag size={20} />,
              },
              {
                title: "Gestão Mobile First",
                desc: "Controle tudo diretamente pelo celular.",
                icon: <Smartphone size={20} />,
              },
            ].map((feature, index) => (
              <div key={index} className="group flex gap-6 md:gap-8">
                <div
                  className="
                    flex h-14 w-14 shrink-0 items-center justify-center
                    rounded-2xl border border-slate-700
                    bg-slate-800 text-indigo-400
                    transition-colors
                    group-hover:bg-indigo-600
                    group-hover:text-white
                  "
                >
                  {feature.icon}
                </div>

                <div>
                  <h4 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">
                    {feature.title}
                  </h4>

                  <p className="text-base leading-relaxed text-slate-400 md:text-lg">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-indigo-500/20 blur-[100px]" />

          <div
            className="
              relative overflow-hidden
              rounded-[3rem]
              border border-slate-700
              bg-gradient-to-b from-slate-800 to-slate-900
              p-6 shadow-2xl
            "
          >
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center gap-4 rounded-[2rem]
                    border border-slate-700
                    bg-white/5 p-4
                  "
                >
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400" />

                  <div className="flex-1">
                    <div className="mb-3 h-4 w-2/3 rounded-full bg-slate-600" />

                    <div className="mb-4 h-3 w-1/2 rounded-full bg-slate-700" />

                    <div className="flex items-center justify-between">
                      <div className="h-8 w-24 rounded-xl bg-indigo-500/20" />

                      <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                        Disponível
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ======================================================
// PAGE
// ======================================================

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${scrolled ? "py-3" : "py-5"
          }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`
              relative mx-auto flex items-center justify-between
              rounded-[28px] border transition-all duration-500
              ${scrolled
                ? "border-white/20 bg-white/75 px-4 py-3 shadow-[0_10px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:px-6 md:py-4"
                : "border-white/10 bg-white/40 px-4 py-4 backdrop-blur-xl md:px-8 md:py-5"
              }
            `}
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-r from-indigo-500/[0.03] via-violet-500/[0.04] to-indigo-500/[0.03]" />

            {/* LOGO */}
            <div className="relative z-10 flex shrink-0 items-center">
              <KatalloFullLogo priority />
            </div>

            {/* NAV */}
            <nav className="relative z-10 hidden items-center gap-1 lg:flex">
              {["Produtos", "Preços", "Sobre"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="
                    group relative px-5 py-3
                    text-[11px] font-black uppercase tracking-[0.22em]
                    text-slate-500 transition-all duration-300
                    hover:text-slate-900
                  "
                >
                  <span className="relative z-10">{item}</span>

                  <div
                    className="
                      absolute inset-0 scale-90 rounded-2xl
                      bg-white opacity-0 shadow-sm
                      transition-all duration-300
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  />

                  <div
                    className="
                      absolute bottom-1 left-1/2
                      h-[2px] w-0 -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r from-indigo-500 to-violet-500
                      transition-all duration-300
                      group-hover:w-8
                    "
                  />
                </a>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="relative z-10 flex items-center gap-3">
              <Link
                href="/login"
                className="
                  hidden text-sm font-bold text-slate-600
                  transition-colors duration-300
                  hover:text-slate-900 md:flex
                "
              >
                Entrar
              </Link>

              <Link href="/login">
                <button
                  className="
                    group relative overflow-hidden
                    rounded-2xl bg-slate-900
                    px-5 py-3 text-sm font-bold text-white
                    transition-all duration-300
                    hover:scale-[1.03]
                    hover:shadow-[0_15px_40px_rgba(79,70,229,0.35)]
                    active:scale-95 md:px-7 md:py-3.5
                  "
                >
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-r from-indigo-600 to-violet-600
                      opacity-0 transition-opacity duration-300
                      group-hover:opacity-100
                    "
                  />

                  <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                    <span className="hidden sm:block">
                      Criar Minha Loja
                    </span>

                    <span className="sm:hidden">
                      Entrar
                    </span>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Features />

        {/* CTA */}
        <section className="bg-white py-28 text-center md:py-40">
          <div className="container mx-auto px-6">
            <div
              className="
                relative mx-auto max-w-5xl overflow-hidden
                rounded-[2.5rem] border border-slate-100
                bg-slate-50 p-10
                md:rounded-[4rem] md:p-20 lg:p-32
              "
            >
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />

              <h2 className="relative z-10 mb-10 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                Pronta para elevar o <br />
                nível do seu negócio?
              </h2>
              <a href="/login">
              <button
                className="
                  relative z-10 rounded-[2rem]
                  bg-indigo-600 px-8 py-5
                  text-lg font-black text-white
                  shadow-[0_20px_50px_rgba(79,70,229,0.3)]
                  transition-all
                  hover:scale-105
                  hover:bg-indigo-700
                  active:scale-95
                  md:px-12 md:py-7 md:text-2xl
                "
              >
                Começar agora mesmo!
              </button>
              </a>
              <p className="relative z-10 mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Sem cartão de crédito • Setup em 2 minutos
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white py-20 md:py-24">
        <div className="container mx-auto grid gap-16 px-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative mb-8 h-10 w-40">
              <Image
                src="/brand/katallo-full.png"
                alt="Katallo"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="max-w-sm text-lg font-medium leading-relaxed text-slate-500">
              Elevando o padrão do comércio local com tecnologia moderna e
              design focado em conversão.
            </p>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
              Navegação
            </h4>

            <ul className="space-y-4 font-medium text-slate-500">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  Funcionalidades
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  Preços
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
              Suporte
            </h4>

            <ul className="space-y-4 font-medium text-slate-500">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  Central de Ajuda
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  WhatsApp
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-indigo-600"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-4 border-t border-slate-50 px-6 pt-8 md:flex-row">
          <p className="text-center text-sm font-medium text-slate-400 md:text-left">
            © 2026 Katallo Tecnologias Ltda. Todos os direitos reservados.
          </p>

          <div className="flex gap-4 md:gap-6">
            <div className="h-5 w-5 cursor-pointer rounded-full bg-slate-100 transition-colors hover:bg-indigo-100" />
            <div className="h-5 w-5 cursor-pointer rounded-full bg-slate-100 transition-colors hover:bg-indigo-100" />
            <div className="h-5 w-5 cursor-pointer rounded-full bg-slate-100 transition-colors hover:bg-indigo-100" />
          </div>
        </div>
      </footer>
    </div>
  );
}
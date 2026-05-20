import Link from "next/link";
import { ArrowLeft, Home, SearchX, Sparkles } from "lucide-react";
import { KatalloFullLogo } from "@/components/brand/KatalloFullLogo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Página não encontrada
        </div>

        <KatalloFullLogo priority />

        <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-muted-foreground">
          Erro 404
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Ops, essa página não existe ou saiu da vitrine.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          O link pode estar incorreto, a página pode ter sido removida ou o
          endereço digitado não existe mais na Katallo.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="h-12 w-full rounded-2xl px-6 font-bold shadow-sm sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Ir para o início
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-2xl border-border bg-card px-6 font-bold sm:w-auto"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-sm font-black text-foreground">
              Confira o endereço
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Veja se a URL foi digitada corretamente.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-sm font-black text-foreground">
              Volte uma página
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Retorne para onde estava navegando antes.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 text-left shadow-sm">
            <p className="text-sm font-black text-foreground">
              Acesse o início
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Recomece pela página principal da plataforma.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
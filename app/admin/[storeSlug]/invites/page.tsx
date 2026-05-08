"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";

import { inviteService } from "@/services/inviteService";
import type { StoreInviteResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function InvitesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [invites, setInvites] = useState<StoreInviteResponse[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInvites, setIsLoadingInvites] = useState(true);
  const [lastInviteLink, setLastInviteLink] = useState("");
  const [copiedId, setCopiedId] = useState<number | string | null>(null);

  async function load() {
    try {
      setIsLoadingInvites(true);
      const data = await inviteService.getStoreInvites(storeSlug);
      setInvites(data);
    } catch {
      toast.error("Erro ao carregar convites.");
    } finally {
      setIsLoadingInvites(false);
    }
  }

  async function handleCreate() {
    if (!email.trim()) return;

    try {
      setIsLoading(true);

      const invite = await inviteService.createInvite(storeSlug, {
        email: email.trim(),
      });

      const link = `${window.location.origin}/invite/accept?token=${invite.token}`;

      setLastInviteLink(link);
      setEmail("");

      await load();

      toast.success("Convite gerado com sucesso.");
    } catch {
      toast.error("Erro ao gerar convite.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyLink(link: string, id: number | string) {
    await navigator.clipboard.writeText(link);

    setCopiedId(id);
    toast.success("Link copiado.");

    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente cancelar este convite?")) return;

    try {
      await inviteService.cancelInvite(storeSlug, id);
      toast.success("Convite cancelado.");
      load();
    } catch {
      toast.error("Erro ao cancelar convite.");
    }
  }

  useEffect(() => {
    if (storeSlug) {
      load();
    }
  }, [storeSlug]);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <UserPlus className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Convites
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Gere links de convite para novos administradores acessarem o
              painel da loja.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
              <Clock size={12} />
              Convites expiram automaticamente
            </div>
          </div>
        </div>
      </header>

      <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                placeholder="email@exemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl border-slate-200 bg-slate-50/60 pl-11 text-base"
              />
            </div>

            <Button
              onClick={handleCreate}
              disabled={isLoading || !email.trim()}
              className="h-14 rounded-2xl bg-slate-900 px-8 font-bold"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Gerar convite
            </Button>
          </div>

          {lastInviteLink && (
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-700">
                  <ExternalLink size={12} />
                  Último link gerado
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyLink(lastInviteLink, "last")}
                  className="rounded-xl text-xs font-black text-indigo-700 hover:bg-indigo-100"
                >
                  {copiedId === "last" ? (
                    <Check className="mr-1 h-4 w-4" />
                  ) : (
                    <Copy className="mr-1 h-4 w-4" />
                  )}
                  Copiar
                </Button>
              </div>

              <p className="break-all rounded-2xl border border-white bg-white/80 p-4 font-mono text-sm text-slate-600">
                {lastInviteLink}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Convites pendentes
          </h2>

          <span className="text-xs font-bold text-slate-400">
            {invites.length} pendente{invites.length === 1 ? "" : "s"}
          </span>
        </div>

        {isLoadingInvites ? (
          <div className="flex justify-center rounded-3xl bg-white p-12">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : invites.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {invites.map((invite) => {
              const inviteLink = invite.token
                ? `${window.location.origin}/invite/accept?token=${invite.token}`
                : "";

              return (
                <Card
                  key={invite.id}
                  className="rounded-3xl border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-black text-slate-900">
                          {invite.email}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-slate-400">
                          <Clock size={13} />

                          <span className="text-xs font-medium">
                            Expira em{" "}
                            {new Date(invite.expiresAt).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </div>
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                        Pendente
                      </span>
                    </div>

                    <div className="mt-6 flex gap-2">
                      {inviteLink && (
                        <Button
                          variant="secondary"
                          className="h-11 flex-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                          onClick={() => handleCopyLink(inviteLink, invite.id)}
                        >
                          {copiedId === invite.id ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}

                          {copiedId === invite.id
                            ? "Copiado"
                            : "Copiar link"}
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        className="h-11 w-11 rounded-xl text-slate-300 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleDelete(invite.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[35vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <ShieldCheck className="mb-4 h-12 w-12 text-slate-200" />
            <h3 className="text-xl font-black text-slate-900">
              Nenhum convite pendente
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Quando você gerar convites, eles aparecerão aqui até serem aceitos
              ou cancelados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
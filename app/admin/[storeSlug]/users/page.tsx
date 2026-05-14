"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Crown,
  Loader2,
  Mail,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

import { userService } from "@/services/userService";
import type { StoreUserResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function UsersPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [users, setUsers] = useState<StoreUserResponse[]>([]);
  const [currentUser, setCurrentUser] = useState<StoreUserResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      setIsLoading(true);

      const [current, members] = await Promise.all([
        userService.getCurrentStoreUser(storeSlug),
        userService.getStoreUsers(storeSlug),
      ]);

      setCurrentUser(current);
      setUsers(members);
    } catch {
      toast.error("Erro ao carregar membros da equipe.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(userId: number) {
    if (currentUser?.role !== "OWNER") {
      toast.error("Apenas o proprietário pode remover membros.");
      return;
    }

    if (
      !confirm(
        "Tem certeza que deseja remover este membro? O acesso será revogado imediatamente."
      )
    ) {
      return;
    }

    try {
      await userService.removeStoreUser(storeSlug, userId);
      toast.success("Membro removido com sucesso.");
      load();
    } catch {
      toast.error("Não foi possível remover o usuário.");
    }
  }

  useEffect(() => {
    if (storeSlug) {
      load();
    }
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando equipe...
        </p>
      </div>
    );
  }

  const canRemoveMembers = currentUser?.role === "OWNER";

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Users className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Equipe
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Visualize quem tem acesso ao painel administrativo da loja.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100">
                  {users.length} membro{users.length === 1 ? "" : "s"}
                </Badge>

                <Badge className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50">
                  {currentUser?.role === "OWNER"
                    ? "Acesso proprietário"
                    : "Acesso administrador"}
                </Badge>
              </div>
            </div>
          </div>

          {currentUser?.role === "OWNER" && (
            <Button
              asChild
              className="h-12 rounded-xl bg-slate-900 px-6 font-bold"
            >
              <a href={`/admin/${storeSlug}/invites`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Convidar membro
              </a>
            </Button>
          )}
        </div>
      </header>

      {users.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => {
            const isOwner = user.role === "OWNER";
            const safeName = user.name || "Membro sem nome";

            const initials =
              safeName
                .split(" ")
                .filter(Boolean)
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "??";

            return (
              <Card
                key={user.userId}
                className="overflow-hidden rounded-3xl border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-lg font-black ${
                        isOwner
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {
                        (
                        initials
                      )}

                      {isOwner && (
                        <div className="absolute -right-1 -top-1 rounded-lg border-2 border-white bg-amber-500 p-1 text-white">
                          <Crown size={12} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-lg font-black text-slate-900">
                        {safeName}
                      </h2>

                      <div className="mt-1 flex min-w-0 items-center gap-1.5 text-slate-400">
                        <Mail size={13} />
                        <span className="truncate text-sm font-medium">
                          {user.email || "Email não informado"}
                        </span>
                      </div>

                      <Badge
                        className={`mt-3 rounded-full border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          isOwner
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-50"
                        }`}
                      >
                        {isOwner ? "Proprietário" : "Administrador"}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    {user.role !== "OWNER" && canRemoveMembers ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleRemove(user.userId)}
                        className="h-11 w-full rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover acesso
                      </Button>
                    ) : (
                      <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <ShieldCheck size={14} />
                        {isOwner ? "Acesso total" : "Acesso operacional"}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <Users className="mb-4 h-12 w-12 text-slate-200" />
          <h3 className="text-xl font-black text-slate-900">
            Nenhum membro encontrado
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Quando pessoas forem adicionadas à loja, elas aparecerão aqui.
          </p>
        </div>
      )}

      <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h4 className="text-lg font-black">Permissões da equipe</h4>

            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-300">
              Administradores podem gerenciar produtos e categorias. Apenas o
              proprietário pode remover membros, convidar novos acessos e
              alterar configurações sensíveis da loja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
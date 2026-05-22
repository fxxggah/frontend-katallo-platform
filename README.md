# 🛍️ Katallo — Plataforma de Catálogo Online para Lojas

A **Katallo** é uma plataforma de catálogo online desenvolvida para pequenas lojas que vendem apenas em loja física ou via WhatsApp.

O objetivo é transformar catálogos desorganizados em uma experiência moderna, rápida e profissional, permitindo que lojistas tenham sua própria vitrine digital com painel administrativo e identidade visual personalizada.

⚠️ **Status do projeto: Em desenvolvimento**

---

# 🚀 Visão do Projeto

A Katallo foi criada para resolver problemas reais enfrentados por pequenas lojas:

- clientes pedindo fotos repetidamente
- catálogo desorganizado
- dificuldade para encontrar produtos
- perda de vendas no WhatsApp

A plataforma funciona como:

- 🛒 catálogo digital
- 🏪 vitrine online
- 📲 gerador de leads para WhatsApp
- ⚙️ painel administrativo

---

# ✨ Funcionalidades Atuais

## Catálogo Público

- [x] Página inicial da loja
- [x] Listagem de produtos
- [x] Categorias
- [x] Página de produto
- [x] Busca e navegação
- [x] Carrinho local (frontend only)
- [x] Integração com WhatsApp
- [x] URLs amigáveis com slug

## Painel Administrativo

- [x] Dashboard da loja
- [x] Gerenciamento de produtos
- [x] Gerenciamento de categorias
- [x] Upload de imagens
- [x] Configurações da loja
- [x] Sistema de convites
- [x] Gestão de equipe

## Autenticação

- [x] Login com Google OAuth
- [x] JWT Authentication
- [x] Proteção de rotas administrativas
- [x] Controle de acesso por role (OWNER / ADMIN)

---

# 🧱 Stack Tecnológica

## Frontend

- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Radix UI
- Axios

## Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- MySQL

## Infraestrutura

- Frontend: Avaliando...
- Backend: Avaliando...
- Imagens: Cloudinary

---

# 🏪 Arquitetura Multi-Loja (Multi-Tenant)

A Katallo foi projetada desde o início pensando em evolução para SaaS.

Cada loja possui:

- catálogo próprio
- administradores próprios
- identidade visual própria
- template visual próprio
- URL própria baseada em slug

Exemplo:

```txt
katallo.com.br/botucatu-streetwear
```

---

# 🎨 Templates Personalizados

Atualmente a Katallo segue uma estratégia de **templates personalizados por cliente**, permitindo:

- maior flexibilidade visual
- entrega mais rápida do site
- validação do produto com clientes

A arquitetura já foi preparada para suportar templates reutilizáveis futuramente.

---

# 🔐 Autenticação

A autenticação é utilizada apenas no painel administrativo.

Método suportado:

- Google OAuth

Fluxo:

1. Usuário realiza login com Google
2. Frontend recebe o ID Token
3. Backend valida o token Google
4. Backend gera um JWT próprio
5. Frontend utiliza o JWT via Authorization Header

---

# 📂 Estrutura do Projeto

```txt
src/
├── app/
├── components/
├── contexts/
├── hooks/
├── lib/
├── public/
├── services/
├── styles/
├── templates/
├── types/
└── utils/
```

O projeto segue princípios de:

- componentização
- separação de responsabilidades
- arquitetura escalável
- consumo centralizado de API
- tipagem forte com TypeScript

---

# 📲 Fluxo de Compra

O sistema não processa pagamentos.

A compra acontece via WhatsApp:

1. Cliente adiciona produtos ao carrinho
2. Frontend gera uma mensagem estruturada
3. WhatsApp é aberto automaticamente
4. Cliente finaliza a compra diretamente com a loja

Exemplo:

```txt
Olá, gostaria de comprar:

1x Vestido Floral Azul - R$120
2x Blusa Branca - R$80

Total: R$280
```

---

# ⚡ Performance e SEO

A plataforma foi pensada com foco em:

- mobile-first
- carregamento rápido
- SEO otimizado
- imagens otimizadas
- URLs amigáveis
- boa experiência em dispositivos móveis

Boas práticas utilizadas:

- Next.js Image
- Lazy Loading
- Server Components
- generateMetadata()
- cache e revalidate

---

# 🔒 Segurança

Principais medidas aplicadas:

- autenticação JWT
- rotas protegidas
- validação de acesso por loja
- isolamento multi-tenant
- proteção por roles
- interceptors globais para tratamento de erros

---

# 🧠 Objetivos do Projeto

A Katallo possui três objetivos principais:

## 1️⃣ Resolver um problema real

Criar uma solução útil para pequenas lojas venderem via WhatsApp.

## 2️⃣ Evoluir para um SaaS

Estruturar uma base sólida para expansão futura.

## 3️⃣ Construir um projeto profissional

Aplicar boas práticas reais de engenharia de software, arquitetura e escalabilidade.

---

# 📌 Roadmap

## Curto Prazo

- [ ] Deploy oficial completo
- [ ] Melhorias de UI/UX
- [ ] Monitoramento com Sentry

## Médio Prazo

- [ ] Sistema de planos SaaS
- [ ] Domínio próprio por loja
- [ ] Templates reutilizáveis

## Longo Prazo

- [ ] Analytics com Google Analytics
- [ ] Sistema de assinatura
- [ ] Automação de onboarding

---

# ⚠️ Aviso

Este projeto ainda está em desenvolvimento e pode conter:

- funcionalidades incompletas
- mudanças frequentes
- possíveis bugs

Atualmente não é recomendado para produção em larga escala.

---

# 🤝 Contribuição

Sugestões, feedbacks e melhorias são bem-vindos.

---

# 📄 Licença

Este projeto é proprietário.

O uso, cópia, modificação ou distribuição deste software sem autorização prévia é proibido.

© 2026 Gabriel Oliveira. Todos os direitos reservados.

---

# 👨‍💻 Autor

Desenvolvido por Gabriel Oliveira.

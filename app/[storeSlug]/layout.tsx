import type { Metadata } from "next";
import type { ReactNode } from "react";
import StoreClientLayout from "@/components/store/StoreClientLayout";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    storeSlug: string;
  }>;
};

async function getStore(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stores/${slug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function generateMetadata(
  { params }: LayoutProps
): Promise<Metadata> {
  const { storeSlug } = await params;

  const store = await getStore(storeSlug);

  if (!store) { 
    return {
      title: "Loja não encontrada",
    };
  }

  return {
    title: store.name,

    description:
      store.description ??
      `Conheça os produtos da ${store.name}`,

    icons: {
      icon: [
        {
          url: store.favicon,
          type: "image/png",
        },
      ],
      shortcut: [
        {
          url: store.favicon,
        },
      ],
      apple: [
        {
          url: store.favicon,
        },
      ],
    },

    openGraph: {
      title: store.name,
      description:
        store.description ??
        `Conheça os produtos da ${store.name}`,
      images: store.logo
        ? [
          {
            url: store.logo,
          },
        ]
        : undefined,
    },
  };
}

export default async function StoreLayout({
  children,
  params,
}: LayoutProps) {
  const { storeSlug } = await params;

  return (
    <StoreClientLayout storeSlug={storeSlug}>
      {children}
    </StoreClientLayout>
  );
}
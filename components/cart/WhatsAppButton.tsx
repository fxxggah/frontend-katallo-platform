import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/utils/formatPrice";
import { analyticsService } from "@/services/analyticsService";

type WhatsAppButtonProps = {
  phone: string;
  productName: string;
  storeName: string;
  storeSlug: string;
  className?: string;
  size?: "default" | "lg";
};

export function WhatsAppButton({
  phone,
  productName,
  storeName,
  storeSlug,
  className,
  size = "default",
}: WhatsAppButtonProps) {
  const message = `Olá! Tenho interesse no produto "${productName}" que vi no site ${storeName}.`;
  const link = generateWhatsAppLink(phone, message);

  function handleClick() {
    analyticsService.registerWhatsappClick(storeSlug).catch((error) => {
      console.error("Erro ao registrar clique WhatsApp", error);
    });
  }

  return (
    <Button asChild variant="outline" size={size} className={className}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Comprar no WhatsApp
      </a>
    </Button>
  );
}
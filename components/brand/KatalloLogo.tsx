import Image from "next/image";
import Link from "next/link";

type KatalloLogoProps = {
  size?: number;
  clickable?: boolean;
  priority?: boolean;
  className?: string;
};

export function KatalloLogo({
  size = 100,
  clickable = true,
  priority = false,
  className = "",
}: KatalloLogoProps) {
  const logo = (
    <div
      className={`relative transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src="/brand/katallo-logo.png"
        alt="Katallo"
        fill
        priority={priority}
        className="object-contain select-none"
      />
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" aria-label="Katallo">
        {logo}
      </Link>
    );
  }

  return logo;
}
import Image from "next/image";
import Link from "next/link";

type KatalloFullLogoProps = {
  width?: number;
  height?: number;
  clickable?: boolean;
  priority?: boolean;
  className?: string;
};

export function KatalloFullLogo({
  width = 140,
  height = 44,
  clickable = true,
  priority = false,
  className = "",
}: KatalloFullLogoProps) {
  const logo = (
    <div
      className={`relative transition-all duration-300 ${className}`}
      style={{
        width,
        height,
      }}
    >
      <Image
        src="/brand/katallo-full.png"
        alt="Katallo"
        fill
        priority={priority}
        className="object-contain object-left"
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
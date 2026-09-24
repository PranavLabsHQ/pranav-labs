import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      aria-label="Pranav Labs home"
      className="inline-flex items-center gap-3 rounded-lg py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      href="/"
    >
      <Image
        alt=""
        className="h-9 w-9 object-contain"
        height={36}
        priority
        src="/brand/pranav-labs-mark.png"
        width={36}
      />
      {!compact ? (
        <span className="text-sm font-semibold text-neutral-950">
          Pranav Labs
        </span>
      ) : null}
    </Link>
  );
}

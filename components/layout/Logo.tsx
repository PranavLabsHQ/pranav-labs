import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      aria-label="Pranav Labs home"
      className="inline-flex items-center gap-3"
      href="/"
    >
      <Image
        alt=""
        className="h-8 w-8"
        height={32}
        priority
        src="/pranav-labs-icon.svg"
        width={32}
      />
      {!compact ? (
        <span className="text-sm font-semibold tracking-normal">
          Pranav Labs
        </span>
      ) : null}
    </Link>
  );
}

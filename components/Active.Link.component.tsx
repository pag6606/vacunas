import Link from "next/link";

interface ActiveLinkProps {
  href: string;
  styles?: string;
}

export default function ActiveLinkComponent({ href, styles }: ActiveLinkProps) {
  return <Link href={href} className={styles} />;
}

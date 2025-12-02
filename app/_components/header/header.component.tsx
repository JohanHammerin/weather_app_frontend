import Image from "next/image";
import LogoutButton from "../logout/LogoutButton";

export function Header() {
  return (
    <>
      <header className="flex items-center gap-4 p-3 bg-bakgrund">
        <Image
          src="/images/weather-logo-svg.svg"
          alt="Weather Logo"
          width={100}
          height={100}
          className="w-40 h-40"
          style={{ objectFit: "contain" }}
        />
      </header>
    </>
  );
}

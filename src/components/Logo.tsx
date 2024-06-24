import { cn } from "@/lib/utils";

interface LogoProps {
  size: "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

const Logo = ({ size }: LogoProps) => {
  return (
    <h1
      className={cn("font-bold", {
        "text-sm": size === "sm",
        "text-lg": size === "lg",
        "text-xl": size === "xl",
        "text-2xl": size === "2xl",
        "text-3xl": size === "3xl",
        "text-4xl": size === "4xl",
        "text-5xl": size === "5xl",
        "text-6xl": size === "6xl",
      })}
    >
      Insta<span className="text-primary">S</span>tore
    </h1>
  );
};

export default Logo;

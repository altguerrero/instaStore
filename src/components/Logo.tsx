import React from "react";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";

interface LogoProps {
  size: "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

const sizeMap = {
  sm: 16,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
  "4xl": 36,
  "5xl": 40,
  "6xl": 44,
};

const Logo = ({ size }: LogoProps) => {
  return (
    <div className="flex items-end gap-1">
      <ShoppingBasket size={sizeMap[size]} className="text-primary" />
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
    </div>
  );
};

export default Logo;

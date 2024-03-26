import React from "react";
import { Button } from "../ui/button";

interface CustomisedButtonProps {
  text?: string;
  onClick?: (e: any) => void | Promise<void>;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

function CustomisedButton({
  text,
  onClick,
  asChild,
  className,
  disabled,
  children,
}: CustomisedButtonProps) {
  return (
    <Button
      disabled={disabled}
      className={
        "bg-gradient-to-r from-emerald-600 via-emerald-800 to-emerald-500 text-white cursor-pointer hover:shadow-md hover:shadow-emerald-700 transform-gpu duration-300 " +
        className
      }
      onClick={onClick}
      asChild={asChild}
    >
      {children ? children : text}
    </Button>
  );
}

export default CustomisedButton;

"use client";

import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "../../../../components/ui/button";

interface CopyButtonProps {
  value?: string;
  className?: string;
}

export const CopyButton = ({ value, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    void navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      className={className}
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

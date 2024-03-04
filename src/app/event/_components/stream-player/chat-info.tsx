import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "~/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
}

export const ChatInfo = ({ isDelayed }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isDelayed) {
      return "Messages are delayed by 3 seconds";
    }

    return "";
  }, [isDelayed]);

  const label = useMemo(() => {
    if (isDelayed) {
      return "Slow mode";
    }

    return "";
  }, [isDelayed]);

  if (!isDelayed) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2 text-muted-foreground">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};

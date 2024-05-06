import { WifiOff } from "lucide-react";
import { type CustomStream } from ".";

interface OfflineVideoProps {
  username: string;
  stream: CustomStream;
}

export const OfflineVideo = ({ username, stream }: OfflineVideoProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">
        {username} está offline. O evento iniciará em breve às{" "}
        {stream.datetime.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

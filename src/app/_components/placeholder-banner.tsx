import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ShipWheel } from "lucide-react";

export const PlaceholderBanner = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Card className="flex h-52 w-full items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center font-bold md:text-lg lg:text-xl dark:text-gray-400 text-gray-600">
            {children}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ShipWheel } from 'lucide-react';

export const PlaceholderBanner = ({ text }: { text: string }) => {
  return (
    <>
      <Card className="flex h-52 w-full items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center font-bold md:text-xl lg:text-2xl">
						<div className="flex justify-center text-slate-300 animate-spin-slow mb-2">
							<ShipWheel size={'32px'}/>
						</div>
					</CardTitle>
          <CardDescription className="m-1 flex justify-center text-sm">
            {text}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

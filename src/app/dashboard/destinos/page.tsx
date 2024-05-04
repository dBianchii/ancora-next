import React from "react";
import { PlaceholderBanner } from "~/app/_components/placeholder-banner";

export default function DestinosPage() {
  return (
    <div className="h-full py-6 lg:border-l lg:pl-8">
      <div className="mb-2 flex items-center justify-between space-y-1 text-2xl font-semibold tracking-tight">
        <h2 className="">Destinos</h2>
      </div>
      <div className="space-y-4">
				<PlaceholderBanner text="Feature em desenvolvimento"/>
      </div>
    </div>
  );
}

import React from "react";

export default function DestinosPage() {
  return (
    <div className="h-full py-6 lg:border-l lg:pl-8">
      <div className="mb-2 flex items-center justify-between space-y-1 text-2xl font-semibold tracking-tight">
        <h2 className="">Destinos</h2>
      </div>
      <div className="space-y-4">
        <Card />
      </div>
    </div>
  );
}

const Card = () => {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-center gap-x-10">
        <p className="shrink-0 font-semibold animate-pulse">Feature em desenvolvimento</p>
      </div>
    </div>
  );
};

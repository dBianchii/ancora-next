"use client";

import { useEventsData } from "./hooks";
import { Users, Video } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Overview } from "../dashboard/_components/overview";
import { Engajados } from "../dashboard/_components/engajados";
import { howManyMonths } from "../dashboard/_components/metrics";

export function DashboardSection() {
  const { query } = useEventsData();
	const months = howManyMonths(query.data?.[0]?.datetime, query.data?.[query.data.length - 1]?.datetime);
	const totalEvents = query.data?.length ?? 0;
	const eventsPerMonthsAverage = months > 0 ? (totalEvents / months).toFixed(1) : 0;

  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
      <h2 className="mb-2 space-y-1 text-2xl font-semibold tracking-tight ">
        Dashboard
      </h2>
      <Tabs defaultValue="visao-geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visao-geral">Visão geral</TabsTrigger>
          <TabsTrigger value="por-evento">
            Por Evento
          </TabsTrigger>
        </TabsList>
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Eventos criados
                </CardTitle>
                <Video className="dark:text-primary" size={'20px'}/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{query.data?.length}</div>
                <p className="text-xs text-muted-foreground">
                  média de { eventsPerMonthsAverage } eventos criados por mês
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Participantes
                </CardTitle>
                <Users className="dark:text-primary" size={'20px'}/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3090</div>
                <p className="text-xs text-muted-foreground">
                  +11.1% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card> */}
          </div>
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"> */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Participantes / mês</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3 w-full">
              <CardHeader>
                <CardTitle>Participantes mais engajados</CardTitle>
                <CardDescription>
                  Quem mais participa dos eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Engajados />
              </CardContent>
            </Card>
          {/* </div> */}
        </TabsContent>
      </Tabs>
    </section>
  );
}

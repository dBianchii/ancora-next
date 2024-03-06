import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Skeleton } from "~/components/ui/skeleton";
import { getServerAuthSession } from "~/server/auth";
import { EventsSection } from "./_components/events-section";
import { getEvents } from "../server/actions/stream";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default async function HomePage() {
	const session = await getServerAuthSession();

	return (
		<main className="flex-1 py-8">
			<MaxWidthWrapper>
				{session ? (
					<Suspense fallback={LoggedInViewSkeleton()}>
						<LoggedInView />
					</Suspense>
				) : (
					<NotLoggedInView />
				)}
			</MaxWidthWrapper>
		</main>
	);
}

function LoggedInViewSkeleton() {
	return (
		<div className="gap-2">
			<h2 className="pb-4 text-2xl font-bold">Eventos</h2>
			<Skeleton className="h-6 w-24" />
			<Skeleton className="h-[200px] w-full" />{" "}
		</div>
	);
}

async function LoggedInView() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["events"],
		queryFn: getEvents,
	});

	return (
		<div className="gap-2">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<EventsSection />
			</HydrationBoundary>
		</div>
	);
}

function NotLoggedInView() {
	return (
		<>
			<div className='container max-w-[920px] flex flex-col items-center text-center gap-6 lg:gap-12 py-4 mb-4 sm:mt-6 md:mt-8 lg:mt-10'>
				<h1 className='text-4xl lg:text-6xl font-bold w-full'>
					A maneira mais fácil de fazer gravações e transmissões ao vivo
				</h1>
				<p className="max-w-[640px] text-base lg:text-lg">
					O StreamAnchor é um estúdio de gravações e transmissões ao vivo profissionais no seu navegador. Grave seu conteúdo ou transmita ao vivo para o Facebook, YouTube e outras plataformas.
				</p>
				<Button size="custom" className="text-base font-bold">Comece já: é grátis!</Button>
			</div>

			<div className="border-2 rounded-md container flex items-center justify-center min-h-[250px] md:h-[400px] lg:h-[612px] mx-auto">
				<h1>IMAGE / VIDEO</h1>
			</div>
		</>

	);
}

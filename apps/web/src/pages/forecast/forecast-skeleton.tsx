import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ForecastSkeleton() {
	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader className="flex justify-center items-center flex-row">
				<Skeleton className="h-8 w-40" />
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Skeleton className="h-52 w-full" />
					<div className="mt-6 lg:mt-0">
						<Skeleton className="h-8 w-48 mb-4" />
						<div className="grid grid-cols-6 gap-2">
							{[...Array(5)].map((_, i) => (
								<Skeleton key={i} className="h-20 w-16" />
							))}
						</div>
					</div>
				</div>
				<div className="mt-6">
					<Skeleton className="h-6 w-72 mb-4" />
					<div className="flex gap-4 mb-4">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-4 w-24" />
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
						{[...Array(8)].map((_, i) => (
							<Skeleton key={i} className="h-20 w-full" />
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

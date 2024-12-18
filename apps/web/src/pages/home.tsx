import { SearchCity } from '@/components/search-city';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-2">
			<div className="w-full max-w-sm mx-auto space-y-4">
				<SearchCity />
			</div>
		</main>
	);
}

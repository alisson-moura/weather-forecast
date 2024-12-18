import { getCitiesByName } from '@/api/get-cities-by-name';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import CityNotFound from './city-not-found';
import CityCard from './city-card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { SkeletonCard } from './skeleton-card';

export function SearchCity() {
	const [searchTerm, setSearchTerm] = useState('');
	const [showList, setShowList] = useState(false);

	const { data, error, isFetching, refetch } = useQuery({
		queryKey: [`city-${searchTerm}`],
		enabled: false,
		queryFn: async () => await getCitiesByName(searchTerm),
	});

	return (
		<div className="relative flex flex-col">
			<div className="flex gap-2">
				<Input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.currentTarget.value)}
					placeholder="Pesquisar cidade..."
				/>
				<Button
					disabled={isFetching}
					onClick={() => {
						refetch();
						setShowList(true);
					}}
				>
					{isFetching ? <Loader2 className="animate-spin" /> : <Search />}
				</Button>
			</div>
			<Dialog open={showList} onOpenChange={setShowList}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cidades</DialogTitle>
						<DialogDescription>
							Lista com cidades e bairros encontrados com o nome fornecido.
						</DialogDescription>
					</DialogHeader>
					{isFetching && <SkeletonCard />}
					{error && <CityNotFound />}
					{!isFetching && data && (
						<div className="space-y-2 h-96 overflow-y-auto">
							{data.map((city, index) => (
								<CityCard
									key={index}
									name={city.name}
									state={city.state}
									latitude={city.lat}
									longitude={city.lon}
									onAddToFavorites={() => {}}
								/>
							))}
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

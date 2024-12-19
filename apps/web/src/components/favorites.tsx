import { Heart, Loader2, Thermometer, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router';
import { useRemoveFavoriteCity } from '@/hooks/useRemoveFavorite';

export default function Favorites() {
	const { data } = useFavorites();
	const { isPending, mutate, variables } = useRemoveFavoriteCity();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<Heart className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cidades Favoritas</SheetTitle>
				</SheetHeader>
				<div className="mt-4 space-y-2">
					{data &&
						data.map((item) => (
							<div
								key={item.cityId}
								className="flex items-center justify-between p-2 bg-secondary rounded-md"
							>
								<span className="text-sm truncate font-medium">{item.city.name}</span>
								<div className="flex gap-2">
									<Button asChild size="sm" variant="outline">
										<Link to={`forecasts?lat=${item.city.lat}&lon=${item.city.lon}`}>
											Previsões
											<Thermometer className="h-4 w-4" />
										</Link>
									</Button>
									<Button
										disabled={isPending}
										onClick={() => mutate(item.cityId)}
										variant="ghost"
										size="icon"
									>
										{isPending && variables === item.cityId ? (
											<Loader2 className="animate-spin" />
										) : (
											<Trash className="text-destructive h-4 w-4" />
										)}
									</Button>
								</div>
							</div>
						))}
				</div>
			</SheetContent>
		</Sheet>
	);
}

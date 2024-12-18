import { Heart, Thermometer, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

export default function Favorites() {
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
					{[
						'São Paulo aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
						'Rio de Janeiro',
						'Belo Horizonte',
					].map((city) => (
						<div
							key={city}
							className="flex items-center justify-between p-2 bg-secondary rounded-md"
						>
							<span className="text-sm truncate font-medium">{city}</span>
							<div className="flex gap-2">
								<Button size="sm" variant="outline">
									Previsões
									<Thermometer className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<Trash className="text-destructive h-4 w-4" />
								</Button>
							</div>
						</div>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}

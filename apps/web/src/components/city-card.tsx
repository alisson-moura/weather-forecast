import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, ThermometerSun, Star } from 'lucide-react';
import { Link } from 'react-router';

interface CityCardProps {
	name: string;
	state: string;
	latitude?: number;
	longitude?: number;
	onAddToFavorites: () => void;
}

export default function CityCard(props: CityCardProps) {
	return (
		<Card className="w-full  overflow-hidden">
			<div className="flex flex-col ">
				<CardContent className="flex-1 p-4">
					<div className="flex items-end justify-between">
						<div>
							<h2 className="text-2xl font-bold mb-2">{props.name}</h2>
							<p className="text-muted-foreground mb-4">{props.state}</p>
						</div>
						<MapPin className="text-muted-foreground" />
					</div>
					<div className="space-y-1">
						<p className="text-sm">
							<span className="font-medium">Latitude:</span> {props.latitude}
						</p>
						<p className="text-sm">
							<span className="font-medium">Longitude:</span> {props.longitude}
						</p>
					</div>
				</CardContent>
				<CardFooter className="z-10 flex flex-col justify-center gap-4 p-4 bg-muted">
					<Button asChild className="w-full">
						<Link to={`/forecast?lat=${props.latitude}&lon=${props.longitude}`}>
							<ThermometerSun className="mr-2 h-4 w-4" />
							Ver Previsões
						</Link>
					</Button>
					<Button onClick={props.onAddToFavorites} variant="outline" className="w-full">
						<Star className="mr-2 h-4 w-4" />
						Adicionar aos favoritos
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}
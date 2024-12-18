import { User } from 'lucide-react';
import { Button } from './ui/button';
import Favorites from './favorites';
import { SearchCity } from './search-city';

export default function Header() {
	return (
		<header className="bg-background border-b p-4">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="text-2xl font-bold">Weather Forecast</h1>
				<div className="flex-1 max-w-md mx-4">
					<SearchCity />
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="ghost" size="icon">
						<User className="h-5 w-5" />
					</Button>
					<Favorites />
				</div>
			</div>
		</header>
	);
}

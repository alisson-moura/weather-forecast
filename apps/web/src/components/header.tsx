import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import Favorites from './favorites';
import { SearchCity } from './search-city';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';
import { useLoggedUser } from '@/hooks/useGetUser';
import { Skeleton } from './ui/skeleton';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
	const { data: user, isLoading } = useLoggedUser();
	const queryClient = useQueryClient();
	const { logout, token } = useAuth();

	const handleLogout = () => {
		queryClient.invalidateQueries({
			queryKey: [`user-${token}`],
		});
		logout();
	};

	return (
		<header className="bg-background border-b p-4">
			<div className="container flex items-center justify-around mx-auto">
				<Link to="/">
					<h1 className="sm:block hidden text-2xl font-bold">Weather Forecast</h1>
				</Link>
				<div className="flex-1 max-w-md mx-4">
					<SearchCity />
				</div>
				{isLoading ? (
					<div className="flex items-center space-x-2">
						<Skeleton className="w-12 h-8" />
						<Skeleton className="w-8 h-8" />
					</div>
				) : (
					<div className="flex items-center space-x-2">
						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm">
										<User />
										Perfil
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Seu Pefil</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>{user.name}</DropdownMenuItem>
									<DropdownMenuItem>{user.email}</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleLogout} className="text-destructive">
										Sair
										<LogOut className="h-4 w-4 ml-auto" />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button asChild variant="outline" size="sm">
								<Link to="auth">Login</Link>
							</Button>
						)}
						{user && <Favorites />}
					</div>
				)}
			</div>
		</header>
	);
}

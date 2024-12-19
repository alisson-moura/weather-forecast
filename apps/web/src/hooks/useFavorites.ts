import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { getFavoriteCities } from '@/api/get-favorites';

export function useFavorites() {
	const { token } = useAuth();
	return useQuery({
		queryKey: [`favorites-${token}`],
		queryFn: async () => getFavoriteCities(token!),
		enabled: !!token,
		staleTime: 1000 * 60 * 5, // 5 minutos
	});
}

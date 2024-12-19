import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavoriteCity } from '@/api/remove-favorite';
import { useAuth } from './useAuth';

export function useRemoveFavoriteCity() {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (cityId: number) => removeFavoriteCity(token!, cityId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [`favorites-${token}`],
			});
		},
		onError: (error: Error) => {
			alert(error.message);
		},
	});
}

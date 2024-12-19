import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavoriteCity, FavoriteCityRequest } from '@/api/add-favorite';
import { useAuth } from './useAuth';

export function useAddFavoriteCity() {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (city: FavoriteCityRequest) => addFavoriteCity({ token, city }),
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

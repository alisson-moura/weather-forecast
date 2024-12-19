import { useQuery } from '@tanstack/react-query';
import { getProfile, UserProfile } from '@/api/get-profile';
import { useAuth } from './useAuth';

export function useLoggedUser() {
	const { token } = useAuth();

	return useQuery<UserProfile, Error>({
		queryKey: [`user-${token}`],
		queryFn: async () => await getProfile(token!),
		enabled: !!token,
	});
}

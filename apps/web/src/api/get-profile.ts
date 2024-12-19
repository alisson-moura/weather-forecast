export interface UserProfile {
	id: string;
	name: string;
	email: string;
}

export async function getProfile(token: string): Promise<UserProfile> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Erro ao obter o perfil do usuário.');
	}

	return response.json();
}

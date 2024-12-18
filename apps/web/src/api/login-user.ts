export interface LoginResponse {
	access_token: string;
}

export async function loginUser(input: { email: string; password: string }): Promise<string> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		if (response.status === 401) {
			throw new Error('Credenciais inválidas.');
		}
		throw new Error('Erro desconhecido.');
	}

	const data: LoginResponse = await response.json();
	return data.access_token;
}

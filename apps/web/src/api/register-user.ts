export interface RegisterResponse {
	message: string;
	statusCode: number;
	error: string;
}

export async function registerUser(input: {
	name: string;
	email: string;
	password: string;
}): Promise<void> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		const errorData: RegisterResponse = await response.json();
		throw new Error(errorData.message || 'Erro desconhecido.');
	}
}

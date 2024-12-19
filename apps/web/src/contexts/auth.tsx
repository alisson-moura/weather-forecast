import { createContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthContextType {
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

	const login = (token: string) => {
		setToken(token);
		localStorage.setItem('token', token);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	useEffect(() => {
		if (token) {
			const decoded: JwtPayload = jwtDecode(token);
			const expirationTime = decoded.exp ? decoded.exp * 1000 : 0;

			if (Date.now() >= expirationTime) {
				logout();
			} else {
				// Agendar o logout automático
				const timeout = setTimeout(logout, expirationTime - Date.now());
				return () => clearTimeout(timeout);
			}
		}
	}, [token]);

	return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth';
import Home from './pages/home';
import Forecast from './pages/forecast';
import { Auth } from './pages/auth';
import Layout from './pages/layout';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="forecasts" element={<Forecast />} />
							<Route path="auth" element={<Auth />} />
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);

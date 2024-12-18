import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import Forecast from './pages/forecast';
import { Auth } from './pages/auth';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/forecast" element={<Forecast />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);

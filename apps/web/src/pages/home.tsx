import { Search, Cloud, Star, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router';

export default function Home() {
	return (
		<div className="flex flex-col items-center">
			<div className="container p-4">
				<section className="text-center mb-12">
					<h2 className="text-4xl font-bold text-primary mb-4">Bem-vindo ao Weather Forecast</h2>
					<p className="text-xl text-muted-foreground mb-8">
						Sua fonte confiável para previsões meteorológicas precisas e personalizadas.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-center">
									<Search className="mr-2" /> Pesquise Cidades
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Encontre previsões para qualquer cidade do mundo com nossa busca fácil e rápida.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-center">
									<Star className="mr-2" /> Salve Favoritos
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Mantenha suas cidades favoritas sempre à mão para acesso rápido às previsões.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-center">
									<Calendar className="mr-2" /> Previsão de 5 Dias
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Planeje sua semana com nossas previsões detalhadas para os próximos 5 dias.
								</p>
							</CardContent>
						</Card>
					</div>

					<Card className="bg-primary text-primary-foreground">
						<CardHeader>
							<CardTitle className="flex items-center justify-center text-2xl">
								<User className="mr-2" /> Crie sua conta gratuitamente
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-4">
								Cadastre-se agora para personalizar sua experiência e acessar recursos exclusivos!
							</p>
							<Button variant="secondary">
								<Link to="auth?tab=register">Cadastrar</Link>
							</Button>
						</CardContent>
					</Card>
				</section>

				<section className="mb-12">
					<h3 className="text-2xl font-bold mb-4 text-primary">Exemplo de Previsão</h3>
					<Card>
						<CardHeader>
							<CardTitle>São Paulo - Hoje</CardTitle>
							<CardDescription>Atualizado às 14:00</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-between items-center">
							<div>
								<p className="text-4xl font-bold">23°C</p>
								<p className="text-xl text-muted-foreground">Parcialmente nublado</p>
							</div>
							<Cloud className="h-16 w-16 text-primary" />
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from './register-form';
import { LoginForm } from './login-form';

export function Auth() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Tabs defaultValue="login" className="w-[400px] p-2">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Cadastro</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>
								Faça login para acompanhar as previsões das suas cidades favoritas
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<LoginForm />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card>
						<CardHeader>
							<CardTitle>Cadastro</CardTitle>
							<CardDescription>Forneça seus dados para poder se cadastrar.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<RegisterForm />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { loginUser } from '@/api/login-user';

const loginFormSchema = z.object({
	email: z.string().email('E-mail inválido. Insira um endereço de e-mail válido.'),
	password: z
		.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres.')
		.max(50, 'A senha deve ter no máximo 50 caracteres.'),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export function LoginForm() {
	const { mutate, isPending, error } = useMutation({
		mutationFn: async (input: LoginFormInput) => await loginUser(input),
	});
	const form = useForm<LoginFormInput>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(input: LoginFormInput) {
		mutate(input);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Algo deu errado com o seu login.</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input type="email" placeholder="exemplo@mail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type="password" placeholder="******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} className="w-full" type="submit">
					{isPending ? (
						<span className="flex justify-center items-center">
							<Loader2 className="animate-spin mr-2" /> Enviando
						</span>
					) : (
						'Entrar'
					)}
				</Button>
			</form>
		</Form>
	);
}

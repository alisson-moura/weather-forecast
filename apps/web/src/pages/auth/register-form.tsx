import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/register-user';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const registerFormSchema = z.object({
	email: z.string().email('E-mail inválido. Insira um endereço de e-mail válido.'),

	name: z
		.string()
		.min(2, 'O nome deve ter pelo menos 2 caracteres.')
		.max(100, 'O nome deve ter no máximo 100 caracteres.'),

	password: z
		.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres.')
		.max(50, 'A senha deve ter no máximo 50 caracteres.'),
});

type RegisterFormInput = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
	const { mutate, isPending, isSuccess, error } = useMutation({
		mutationFn: async (input: RegisterFormInput) => await registerUser(input),
	});
	const form = useForm<RegisterFormInput>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
		},
	});

	function onSubmit(input: RegisterFormInput) {
		mutate(input);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{isSuccess && (
					<Alert variant="default" className="border-green-500 text-green-500">
						<CheckCircle2 className="h-4 w-4 stroke-green-500" />
						<AlertTitle>Tudo certo com seu cadastro.</AlertTitle>
						<AlertDescription>
							Seu cadastro foi um sucesso, agora é só realizar login.
						</AlertDescription>
					</Alert>
				)}
				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Algo deu errado com o seu cadastro.</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>Seu nome completo.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input type="email" placeholder="exemplo@mail.com" {...field} />
							</FormControl>
							<FormDescription>E-mail que será utilizado para realizar login.</FormDescription>
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
						'Cadastrar'
					)}
				</Button>
			</form>
		</Form>
	);
}

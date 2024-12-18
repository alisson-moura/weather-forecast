import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function CityNotFound({ message }: { message?: string }) {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Erro ao buscar</AlertTitle>
			<AlertDescription>{message ?? 'Não encontramos uma cidade com esse nome.'}</AlertDescription>
		</Alert>
	);
}

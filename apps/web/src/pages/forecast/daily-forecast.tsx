import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { WeatherIcon } from './weather-icon';

interface DailyForecastProps {
	dt_txt: string;
	icon: string;
	temp: number;
}

export function DailyForecast(props: DailyForecastProps) {
	const date = new Date(props.dt_txt);
	return (
		<div className="flex flex-col items-center p-2">
			<span className="text-sm font-semibold">{format(date, 'eeeeee', { locale: ptBR })}</span>
			<WeatherIcon icon={props.icon} />
			<div className="text-sm">
				<span className="font-medium">{Math.round(props.temp)}°C</span>
			</div>
		</div>
	);
}

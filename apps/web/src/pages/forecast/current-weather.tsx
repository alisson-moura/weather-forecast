import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { WeatherIcon } from './weather-icon';
import { Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
	dt_txt: string;
	temp: number;
	humidity: number;
	wind_speed: number;
	weather: {
		description: string;
		icon: string;
	};
}

export function CurrentWeather(props: CurrentWeatherProps) {
	const date = new Date(props.dt_txt.replace(' ', 'T'));

	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex flex-col items-center">
				<span className="text-lg font-semibold">
					{format(date, 'EEEE', { locale: ptBR }).toLocaleUpperCase()}
				</span>
				<span className="text-sm text-gray-500">
					{format(date, "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}
				</span>
			</div>
			<span className="text-6xl font-bold">{Math.round(props.temp)}°C</span>
			<div className="flex items-center space-x-2">
				<WeatherIcon icon={props.weather.icon} />
				<span>{props.weather.description}</span>
			</div>
			<div className="flex gap-4">
				<div className="flex items-center">
					<Droplets className="h-5 w-5 mr-1" />
					<span>{props.humidity}%</span>
				</div>
				<div className="flex items-center">
					<Wind className="h-5 w-5 mr-1" />
					<span>{props.wind_speed} m/s</span>
				</div>
			</div>
		</div>
	);
}

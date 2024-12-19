import { format, parseISO } from 'date-fns';
import { WeatherIcon } from './weather-icon';

interface WeatherCardProps {
	dt_txt: string;
	temp: number;
	description: string;
	icon: string;
}

export function WeatherCard(props: WeatherCardProps) {
	return (
		<div className="flex flex-col items-center p-2 border rounded">
			<span className="font-semibold">{format(parseISO(props.dt_txt), 'HH:mm')}</span>
			<WeatherIcon icon={props.icon} />
			<span className="text-lg font-medium">{Math.round(props.temp)}°C</span>
			<span className="text-xs text-center text-gray-500">{props.description}</span>
		</div>
	);
}

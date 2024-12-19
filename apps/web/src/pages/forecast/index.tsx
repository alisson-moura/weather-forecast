import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { getForecasts, List } from '@/api/get-forecasts';
import { useSearchParams } from 'react-router';
import { CurrentWeather } from './current-weather';
import { DailyForecast } from './daily-forecast';
import { WeatherCard } from './weather-card';
import { ForecastSkeleton } from './forecast-skeleton';

export default function Forecast() {
	const [searchParams] = useSearchParams();
	const [selectedDay, setSelectedDay] = useState<string>('');
	const lat = parseFloat(searchParams.get('lat') ?? '0');
	const lon = parseFloat(searchParams.get('lon') ?? '0');

	const { data: forecasts, isLoading } = useQuery({
		queryKey: [`forecast-${lat}-${lon}`],
		queryFn: async () =>
			await getForecasts({
				lat,
				lon,
			}),
	});

	useEffect(() => {
		if (forecasts) {
			setSelectedDay(forecasts.list[0].dt_txt);
		}
	}, [forecasts]);

	if (!forecasts || isLoading) {
		return <ForecastSkeleton />;
	}

	const nextDays = (list: List[]): List[] => {
		return list.reduce<List[]>((acc, item) => {
			const dateKey = item.dt_txt.split(' ')[0];
			const alreadyExists = acc.some((entry) => entry.dt_txt.startsWith(dateKey));
			if (!alreadyExists) {
				acc.push(item);
			}
			return acc;
		}, []);
	};

	const selectedDayForecasts = forecasts.list.filter((f) =>
		f.dt_txt.startsWith(selectedDay.split(' ')[0]),
	);
	const maxTemp = Math.max(...selectedDayForecasts.map((f) => Math.round(f.temp)));
	const minTemp = Math.min(...selectedDayForecasts.map((f) => Math.round(f.temp)));

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader className="flex justify-center items-center flex-row">
				<CardTitle className="flex-1 mr-auto text-2xl text-center font-bold">
					{forecasts.city.name}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<CurrentWeather
						dt_txt={forecasts.list[0].dt_txt}
						humidity={forecasts.list[0].humidity}
						temp={forecasts.list[0].temp}
						wind_speed={forecasts.list[0].wind_speed}
						weather={{
							icon: forecasts.list[0].weather[0].icon,
							description: forecasts.list[0].weather[0].description,
						}}
					/>
					<div className="mt-6 lg:mt-0">
						<h3 className="text-xl font-semibold mb-4">Previsão para os próximos dias</h3>
						<div className="grid grid-cols-6 gap-2">
							{nextDays(forecasts.list).map((item) => (
								<button
									key={item.dt_txt}
									onClick={() => setSelectedDay(item.dt_txt)}
									className={`focus:outline-none ${
										item.dt_txt === selectedDay ? 'bg-foreground text-primary-foreground' : ''
									}`}
								>
									<DailyForecast
										dt_txt={item.dt_txt}
										icon={item.weather[0].icon}
										temp={item.temp}
									/>
								</button>
							))}
						</div>
					</div>
				</div>
				<div className="mt-6">
					<h3 className="text-xl font-semibold">
						Previsões para{' '}
						{selectedDay && format(new Date(selectedDay), "EEEE, d 'de' MMMM", { locale: ptBR })}
					</h3>
					<div className="flex gap-4 mb-4">
						<span className="text-sm">
							Máxima de <b>{maxTemp}ºC</b>
						</span>
						<span className="text-sm">
							Mínima de <b>{minTemp}ºC</b>
						</span>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
						{selectedDayForecasts.map((forecast) => (
							<WeatherCard
								key={forecast.dt_txt}
								description={forecast.weather[0].description}
								dt_txt={forecast.dt_txt}
								icon={forecast.weather[0].icon}
								temp={forecast.temp}
							/>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

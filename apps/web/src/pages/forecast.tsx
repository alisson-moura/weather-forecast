import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Star, Wind } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { getForecasts, List } from '@/api/get-forecasts';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { useSearchParams } from 'react-router';

const WeatherIcon = ({ icon }: { icon: string }) => {
	return (
		<img
			src={`https://openweathermap.org/img/wn/${icon}.png`}
			className="h-12 w-12 brightness-50"
		/>
	);
};

const DailyForecast = ({ day, forecasts }: { day: Date; forecasts: List[] }) => {
	const dayForecasts = forecasts.filter((f) => f.dt_txt.startsWith(format(day, 'yyyy-MM-dd')));
	const averageTemp = dayForecasts.reduce((sum, f) => sum + f.temp, 0) / dayForecasts.length;
	const mainWeather = dayForecasts[Math.floor(dayForecasts.length / 2)].weather[0];

	return (
		<div className="flex flex-col items-center p-2">
			<span className="text-sm font-semibold">{format(day, 'EEE', { locale: ptBR })}</span>
			<WeatherIcon icon={mainWeather.icon} />
			<div className="text-sm">
				<span className="font-medium">{Math.round(averageTemp)}°C</span>
			</div>
		</div>
	);
};

export default function Forecast() {
	const [searchParams] = useSearchParams();
	const lat = parseFloat(searchParams.get('lat') ?? '0');
	const lon = parseFloat(searchParams.get('lon') ?? '0');

	const { data: forecasts } = useQuery({
		queryKey: [`forecast-${lat}-${lon}`],
		queryFn: async () =>
			await getForecasts({
				lat,
				lon,
			}),
	});
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	if (!forecasts) {
		return <h1>Loading</h1>;
	}

	const currentWeather = forecasts && forecasts.list[0];
	const next5Days = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

	const selectedDayForecasts = forecasts.list.filter((f) =>
		f.dt_txt.startsWith(format(selectedDay, 'yyyy-MM-dd')),
	);

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<Card className="w-full max-w-4xl mx-auto">
					<CardHeader className="flex justify-center items-center flex-row">
						<CardTitle className="flex-1 mr-auto text-2xl text-center font-bold">
							{forecasts.city.name}
						</CardTitle>
						<Button size="icon" variant="outline">
							<Star />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="flex flex-col items-center space-y-4">
								<div className="text-center">
									<div className="text-lg font-semibold">
										{format(currentDateTime, 'EEEE', { locale: ptBR })}
									</div>
									<div className="text-sm text-gray-500">
										{format(currentDateTime, "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}
									</div>
								</div>
								<div className="text-6xl font-bold">{Math.round(currentWeather.temp)}°C</div>
								<div className="flex items-center space-x-2">
									<WeatherIcon icon={currentWeather.weather[0].icon} />
									<span>{currentWeather.weather[0].description}</span>
								</div>
								<div className="flex space-x-4">
									<div className="flex items-center">
										<Droplets className="h-5 w-5 mr-1" />
										<span>{currentWeather.humidity}%</span>
									</div>
									<div className="flex items-center">
										<Wind className="h-5 w-5 mr-1" />
										<span>{currentWeather.wind_speed} m/s</span>
									</div>
								</div>
							</div>

							<div className="mt-6 lg:mt-0">
								<h3 className="text-xl font-semibold mb-4">Previsão para os próximos dias</h3>
								<div className="grid grid-cols-5 gap-2">
									{next5Days.map((day, index) => (
										<button
											key={index}
											onClick={() => setSelectedDay(day)}
											className={`focus:outline-none ${day.toDateString() === selectedDay.toDateString() ? 'bg-foreground text-primary-foreground' : ''}`}
										>
											<DailyForecast day={day} forecasts={forecasts.list} />
										</button>
									))}
								</div>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-xl font-semibold">
								Previsões para {format(selectedDay, "EEEE, d 'de' MMMM", { locale: ptBR })}
							</h3>
							<div className="flex gap-4 mb-4">
								<span className="text-sm">
									Maxima de{' '}
									<b>
										{Math.max(...selectedDayForecasts.map((forecast) => Math.round(forecast.temp)))}
										ºC
									</b>
								</span>
								<span className="text-sm">
									Minima de{' '}
									<b>
										{Math.min(...selectedDayForecasts.map((forecast) => Math.round(forecast.temp)))}
										ºC
									</b>
								</span>
							</div>

							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
								{selectedDayForecasts.map((forecast, index) => (
									<div key={index} className="flex flex-col items-center p-2 border rounded">
										<span className="font-semibold">
											{format(parseISO(forecast.dt_txt), 'HH:mm')}
										</span>
										<WeatherIcon icon={forecast.weather[0].icon} />
										<span className="text-lg font-medium">{Math.round(forecast.temp)}°C</span>
										<span className="text-xs text-center text-gray-500">
											{forecast.weather[0].description}
										</span>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

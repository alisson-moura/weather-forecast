export const WeatherIcon = ({ icon }: { icon: string }) => {
	return (
		<img
			src={`${import.meta.env.VITE_ICON_URL}/${icon}.png`}
			className="sm:h-12 sm:w-12  h-8 w-8 brightness-50"
		/>
	);
};

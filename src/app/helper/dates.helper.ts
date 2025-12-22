export const dateGenerateToString = () => {
	return new Date().toISOString();
};

export const dateParseToTimeLocal = (dateString: string) => {
	const date = new Date(dateString);
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const timeLocal = date.toLocaleString("es-AR", {
		timeZone,
	});

	return timeLocal.split(",")[0];
};

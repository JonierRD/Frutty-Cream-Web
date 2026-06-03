document.addEventListener('DOMContentLoaded', () => {
	const mapElement = document.querySelector('#aboutMap');

	if (!mapElement || !window.L) return;

	const fruttyCreamLocation = [1.1493, -76.6479];
	const map = window.L.map(mapElement, {
		scrollWheelZoom: false,
	}).setView(fruttyCreamLocation, 16);

	window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; OpenStreetMap contributors',
	}).addTo(map);

	window.L.marker(fruttyCreamLocation)
		.addTo(map)
		.bindPopup('<strong>Frutty Cream</strong><br>B/ La Independencia, Mocoa')
		.openPopup();
});

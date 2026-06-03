document.addEventListener('DOMContentLoaded', () => {
	const favoritesKey = 'fruttyCreamFavorites';
	const flavorKey = 'fruttyCreamFavoriteFlavor';

	const getFavorites = () => {
		try {
			return JSON.parse(localStorage.getItem(favoritesKey)) ?? [];
		} catch {
			return [];
		}
	};

	const saveFavorites = (favorites) => {
		localStorage.setItem(favoritesKey, JSON.stringify(favorites));
	};

	const normalizeName = (name) => name.trim().toLowerCase();
	const favoriteCards = document.querySelectorAll('.product-menu-card, .flavor-menu-card, [data-favorite-item]');

	const createFavoriteButton = (name) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'btn favorite-toggle';
		button.setAttribute('aria-pressed', 'false');

		const updateButton = () => {
			const favorites = getFavorites();
			const isFavorite = favorites.some((favorite) => normalizeName(favorite) === normalizeName(name));
			button.classList.toggle('is-favorite', isFavorite);
			button.setAttribute('aria-pressed', String(isFavorite));
			button.textContent = isFavorite ? 'Quitar favorito' : 'Agregar favorito';
		};

		button.addEventListener('click', () => {
			const favorites = getFavorites();
			const exists = favorites.some((favorite) => normalizeName(favorite) === normalizeName(name));
			const nextFavorites = exists
				? favorites.filter((favorite) => normalizeName(favorite) !== normalizeName(name))
				: [...favorites, name];

			saveFavorites(nextFavorites);
			updateButton();
		});

		updateButton();
		return button;
	};

	favoriteCards.forEach((card) => {
		const title = card.dataset.favoriteItem || card.querySelector('.card-title, h3')?.textContent;
		const target = card.querySelector('.card-body') || card.querySelector('div') || card;

		if (!title || target.querySelector('.favorite-toggle')) return;
		target.appendChild(createFavoriteButton(title));
	});

	const flavorForm = document.querySelector('#favoriteFlavorForm');
	const flavorSelect = document.querySelector('#favoriteFlavor');
	const flavorStatus = document.querySelector('#favoriteFlavorStatus');
	const clearFlavor = document.querySelector('#clearFavoriteFlavor');

	const showFlavorStatus = () => {
		if (!flavorStatus) return;
		const savedFlavor = localStorage.getItem(flavorKey);
		flavorStatus.textContent = savedFlavor
			? `Tu sabor favorito guardado es ${savedFlavor}.`
			: 'Aún no has guardado un sabor favorito.';
	};

	if (flavorSelect) {
		const savedFlavor = localStorage.getItem(flavorKey);
		if (savedFlavor) {
			flavorSelect.value = savedFlavor;
		}
		showFlavorStatus();
	}

	if (flavorForm && flavorSelect) {
		flavorForm.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!flavorSelect.value) {
				flavorSelect.classList.add('is-invalid');
				return;
			}

			flavorSelect.classList.remove('is-invalid');
			localStorage.setItem(flavorKey, flavorSelect.value);
			showFlavorStatus();
		});
	}

	if (clearFlavor && flavorSelect) {
		clearFlavor.addEventListener('click', () => {
			localStorage.removeItem(flavorKey);
			flavorSelect.value = '';
			flavorSelect.classList.remove('is-invalid');
			showFlavorStatus();
		});
	}
});

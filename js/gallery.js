document.addEventListener('DOMContentLoaded', () => {
	const triggers = Array.from(document.querySelectorAll('.gallery-trigger'));
	const lightbox = document.querySelector('.gallery-lightbox');

	if (!triggers.length || !lightbox) {
		return;
	}

	const lightboxImage = lightbox.querySelector('[data-lightbox-image]');
	const lightboxTitle = lightbox.querySelector('[data-lightbox-title]');
	const lightboxDescription = lightbox.querySelector('[data-lightbox-description]');
	const lightboxCounter = lightbox.querySelector('[data-lightbox-counter]');
	const closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
	const previousButton = lightbox.querySelector('[data-lightbox-prev]');
	const nextButton = lightbox.querySelector('[data-lightbox-next]');
	const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

	let currentIndex = 0;
	let lastFocusedElement = null;

	const galleryItems = triggers.map((trigger) => {
		const image = trigger.querySelector('img');
		const figure = trigger.closest('figure');
		const title = figure?.querySelector('figcaption strong')?.textContent.trim() || 'Imagen de galeria';
		const description = figure?.querySelector('figcaption span')?.textContent.trim() || '';

		return {
			src: image?.getAttribute('src') || '',
			alt: image?.getAttribute('alt') || title,
			title,
			description
		};
	});

	const updateLightbox = () => {
		const item = galleryItems[currentIndex];

		lightboxImage.src = item.src;
		lightboxImage.alt = item.alt;
		lightboxTitle.textContent = item.title;
		lightboxDescription.textContent = item.description;
		lightboxCounter.textContent = `${currentIndex + 1} de ${galleryItems.length}`;
	};

	const openLightbox = (index) => {
		currentIndex = index;
		lastFocusedElement = document.activeElement;
		updateLightbox();
		lightbox.classList.add('is-open');
		lightbox.setAttribute('aria-hidden', 'false');
		document.body.classList.add('gallery-lightbox-open');
		lightbox.focus();
	};

	const closeLightbox = () => {
		lightbox.classList.remove('is-open');
		lightbox.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('gallery-lightbox-open');
		lightboxImage.removeAttribute('src');

		if (lastFocusedElement) {
			lastFocusedElement.focus();
		}
	};

	const showPrevious = () => {
		currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
		updateLightbox();
	};

	const showNext = () => {
		currentIndex = (currentIndex + 1) % galleryItems.length;
		updateLightbox();
	};

	const keepFocusInside = (event) => {
		if (event.key !== 'Tab' || !lightbox.classList.contains('is-open')) {
			return;
		}

		const focusableElements = Array.from(lightbox.querySelectorAll(focusableSelector))
			.filter((element) => !element.hasAttribute('disabled'));
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (!firstElement || !lastElement) {
			return;
		}

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	};

	triggers.forEach((trigger, index) => {
		trigger.addEventListener('click', () => openLightbox(index));
	});

	closeButtons.forEach((button) => {
		button.addEventListener('click', closeLightbox);
	});

	previousButton?.addEventListener('click', showPrevious);
	nextButton?.addEventListener('click', showNext);

	document.addEventListener('keydown', (event) => {
		if (!lightbox.classList.contains('is-open')) {
			return;
		}

		if (event.key === 'Escape') {
			closeLightbox();
		}

		if (event.key === 'ArrowLeft') {
			showPrevious();
		}

		if (event.key === 'ArrowRight') {
			showNext();
		}
	});

	lightbox.addEventListener('keydown', keepFocusInside);
});

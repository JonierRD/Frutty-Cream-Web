document.addEventListener('DOMContentLoaded', () => {
	const contactForm = document.querySelector('#contactForm');
	const newsletterForm = document.querySelector('#newsletterForm');
	const contactStatus = document.querySelector('#contactStatus');
	const newsletterStatus = document.querySelector('#newsletterStatus');

	const showStatus = (element, message, isError = false) => {
		if (!element) return;
		element.textContent = message;
		element.classList.toggle('is-error', isError);
	};

	const markFields = (form) => {
		form.querySelectorAll('input, select, textarea').forEach((field) => {
			field.classList.toggle('is-invalid', !field.checkValidity());
		});
	};

	const clearFieldError = (event) => {
		event.target.classList.toggle('is-invalid', !event.target.checkValidity());
	};

	document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea, #newsletterForm input').forEach((field) => {
		field.addEventListener('input', clearFieldError);
		field.addEventListener('change', clearFieldError);
	});

	if (contactForm) {
		contactForm.addEventListener('submit', (event) => {
			event.preventDefault();
			markFields(contactForm);

			if (!contactForm.checkValidity()) {
				showStatus(contactStatus, 'Revisa los campos marcados antes de enviar.', true);
				return;
			}

			contactForm.reset();
			contactForm.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
			showStatus(contactStatus, 'Mensaje enviado correctamente. Te responderemos pronto.');
		});
	}

	if (newsletterForm) {
		newsletterForm.addEventListener('submit', (event) => {
			event.preventDefault();
			markFields(newsletterForm);

			if (!newsletterForm.checkValidity()) {
				showStatus(newsletterStatus, 'Ingresa un correo válido para unirte.', true);
				return;
			}

			newsletterForm.reset();
			newsletterForm.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
			showStatus(newsletterStatus, 'Te uniste a la lista de correos de Frutty Cream.');
		});
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const currentYear = document.querySelectorAll('[data-year]');
	currentYear.forEach((element) => {
		element.textContent = new Date().getFullYear();
	});

	const activePage = document.body?.dataset?.page;
	if (activePage) {
		document.querySelectorAll('[data-nav]').forEach((link) => {
			const isActive = link.dataset.nav === activePage;
			link.classList.toggle('active', isActive);
			if (isActive) {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	document.querySelectorAll('.navbar .nav-link').forEach((link) => {
		link.addEventListener('click', () => {
			const navCollapse = document.querySelector('.navbar-collapse.show');
			if (navCollapse && window.bootstrap?.Collapse) {
				const collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapse);
				collapse.hide();
			}
		});
	});

	const topStrip = document.querySelector('.top-strip');
	const pageNavbar = document.querySelector('.frutty-navbar--page');
	if (topStrip) {
		const setTopStripHeight = () => {
			document.documentElement.style.setProperty('--top-strip-height', `${topStrip.offsetHeight}px`);
			if (pageNavbar) {
				document.documentElement.style.setProperty('--page-navbar-height', `${pageNavbar.offsetHeight}px`);
			}
		};

		setTopStripHeight();
		window.addEventListener('resize', setTopStripHeight);
	}
});

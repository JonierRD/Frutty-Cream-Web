document.addEventListener('DOMContentLoaded', () => {
	const ingredientMap = {
		'Banana Split': 'Banano, helado artesanal, crema, salsa dulce, cereza y toppings.',
		'Copa de frutos rojos': 'Helado artesanal, frutos rojos, salsa frutal, crema y barquillo.',
		'Copa Choco': 'Helado artesanal, chocolate, barquillo, crema y topping crocante.',
		'Copa Durazno': 'Helado artesanal, durazno, crema y salsa dulce.',
		'Copa Fresa': 'Helado artesanal, fresas frescas, crema y salsa de fresa.',
		'Copa Kiwi': 'Helado artesanal, kiwi fresco, crema y salsa suave.',
		'Copa Yogurt': 'Yogurt cremoso, frutas, helado artesanal y toppings.',
		'Galleta con helado': 'Galleta dulce, helado artesanal, salsa especial y crema.',
		'Helado Brownie': 'Brownie, helado artesanal, chocolate, salsa y topping crocante.',
		'Piña Helada': 'Piña fresca, helado artesanal, frutas tropicales y crema.',
		'Porción de frutas': 'Frutas frescas seleccionadas y acompañamiento natural.',
		'Oreo': 'Base de helado, galleta Oreo triturada y crema dulce.',
		'Chocolate': 'Base de helado, cacao, leche y toque cremoso.',
		'Fresa y vainilla': 'Base de helado, fresa, vainilla y crema.',
		'Pistacho': 'Base de helado, pistacho y crema suave.',
		'Queso con cereza': 'Base de helado, queso crema, cereza y salsa dulce.',
		'Chips de chocolate': 'Base de helado, chips de chocolate y crema.',
		'Dulce de leche de soja': 'Base de soja, dulce de leche vegetal y toque cremoso.',
		'Sorbete de mora': 'Mora, agua, azúcar y base ligera sin lactosa.',
		'Banana y miel': 'Banana, miel, base vegetal y toque cremoso.',
		'Fresa y coco': 'Fresa, coco, base vegetal y sabor tropical.',
		'Sorbete de frambuesa': 'Frambuesa, agua, azúcar y base ligera sin lactosa.',
		'Sorbete de limón': 'Limón, agua, azúcar y base ligera sin lactosa.',
	};

	const parsePrice = (card) => {
		const priceText = card.querySelector('.product-price, .flavor-menu-card span')?.textContent ?? '';
		return Number(priceText.replace(/\D/g, ''));
	};

	document.querySelectorAll('[data-sort-grid]').forEach((grid) => {
		Array.from(grid.children).forEach((item, index) => {
			item.dataset.originalOrder = index;
		});
	});

	document.querySelectorAll('[data-sort-control]').forEach((control) => {
		control.addEventListener('change', () => {
			const grid = document.querySelector(`[data-sort-grid="${control.dataset.sortControl}"]`);
			if (!grid) return;

			const items = Array.from(grid.children);
			const sortedItems = items.sort((currentItem, nextItem) => {
				if (control.value === 'default') {
					return Number(currentItem.dataset.originalOrder) - Number(nextItem.dataset.originalOrder);
				}

				const currentPrice = parsePrice(currentItem);
				const nextPrice = parsePrice(nextItem);
				return control.value === 'asc' ? currentPrice - nextPrice : nextPrice - currentPrice;
			});

			sortedItems.forEach((item) => grid.appendChild(item));
		});
	});

	const detailModal = document.querySelector('#productDetailModal');
	const detailTitle = document.querySelector('#productDetailTitle');
	const detailImage = document.querySelector('#productDetailImage');
	const detailDescription = document.querySelector('#productDetailDescription');
	const detailIngredients = document.querySelector('#productDetailIngredients');
	const detailPrice = document.querySelector('#productDetailPrice');

	if (detailModal && detailTitle && detailImage && detailDescription && detailIngredients && detailPrice) {
		document.querySelectorAll('.product-menu-card, .flavor-menu-card').forEach((card) => {
			const title = card.querySelector('.card-title, h3')?.textContent.trim() ?? 'Producto';
			const description = card.querySelector('.card-text, div p')?.textContent.trim() ?? '';
			const price = card.querySelector('.product-price, span')?.textContent.trim() ?? '';
			const image = card.querySelector('img');
			const buttonTarget = card.querySelector('.card-body') ?? card.querySelector('div');

			if (!image || !buttonTarget) return;

			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'btn product-detail-button';
			button.textContent = 'Ver detalle';
			button.setAttribute('data-bs-toggle', 'modal');
			button.setAttribute('data-bs-target', '#productDetailModal');
			button.addEventListener('click', () => {
				detailTitle.textContent = title;
				detailImage.src = image.src;
				detailImage.alt = image.alt;
				detailDescription.textContent = description;
				detailIngredients.textContent = ingredientMap[title] ?? 'Ingredientes artesanales seleccionados por Frutty Cream.';
				detailPrice.textContent = price;
			});

			buttonTarget.appendChild(button);
		});
	}
});

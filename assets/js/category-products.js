'use strict';

const categoryCatalog = [
  {
    name: 'Samsung CE76JD-B1/IM 21L Convection Microwave with Curd Making Technology',
    price: 'Rs 24,450',
    image: './assets/images/products/Samsung-CE76JD-B1.jpg',
    link: './products/samsung-ce76jd-b1-im-21l-convection-microwave-with-curd-making-technology.html',
    tags: ['microwaves-ovens', 'smart-kitchen-appliances'],
  },
  {
    name: 'Panasonic NN-ST266BYTE Solo Microwave',
    price: 'Rs 13,250',
    image: './assets/images/products/Panasonic-NN-ST266BYTE.webp',
    link: './products/panasonic-nn-st266byte-solo-microwave.html',
    tags: ['microwaves-ovens', 'smart-kitchen-appliances'],
  },
  {
    name: 'Sansui SS-VC16M37 1600W Bag Type Vacuum Cleaner',
    price: 'Rs 7,500',
    image: './assets/images/products/Sansui-SS-VC16M37.jpg',
    link: './products/sansui-ss-vc16m37-1600w-bag-type-vacuum-cleaner.html',
    tags: ['smart-household-appliances'],
  },
  {
    name: 'Electric Kettle WB-EK188 (1.8L)',
    price: 'Rs 1,200',
    image: './assets/images/products/Webor-WB-EK188.jpg',
    link: './products/electric-kettle-wb-ek188-1-8l.html',
    tags: ['smart-kitchen-appliances'],
  },
  {
    name: 'Orbit Infrared Cooker OK-20P46ICA/YA',
    price: 'Rs 4,880',
    image: './assets/images/products/orbit-OK-20P46ICA.png',
    link: './products/orbit-infrared-cooker-ok-20p46ica-ya.html',
    tags: ['smart-kitchen-appliances'],
  },
  {
    name: 'Panasonic NN-CT645BYTE Convection/Grill Microwave',
    price: 'Rs 23,500',
    image: './assets/images/products/Panasonic-NN-CT645BYTE.jpg',
    link: './products/panasonic-nn-ct645byte-convection-grill-microwave.html',
    tags: ['microwaves-ovens', 'smart-kitchen-appliances'],
  },
  {
    name: 'Himstar HK-20D1ICI/YE Induction Cooker',
    price: 'Rs 4,400',
    image: './assets/images/products/Himstar-HK-20D1ICI.jpeg',
    link: './products/himstar-hk-20d1ici-ye-induction-cooker.html',
    tags: ['smart-kitchen-appliances'],
  },
  {
    name: 'Himstar HV-22703WDJ/SE Vacuum Cleaner',
    price: 'Rs 12,450',
    image: './assets/images/products/Himstar-HV-22703WDJ.png',
    link: './products/himstar-hv-22703wdj-se-vacuum-cleaner.html',
    tags: ['smart-household-appliances'],
  },
  {
    name: 'Panasonic NN-CT36HBYTE Convection/Grill Microwave',
    price: 'Rs 24,600',
    image: './assets/images/products/Panasonic-NN-CT36HBYTE.png',
    link: './products/panasonic-nn-ct36hbyte-convection-grill-microwave.html',
    tags: ['microwaves-ovens', 'smart-kitchen-appliances'],
  },
];

const categoryPage = document.querySelector('[data-category-page]');

if (categoryPage) {
  const categoryKey = categoryPage.dataset.categoryKey || '';
  const categoryName = categoryPage.dataset.categoryName || 'Category';
  const categoryHeading = document.querySelector('[data-category-heading]');
  const grid = document.querySelector('[data-category-grid]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (categoryHeading) {
    categoryHeading.textContent = `${categoryName} Products`;
  }

  const filtered = categoryCatalog.filter(function (product) {
    return product.tags.includes(categoryKey);
  });

  if (!grid || !emptyState) {
    console.warn('Category page grid or empty state is missing.');
  } else if (!filtered.length) {
    emptyState.hidden = false;
  } else {
    const cards = filtered
    .map(function (product) {
      return `
        <div class="showcase">
          <div class="showcase-banner">
            <a href="${product.link}" class="showcase-img-box">
              <img src="${product.image}" alt="${product.name}" class="product-img default" width="300">
              <img src="${product.image}" alt="${product.name}" class="product-img hover" width="300">
            </a>
          </div>
          <div class="showcase-content">
            <a href="${product.link}" class="showcase-category">${categoryName}</a>
            <h3><a href="${product.link}" class="showcase-title">${product.name}</a></h3>
            <div class="price-box"><p class="price">${product.price}</p></div>
          </div>
        </div>
      `;
    })
    .join('');

  grid.innerHTML = cards;
  }
}

'use strict';

const categoryCatalog = [
  { name: 'Samsung CE76JD-B1/IM 21L Convection Microwave with Curd Making Technology', price: 'Rs 24,450', image: './assets/images/products/Samsung-CE76JD-B1.jpg', link: './products/samsung-ce76jd-b1-im-21l-convection-microwave-with-curd-making-technology.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Panasonic NN-ST266BYTE Solo Microwave', price: 'Rs 13,250', image: './assets/images/products/Panasonic-NN-ST266BYTE.webp', link: './products/panasonic-nn-st266byte-solo-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Sansui SS-VC16M37 1600W Bag Type Vacuum Cleaner', price: 'Rs 7,500', image: './assets/images/products/Sansui-SS-VC16M37.jpg', link: './products/sansui-ss-vc16m37-1600w-bag-type-vacuum-cleaner.html', tags: ['smart-household-appliances'] },
  { name: 'Electric Kettle WB-EK188 (1.8L)', price: 'Rs 1,200', image: './assets/images/products/Webor-WB-EK188.jpg', link: './products/electric-kettle-wb-ek188-1-8l.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Orbit Infrared Cooker OK-20P46ICA/YA', price: 'Rs 4,880', image: './assets/images/products/orbit-OK-20P46ICA.png', link: './products/orbit-infrared-cooker-ok-20p46ica-ya.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Panasonic NN-CT645BYTE Convection/Grill Microwave', price: 'Rs 23,500', image: './assets/images/products/Panasonic-NN-CT645BYTE.jpg', link: './products/panasonic-nn-ct645byte-convection-grill-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Himstar HK-20D1ICI/YE Induction Cooker', price: 'Rs 4,400', image: './assets/images/products/Himstar-HK-20D1ICI.jpeg', link: './products/himstar-hk-20d1ici-ye-induction-cooker.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Himstar HV-22703WDJ/SE Vacuum Cleaner', price: 'Rs 12,450', image: './assets/images/products/Himstar-HV-22703WDJ.png', link: './products/himstar-hv-22703wdj-se-vacuum-cleaner.html', tags: ['smart-household-appliances'] },
  { name: 'Panasonic NN-CT36HBYTE Convection/Grill Microwave', price: 'Rs 24,600', image: './assets/images/products/Panasonic-NN-CT36HBYTE.png', link: './products/panasonic-nn-ct36hbyte-convection-grill-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Samsung Refrigerator RR20M282ZS8', price: 'Rs 33,500', image: './assets/images/products/RR20M282ZS8.jpg', link: './products/samsung-refrigerator-rr20m282zs8.html', tags: ['refrigerators'] },
  { name: 'Samsung Refrigerator RR20C20C2RH', price: 'Rs 28,990', image: './assets/images/products/RT20C20C2RH.jpg', link: './products/samsung-refrigerator-rr20c20c2rh.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A192MFMNP', price: 'Rs 29,298', image: './assets/images/products/NR-A192MFMNP.jpg', link: './products/panasonic-refrigerator-nr-a192mfmnp.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A201BEAN', price: 'Rs 29,295', image: './assets/images/products/NR-A201BEAN.jpg', link: './products/panasonic-refrigerator-nr-a201bean.html', tags: ['refrigerators'] },
  { name: 'Samsung Refrigerator RR20C20C2GS', price: 'Rs 28,500', image: './assets/images/products/RR20C20C2GS.png', link: './products/samsung-refrigerator-rr20c20c2gs.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A192MFANP', price: 'Rs 30,300', image: './assets/images/products/NR-A192MFANP.png', link: './products/panasonic-refrigerator-nr-a192mfanp.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A201BTAN', price: 'Rs 31,195', image: './assets/images/products/NR-A201BTAN.jpg', link: './products/panasonic-refrigerator-nr-a201btan.html', tags: ['refrigerators'] },
  { name: 'Samsung Refrigerator RR20C2722CR', price: 'Rs 33,798', image: './assets/images/products/RR20C2722CR.jpg', link: './products/samsung-refrigerator-rr20c2722cr.html', tags: ['refrigerators'] },
  { name: 'Kent Sapphire Water Purifier (Black)', price: 'Rs 36,390', image: './assets/images/products/Kent-Sapphire-B.jpg', link: './products/kent-sapphire-water-purifier-black.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Sapphire Water Purifier (White)', price: 'Rs 36,390', image: './assets/images/products/Kent-Sapphire-W.png', link: './products/kent-sapphire-water-purifier-white.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Grand Plus Water Purifier', price: 'Rs 34,450', image: './assets/images/products/kent-grand-plus.jpg', link: './products/kent-grand-plus-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Pearl ZWW Water Purifier', price: 'Rs 34,990', image: './assets/images/products/kent-pearl-zww.jpg', link: './products/kent-pearl-zww-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Ace Water Purifier', price: 'Rs 29,960', image: './assets/images/products/kent-ace.jpg', link: './products/kent-ace-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Marvel Water Purifier', price: 'Rs 24,985', image: './assets/images/products/kent-marvel.webp', link: './products/kent-marvel-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Ultra Storage Water Purifier', price: 'Rs 17,400', image: './assets/images/products/kent-ultra-storage.png', link: './products/kent-ultra-storage-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Maxx Water Purifier', price: 'Rs 15,835', image: './assets/images/products/kent-maxx.jpg', link: './products/kent-maxx-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Webor WBGS2050B Steel Gas Cooktop Burner', price: 'Rs 3,900', image: './assets/images/products/1.jpg', link: './products/webor-wbgs2050b-steel-gas-cooktop-burner.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Faber FMG Candy 1000 3J+1PC Plum Mixer Grinder', price: 'Rs 15,050', image: './assets/images/products/2.jpg', link: './products/faber-fmg-candy-1000-3j-1pc-plum-mixer-grinder.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Samsung Washing Machine WW90DG5U24AX', price: 'Rs 81,910', image: './assets/images/products/WW90DG5U24AX.jpg', link: './products/samsung-washing-machine-ww90dg5u24ax.html', tags: ['smart-household-appliances'] },
  { name: 'Panasonic Washing Machine NA-148MG4LN1', price: 'Rs 72,940', image: './assets/images/products/NA-148MG4LN1.jpg', link: './products/panasonic-washing-machine-na-148mg4ln1.html', tags: ['smart-household-appliances'] }
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
    const cards = filtered.map(function (product) {
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
    }).join('');

    grid.innerHTML = cards;
  }
}

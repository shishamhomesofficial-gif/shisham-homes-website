'use strict';

const categoryCatalog = [
  { name: 'Samsung CE76JD-B1/IM 21L Convection Microwave with Curd Making Technology', price: 'Rs 24,450', image: './assets/images/products/Samsung-CE76JD-B1.jpg', link: './products/samsung-ce76jd-b1-im-21l-convection-microwave-with-curd-making-technology.html', tags: ['microwaves-ovens', 'samsung-microwaves-ovens', 'smart-kitchen-appliances', 'popular-products'] },
  { name: 'Panasonic NN-ST266BYTE Solo Microwave', price: 'Rs 13,250', image: './assets/images/products/Panasonic-NN-ST266BYTE.webp', link: './products/panasonic-nn-st266byte-solo-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Sansui SS-VC16M37 1600W Bag Type Vacuum Cleaner', price: 'Rs 7,500', image: './assets/images/products/Sansui-SS-VC16M37.jpg', link: './products/sansui-ss-vc16m37-1600w-bag-type-vacuum-cleaner.html', tags: ['smart-household-appliances', 'vacuum-cleaners'] },
  { name: 'Electric Kettle WB-EK188 (1.8L)', price: 'Rs 1,200', image: './assets/images/products/Webor-WB-EK188.jpg', link: './products/electric-kettle-wb-ek188-1-8l.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Orbit Infrared Cooker OK-20P46ICA/YA', price: 'Rs 4,880', image: './assets/images/products/orbit-OK-20P46ICA.png', link: './products/orbit-infrared-cooker-ok-20p46ica-ya.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Panasonic NN-CT645BYTE Convection/Grill Microwave', price: 'Rs 23,500', image: './assets/images/products/Panasonic-NN-CT645BYTE.jpg', link: './products/panasonic-nn-ct645byte-convection-grill-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Himstar HK-20D1ICI/YE Induction Cooker', price: 'Rs 4,400', image: './assets/images/products/Himstar-HK-20D1ICI.jpeg', link: './products/himstar-hk-20d1ici-ye-induction-cooker.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Himstar HV-22703WDJ/SE Vacuum Cleaner', price: 'Rs 12,450', image: './assets/images/products/Himstar-HV-22703WDJ.png', link: './products/himstar-hv-22703wdj-se-vacuum-cleaner.html', tags: ['smart-household-appliances', 'vacuum-cleaners'] },
  { name: 'Panasonic NN-CT36HBYTE Convection/Grill Microwave', price: 'Rs 24,600', image: './assets/images/products/Panasonic-NN-CT36HBYTE.png', link: './products/panasonic-nn-ct36hbyte-convection-grill-microwave.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Samsung Refrigerator RR20M282ZS8', price: 'Rs 33,500', image: './assets/images/products/RR20M282ZS8.jpg', link: './products/samsung-refrigerator-rr20m282zs8.html', tags: ['refrigerators', 'samsung-refrigerators', 'popular-products'] },
  { name: 'Samsung Refrigerator RR20C20C2RH', price: 'Rs 28,990', image: './assets/images/products/RT20C20C2RH.jpg', link: './products/samsung-refrigerator-rr20c20c2rh.html', tags: ['refrigerators', 'samsung-refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A192MFMNP', price: 'Rs 29,298', image: './assets/images/products/NR-A192MFMNP.jpg', link: './products/panasonic-refrigerator-nr-a192mfmnp.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A201BEAN', price: 'Rs 29,295', image: './assets/images/products/NR-A201BEAN.jpg', link: './products/panasonic-refrigerator-nr-a201bean.html', tags: ['refrigerators'] },
  { name: 'Samsung Refrigerator RR20C20C2GS', price: 'Rs 28,500', image: './assets/images/products/RR20C20C2GS.png', link: './products/samsung-refrigerator-rr20c20c2gs.html', tags: ['refrigerators', 'samsung-refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A192MFANP', price: 'Rs 30,300', image: './assets/images/products/NR-A192MFANP.png', link: './products/panasonic-refrigerator-nr-a192mfanp.html', tags: ['refrigerators'] },
  { name: 'Panasonic Refrigerator NR-A201BTAN', price: 'Rs 31,195', image: './assets/images/products/NR-A201BTAN.jpg', link: './products/panasonic-refrigerator-nr-a201btan.html', tags: ['refrigerators'] },
  { name: 'Samsung Refrigerator RR20C2722CR', price: 'Rs 33,798', image: './assets/images/products/RR20C2722CR.jpg', link: './products/samsung-refrigerator-rr20c2722cr.html', tags: ['refrigerators', 'samsung-refrigerators'] },
  { name: 'Kent Sapphire Water Purifier (Black)', price: 'Rs 36,390', image: './assets/images/products/Kent-Sapphire-B.jpg', link: './products/kent-sapphire-water-purifier-black.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'Kent Sapphire Water Purifier (White)', price: 'Rs 36,390', image: './assets/images/products/Kent-Sapphire-W.png', link: './products/kent-sapphire-water-purifier-white.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'Kent Grand Plus Water Purifier', price: 'Rs 34,450', image: './assets/images/products/kent-grand-plus.jpg', link: './products/kent-grand-plus-water-purifier.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers', 'popular-products'] },
  { name: 'Kent Pearl ZWW Water Purifier', price: 'Rs 34,990', image: './assets/images/products/kent-pearl-zww.jpg', link: './products/kent-pearl-zww-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Ace Water Purifier', price: 'Rs 29,960', image: './assets/images/products/kent-ace.jpg', link: './products/kent-ace-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Marvel Water Purifier', price: 'Rs 24,985', image: './assets/images/products/kent-marvel.webp', link: './products/kent-marvel-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Ultra Storage Water Purifier', price: 'Rs 17,400', image: './assets/images/products/kent-ultra-storage.png', link: './products/kent-ultra-storage-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Kent Maxx Water Purifier', price: 'Rs 15,835', image: './assets/images/products/kent-maxx.jpg', link: './products/kent-maxx-water-purifier.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Webor WBGS2050B Steel Gas Cooktop Burner', price: 'Rs 3,900', image: './assets/images/products/1.jpg', link: './products/webor-wbgs2050b-steel-gas-cooktop-burner.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Faber FMG Candy 1000 3J+1PC Plum Mixer Grinder', price: 'Rs 15,050', image: './assets/images/products/2.jpg', link: './products/faber-fmg-candy-1000-3j-1pc-plum-mixer-grinder.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Samsung Washing Machine WW90DG5U24AX', price: 'Rs 81,910', image: './assets/images/products/WW90DG5U24AX.jpg', link: './products/samsung-washing-machine-ww90dg5u24ax.html', tags: ['smart-household-appliances', 'washing-machines', 'popular-products'] },
  { name: 'Panasonic Washing Machine NA-148MG4LN1', price: 'Rs 72,940', image: './assets/images/products/NA-148MG4LN1.jpg', link: './products/panasonic-washing-machine-na-148mg4ln1.html', tags: ['smart-household-appliances', 'washing-machines', 'popular-products'] },

  { name: 'Webor WBRC22DRM Electric Rice Cooker', price: 'Rs 3,250', image: './assets/images/products/WBRC22DRM.png', link: './products/webor-wbrc22drm-electric-rice-cooker.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Webor WBGS2050A Glass Gas Cook Top', price: 'Rs 3,950', image: './assets/images/products/WBGS2050A.webp', link: './products/webor-wbgs2050a-glass-gas-cook-top.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Signoracare Electric Air Fryer 8.5L', price: 'Rs 8,950', image: './assets/images/products/signoracare-air-fryer.jpg', link: './products/signoracare-electric-air-fryer-8-5l.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Kenstar Electric Juicer', price: 'Rs 4,040', image: './assets/images/products/kenstar-nutriv-juiser.jpg', link: './products/kenstar-electric-juicer.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Webor Electric Kettle WB-KE18E', price: 'Rs 1,660', image: './assets/images/products/WB-KE18E.jpg', link: './products/webor-electric-kettle-wb-ke18e.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Signora Electric Kettle 1.8L', price: 'Rs 880', image: './assets/images/products/signora-kettle.jpg', link: './products/signora-electric-kettle-1-8l.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Himstar Electric Kettle HK-18JSFI/GY', price: 'Rs 955', image: './assets/images/products/HK-18JSFI.png', link: './products/himstar-electric-kettle-hk-18jsfi-gy.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Himstar Electric Kettle KG-18RMFI/GY', price: 'Rs 995', image: './assets/images/products/KG-18RMFI.jpg', link: './products/himstar-electric-kettle-kg-18rmfi-gy.html', tags: ['smart-kitchen-appliances', 'popular-products'] },
  { name: 'Himstar HK-20D19ICI Induction Cooker', price: 'Rs 5,200', image: './assets/images/products/HK-20D19ICI.jpeg', link: './products/himstar-hk-20d19ici-induction-cooker.html', tags: ['smart-kitchen-appliances'] },
  { name: 'CG Chimney CGCT90YF Kitchen Hood', price: 'Rs 25,325', image: './assets/images/products/CGCT90YF.png', link: './products/cg-chimney-cgct90yf-kitchen-hood.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT60YF Kitchen Hood', price: 'Rs 24,500', image: './assets/images/products/CGCT60YF.jpg', link: './products/cg-chimney-cgct60yf-kitchen-hood.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT90YFF Kitchen Hood', price: 'Rs 23,000', image: './assets/images/products/CGCT90YFF.jpg', link: './products/cg-chimney-cgct90yff-kitchen-hood.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT90FLDC Auto-Clean Chimney', price: 'Rs 26,385', image: './assets/images/products/CGCT90FLDC.jpg', link: './products/cg-chimney-cgct90fldc-auto-clean-chimney.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT60FLDC Auto-Clean Chimney', price: 'Rs 26,225', image: './assets/images/products/CGCT60FLDC.jpg', link: './products/cg-chimney-cgct60fldc-auto-clean-chimney.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT90DBDX Designer Chimney', price: 'Rs 32,988', image: './assets/images/products/CGCT90FLDC.jpg', link: './products/cg-chimney-cgct90dbdx-designer-chimney.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'CG Chimney CGCT90YCA Curved Glass Chimney', price: 'Rs 28,885', image: './assets/images/products/CGCT90YF.png', link: './products/cg-chimney-cgct90yca-curved-glass-chimney.html', tags: ['smart-kitchen-appliances', 'chimneys'] },
  { name: 'Panasonic NN-CD684B Convection Microwave Oven', price: 'Rs 30,000', image: './assets/images/products/NN-CD684B.png', link: './products/panasonic-nn-cd684b-convection-microwave-oven.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'WEBOR Micro Oven WBMW25GR002', price: 'Rs 20,180', image: './assets/images/products/WBMW25GR002.jpg', link: './products/webor-micro-oven-wbmw25gr002.html', tags: ['microwaves-ovens', 'smart-kitchen-appliances'] },
  { name: 'Forbes Aeon Water Purifier 4000L', price: 'Rs 4,840', image: './assets/images/products/forbes-aeon.webp', link: './products/forbes-aeon-water-purifier-4000l.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'CG RO Pure Hot and Cold Water Purifier Dispenser', price: 'Rs 35,600', image: './assets/images/products/cg-ro-pure.jpg', link: './products/cg-ro-pure-hot-and-cold-water-purifier-dispenser.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'CG RO Pure Plus Hot and Cold Water Purifier Dispenser', price: 'Rs 36,610', image: './assets/images/products/cg-ro-pure.webp', link: './products/cg-ro-pure-plus-hot-and-cold-water-purifier-dispenser.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'Forbes Nectar Water Purifier', price: 'Rs 9,730', image: './assets/images/products/forbes-nectar.jpeg', link: './products/forbes-nectar-water-purifier.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'KENT Polar 15L Electric Water Heater Geyser', price: 'Rs 14,945', image: './assets/images/products/kent-geyser-water-heater.jpg', link: './products/kent-polar-15l-electric-water-heater-geyser.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'KENT Polar 30L Electric Water Heater Geyser', price: 'Rs 23,800', image: './assets/images/products/kent-geyser-water-heater-30L.jpg', link: './products/kent-polar-30l-electric-water-heater-geyser.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'KENT Austral Prime 30L Water Heater Geyser', price: 'Rs 20,800', image: './assets/images/products/kent-austral-prime.webp', link: './products/kent-austral-prime-30l-water-heater-geyser.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Signoracare Small Hot and Cold Water Dispenser', price: 'Rs 2,399', image: './assets/images/products/signoracare-water-dispenser-small.webp', link: './products/signoracare-small-hot-and-cold-water-dispenser.html', tags: ['other-products', 'smart-household-appliances', 'water-purifiers-and-dispensers'] },
  { name: 'Kenstar Tatvam Pro Mixer Grinder', price: 'Rs 7,120', image: './assets/images/products/tatvam-pro.webp', link: './products/kenstar-tatvam-pro-mixer-grinder.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Bosch TrueMixx Bold Mixer Grinder', price: 'Rs 15,390', image: './assets/images/products/bosh-truemixx.webp', link: './products/bosch-truemixx-bold-mixer-grinder.html', tags: ['smart-kitchen-appliances', 'popular-products'] },
  { name: 'WEBOR TV 39FHDK5S Full HD Smart TV', price: 'Rs 41,000', image: './assets/images/products/39FHDK5S.jpg', link: './products/webor-tv-39fhdk5s-full-hd-smart-tv.html', tags: ['tv', 'popular-products'] },
  { name: 'Samsung UA55U8500FRSHE 55 Inch UHD Smart TV', price: 'Rs 89,980', image: './assets/images/products/UA55U8500FRSHE.jpg', link: './products/samsung-ua55u8500frshe-55-inch-uhd-smart-tv.html', tags: ['tv'] },
  { name: 'Sansui Deep Freezer SS-CFC110T', price: 'Rs 27,400', image: './assets/images/products/SS-CFC110T.webp', link: './products/sansui-deep-freezer-ss-cfc110t.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'Sansui Deep Freezer SS-CFX160HT', price: 'Rs 31,240', image: './assets/images/products/SS-CFX160HT.jpg', link: './products/sansui-deep-freezer-ss-cfx160ht.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'CG 24 Tubes Solar Water Heater CGSWH2401Z', price: 'Rs 82,380', image: './assets/images/products/CGSWH2401Z.jpg', link: './products/cg-24-tubes-solar-water-heater-cgswh2401z.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'SSC30 Hawkins Pressure Cooker', price: 'Rs 5,630', image: './assets/images/products/SSC30.jpg', link: './products/ssc30-hawkins-pressure-cooker.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Signoracare Stand Fan', price: 'Rs 2,540', image: './assets/images/products/sigroracare-stand-fan.jpg', link: './products/signoracare-stand-fan.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'HIMSTAR HEATER HS-12HRHJ/JE', price: 'Rs 3,835', image: './assets/images/products/HS-12HRHJ.png', link: './products/himstar-heater-hs-12hrhj-je.html', tags: ['other-products', 'smart-household-appliances'] },
  { name: 'RR Iron Silk Flow', price: 'Rs 1,499', image: './assets/images/products/rr-iron-silk-flow.png', link: './products/rr-iron-silk-flow.html', tags: ['other-products', 'smart-household-appliances', 'irons'] },
  { name: 'Kenstar Iron 1000W', price: 'Rs 1,600', image: './assets/images/products/kenstar-iron.jpg', link: './products/kenstar-iron-1000w.html', tags: ['other-products', 'smart-household-appliances', 'irons'] },
  { name: 'AMEET Heavy Weight Iron Plancha', price: 'Rs 3,545', image: './assets/images/products/amee-iron-planch.webp', link: './products/ameet-heavy-weight-iron-plancha.html', tags: ['other-products', 'smart-household-appliances', 'irons'] },
  { name: 'KENSTAR Kettle Estella Optima 1.8L', price: 'Rs 1,800', image: './assets/images/products/kenstar-estella.webp', link: './products/kenstar-kettle-estella-optima-1-8l.html', tags: ['smart-kitchen-appliances'] },
  { name: 'Signoracare Air Fryer 6L', price: 'Rs 5,998', image: './assets/images/products/signoracare-air-fryer-6L.png', link: './products/signoracare-air-fryer-6l.html', tags: ['smart-kitchen-appliances', 'popular-products'] },
  { name: 'Panasonic Air Conditioner CS/CU-KZ12YKY-8', price: 'Rs 93,595', image: './assets/images/products/cu-kz12yky-8.jpg', link: './products/panasonic-air-conditioner-cs-cu-kz12yky-8.html', tags: ['other-products', 'smart-household-appliances'] },
];

const categoryPage = document.querySelector('[data-category-page]');

function getNumericPrice(priceStr) {
  if (!priceStr) return 0;
  const numeric = priceStr.replace(/Rs\s*/i, '').replace(/,/g, '').trim();
  return parseFloat(numeric) || 0;
}

if (categoryPage) {
  const categoryKey = categoryPage.dataset.categoryKey || '';
  const categoryName = categoryPage.dataset.categoryName || 'Category';
  const categoryHeading = document.querySelector('[data-category-heading]');
  const grid = document.querySelector('[data-category-grid]');
  const emptyState = document.querySelector('[data-empty-state]');
  const sortSelect = document.getElementById('sortSelect');
  const productCountDisplay = document.getElementById('productCountDisplay');
  const sortBar = document.getElementById('sortBarContainer') || document.querySelector('.sort-bar') || document.querySelector('.product-main');

  if (categoryHeading && !categoryHeading.dataset.preserveTitle) {
    categoryHeading.textContent = `${categoryName} Products in Nepal`;
  }

  const keyAliases = {
    'water-purifiers-dispensers': 'water-purifiers-and-dispensers'
  };

  const resolvedCategoryKey = keyAliases[categoryKey] || categoryKey;
  const baseFiltered = categoryCatalog.filter(function (product) {
    return product.tags.includes(resolvedCategoryKey);
  });

  const prices = baseFiltered.map((product) => getNumericPrice(product.price)).filter(Boolean);
  const minCatalogPrice = prices.length ? Math.min(...prices) : 0;
  const maxCatalogPrice = prices.length ? Math.max(...prices) : 0;
  const state = {
    sort: 'default',
    max: maxCatalogPrice
  };

  function updateCount(count) {
    if (!productCountDisplay) return;
    productCountDisplay.textContent = `${count} ${categoryName.toLowerCase()} item${count === 1 ? '' : 's'} available`;
  }

  function sortProducts(list) {
    const sorted = [...list];
    if (state.sort === 'price_low_high') {
      sorted.sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price));
    } else if (state.sort === 'price_high_low') {
      sorted.sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price));
    }
    return sorted;
  }

  function applyFilters() {
    const filtered = baseFiltered.filter((product) => {
      const price = getNumericPrice(product.price);
      return price <= state.max;
    });

    const output = sortProducts(filtered);

    if (!grid || !emptyState) {
      console.warn('Category page grid or empty state is missing.');
      return;
    }

    if (!output.length) {
      grid.innerHTML = '';
      emptyState.hidden = false;
      updateCount(0);
      return;
    }

    emptyState.hidden = true;
    const cards = output.map(function (product) {
      return `
        <div class="showcase">
          <div class="showcase-banner">
            <a href="${product.link}" class="showcase-img-box">
              <img src="${product.image}" alt="${product.name}" class="product-img default" width="300" loading="lazy">
              <img src="${product.image}" alt="${product.name}" class="product-img hover" width="300" loading="lazy">
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
    updateCount(output.length);
  }

  function renderRangeControl() {
    if (!sortBar || !prices.length) return;

    document.querySelectorAll('.category-control-panel').forEach((node) => node.remove());

    const panel = document.createElement('div');
    panel.className = 'category-control-panel';
    panel.innerHTML = `
      <div class="category-control-grid">
        <div class="range-filter-wrap">
          <label for="priceRange">Filter by price</label>
          <div class="price-range-inputs">
            <input id="priceRange" type="range" min="${minCatalogPrice}" max="${maxCatalogPrice}" step="100" value="${maxCatalogPrice}">
          </div>
          <div class="price-range-labels">
            <span>Rs ${minCatalogPrice.toLocaleString()}</span>
            <span id="priceMaxLabel">Up to Rs ${maxCatalogPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;

    sortBar.insertAdjacentElement('afterend', panel);

    // Defensive guard: keep exactly one range input in the panel even if stale markup/scripts duplicate it.
    const allRangeInputs = panel.querySelectorAll('.price-range-inputs input[type="range"]');
    allRangeInputs.forEach((input, index) => {
      if (index > 0) input.remove();
    });

    const priceRange = panel.querySelector('#priceRange');
    const maxLabel = panel.querySelector('#priceMaxLabel');

    const updateLabels = () => {
      maxLabel.textContent = `Up to Rs ${state.max.toLocaleString()}`;
    };

    priceRange.addEventListener('input', function () {
      state.max = Number(this.value);
      updateLabels();
      applyFilters();
    });

    updateLabels();
  }


  const dedupePanels = () => {
    const panels = Array.from(document.querySelectorAll('.category-control-panel'));
    panels.slice(1).forEach((panel) => panel.remove());

    const firstPanel = panels[0] || document.querySelector('.category-control-panel');
    if (!firstPanel) return;
    const ranges = firstPanel.querySelectorAll('.price-range-inputs input[type="range"]');
    ranges.forEach((rangeInput, idx) => {
      if (idx > 0) rangeInput.remove();
    });
  };

  if (sortSelect) {
    sortSelect.addEventListener('change', function (event) {
      state.sort = event.target.value;
      applyFilters();
    });
  }

  applyFilters();
  renderRangeControl();
  dedupePanels();
  applyFilters();

  const panelObserver = new MutationObserver(dedupePanels);
  panelObserver.observe(document.body, { childList: true, subtree: true });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} in Nepal | Shisham Homes`,
    description: `Explore ${categoryName.toLowerCase()} at Shisham Homes with live price filtering and trusted local support in Kathmandu.`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: baseFiltered.length,
      itemListElement: baseFiltered.slice(0, 12).map((product, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: product.name,
        url: `https://www.shishamhomes.com.np/${product.link.replace(/^\.\//, '')}`
      }))
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

window.categoryCatalog = categoryCatalog;
window.productCatalog = categoryCatalog;

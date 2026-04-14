(() => {
  const normalize = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

  const normalizeImage = (src) => {
    if (!src) return '';
    const value = String(src).trim();
    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
      return value;
    }
    return '/' + value.replace(/^\.\//, '');
  };

  const getCatalog = () => {
    if (Array.isArray(window.productCatalog) && window.productCatalog.length) {
      return window.productCatalog;
    }
    return [];
  };

  const getPageData = () => {
    const main = document.querySelector('main');
    return {
      slug: normalize(main?.dataset.productSlug || location.pathname.split('/').pop()),
      title: main?.dataset.productTitle || 'AMEET Heavy Weight Iron Plancha',
      category: main?.dataset.productCategory || 'Electric Irons',
    };
  };

  const renderRelatedProducts = () => {
    const grid = document.getElementById('related-products-grid');
    const emptyState = document.getElementById('related-products-empty');
    if (!grid || !emptyState) return;

    const catalog = getCatalog();
    if (!catalog.length) {
      emptyState.hidden = false;
      emptyState.textContent = 'Product catalog is not loaded.';
      return;
    }

    const page = getPageData();

    const currentProduct =
      catalog.find((p) => normalize(p.slug) === page.slug) ||
      catalog.find((p) => normalize(p.title) === normalize(page.title));

    const currentCategory = normalize(currentProduct?.category || page.category);
    const currentTitle = normalize(currentProduct?.title || page.title);

    let related = catalog
      .filter((product) => normalize(product.slug) !== page.slug)
      .filter((product) => normalize(product.title) !== currentTitle)
      .map((product) => {
        const t = normalize(product.title);
        const c = normalize(product.category);
        let score = 0;

        if (c === currentCategory) score += 20;
        if (currentCategory.includes('iron') && c.includes('iron')) score += 10;
        if (currentCategory.includes('kettle') && c.includes('kettle')) score += 10;
        if (currentCategory.includes('microwave') && c.includes('microwave')) score += 10;
        if (currentCategory.includes('refrigerator') && c.includes('refrigerator')) score += 10;
        if (t.includes('iron')) score += 4;
        if (t.includes('plancha')) score += 4;

        return { ...product, score };
      })
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 4);

    if (!related.length) {
      related = catalog
        .filter((product) => normalize(product.slug) !== page.slug)
        .slice(0, 4);
    }

    if (!related.length) {
      emptyState.hidden = false;
      emptyState.textContent = 'No similar products found right now.';
      return;
    }

    grid.innerHTML = related
      .map((product) => {
        const href = `./${product.slug}`;
        const image = normalizeImage(product.image);

        return `
          <div class="showcase">
            <div class="showcase-banner">
              <a href="${href}" class="showcase-img-box">
                <img src="${image}" alt="${product.title}" class="product-img default" width="300" loading="lazy">
                <img src="${image}" alt="${product.title}" class="product-img hover" width="300" loading="lazy">
              </a>
            </div>
            <div class="showcase-content">
              <a href="${href}" class="showcase-category">${product.category}</a>
              <h3><a href="${href}" class="showcase-title">${product.title}</a></h3>
              <div class="price-box"><p class="price">${product.price}</p></div>
            </div>
          </div>
        `;
      })
      .join('');
  };

  document.addEventListener('DOMContentLoaded', renderRelatedProducts);
})();

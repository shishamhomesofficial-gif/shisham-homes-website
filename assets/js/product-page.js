(() => {
  const normalizeText = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

  const normalizeImagePath = (src) => {
    if (!src) return '';
    const value = String(src).trim();
    if (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('/')
    ) {
      return value;
    }
    return '/' + value.replace(/^\.\//, '');
  };

  const getCatalog = () => {
    if (Array.isArray(window.productCatalog)) return window.productCatalog;
    try {
      if (typeof productCatalog !== 'undefined' && Array.isArray(productCatalog)) {
        return productCatalog;
      }
    } catch (e) {}
    return [];
  };

  const getCurrentSlug = () => {
    const fromData = document.querySelector('main')?.dataset.productSlug;
    if (fromData) return fromData.toLowerCase();
    return location.pathname.split('/').pop().toLowerCase();
  };

  const renderRelatedProducts = () => {
    const grid = document.getElementById('related-products-grid');
    const emptyState = document.getElementById('related-products-empty');

    if (!grid || !emptyState) return;

    const catalog = getCatalog();
    if (!catalog.length) {
      emptyState.hidden = false;
      return;
    }

    const currentSlug = getCurrentSlug();
    const currentProduct =
      catalog.find((p) => normalizeText(p.slug) === normalizeText(currentSlug)) ||
      catalog.find((p) => normalizeText(p.title) === normalizeText('AMEET Heavy Weight Iron Plancha'));

    const currentCategory = normalizeText(currentProduct?.category || 'Electric Irons');
    const currentTitle = normalizeText(currentProduct?.title || 'AMEET Heavy Weight Iron Plancha');

    const related = catalog
      .filter((product) => normalizeText(product.slug) !== normalizeText(currentSlug))
      .filter((product) => normalizeText(product.title) !== currentTitle)
      .map((product) => {
        const title = normalizeText(product.title);
        const category = normalizeText(product.category);
        let score = 0;

        if (category === currentCategory) score += 12;
        if (currentCategory.includes('iron') && category.includes('iron')) score += 8;
        if (title.includes('iron')) score += 4;
        if (title.includes('plancha')) score += 4;

        return { ...product, score };
      })
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 4);

    if (!related.length) {
      emptyState.hidden = false;
      return;
    }

    grid.innerHTML = related
      .map((product) => {
        const href = `./${product.slug}`;
        const image = normalizeImagePath(product.image);

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

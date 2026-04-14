(() => {
  const normalize = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

  const getCatalog = () => {
    if (Array.isArray(window.categoryCatalog) && window.categoryCatalog.length) return window.categoryCatalog;
    if (Array.isArray(window.productCatalog) && window.productCatalog.length) return window.productCatalog;
    return [];
  };

  const getCurrentPageData = () => {
    const main = document.querySelector('main');
    return {
      slug: normalize(main?.dataset.productSlug || location.pathname.split('/').pop()),
      title: main?.dataset.productTitle || '',
      category: main?.dataset.productCategory || '',
    };
  };

  const buildRelatedPool = (catalog, current) => {
    const currentTokens = normalize(current.title)
      .split(' ')
      .filter((word) => word.length > 2);

    const scored = catalog
      .filter((product) => normalize(product.link || '').split('/').pop() !== current.slug)
      .map((product) => {
        const title = normalize(product.name);
        const tags = Array.isArray(product.tags) ? product.tags.map(normalize) : [];

        let score = 0;

        if (tags.includes('smart-household-appliances')) score += 2;
        if (tags.includes('other-products')) score += 1;

        currentTokens.forEach((token) => {
          if (token && title.includes(token)) score += 5;
        });

        if (current.category && title.includes(normalize(current.category))) score += 2;

        if (current.title.toLowerCase().includes('iron') && title.includes('iron')) score += 10;
        if (current.title.toLowerCase().includes('kettle') && title.includes('kettle')) score += 10;
        if (current.title.toLowerCase().includes('microwave') && title.includes('microwave')) score += 10;
        if (current.title.toLowerCase().includes('refrigerator') && title.includes('refrigerator')) score += 10;
        if (current.title.toLowerCase().includes('vacuum') && title.includes('vacuum')) score += 10;
        if (current.title.toLowerCase().includes('water purifier') && title.includes('water purifier')) score += 10;

        return { ...product, score };
      })
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

    const firstPass = scored.slice(0, 4);

    if (firstPass.length >= 4) return firstPass;

    const used = new Set(firstPass.map((p) => p.link));
    const fallback = catalog
      .filter((product) => !used.has(product.link))
      .filter((product) => normalize(product.link || '').split('/').pop() !== current.slug)
      .slice(0, 4 - firstPass.length);

    return [...firstPass, ...fallback];
  };

  const renderRelatedProducts = () => {
    const grid = document.getElementById('related-products-grid');
    const emptyState = document.getElementById('related-products-empty');
    if (!grid || !emptyState) return;

    const catalog = getCatalog();
    if (!catalog.length) {
      emptyState.hidden = false;
      emptyState.textContent = 'No similar products found right now.';
      return;
    }

    const current = getCurrentPageData();

    const currentProduct =
      catalog.find((product) => normalize(product.link || '').split('/').pop() === current.slug) ||
      catalog.find((product) => normalize(product.name) === normalize(current.title));

    const related = buildRelatedPool(catalog, {
      slug: current.slug,
      title: currentProduct?.name || current.title || document.querySelector('h1')?.textContent || '',
      category: currentProduct?.tags?.includes('smart-household-appliances')
        ? 'Smart Household Appliances'
        : current.category || '',
    });

    if (!related.length) {
      emptyState.hidden = false;
      emptyState.textContent = 'No similar products found right now.';
      return;
    }

    grid.innerHTML = related.map((product) => {
      const href = `./${String(product.link || '').split('/').pop()}`;
      const image = String(product.image || '').startsWith('/')
        ? product.image
        : '/' + String(product.image || '').replace(/^\.\//, '');

      return `
        <div class="showcase">
          <div class="showcase-banner">
            <a href="${href}" class="showcase-img-box">
              <img src="${image}" alt="${product.name}" class="product-img default" width="300" loading="lazy">
              <img src="${image}" alt="${product.name}" class="product-img hover" width="300" loading="lazy">
            </a>
          </div>
          <div class="showcase-content">
            <a href="${href}" class="showcase-category">${product.tags?.[0] || 'Related Product'}</a>
            <h3><a href="${href}" class="showcase-title">${product.name}</a></h3>
            <div class="price-box"><p class="price">${product.price}</p></div>
          </div>
        </div>
      `;
    }).join('');
  };

  const init = () => {
    const tryRender = (attempt = 0) => {
      if (getCatalog().length) {
        renderRelatedProducts();
        return;
      }
      if (attempt < 30) {
        setTimeout(() => tryRender(attempt + 1), 100);
      } else {
        const emptyState = document.getElementById('related-products-empty');
        if (emptyState) {
          emptyState.hidden = false;
          emptyState.textContent = 'No similar products found right now.';
        }
      }
    };

    tryRender();
  };

  document.addEventListener('DOMContentLoaded', init);
})();

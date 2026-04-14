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
    if (Array.isArray(window.categoryCatalog) && window.categoryCatalog.length) return window.categoryCatalog;
    if (Array.isArray(window.productCatalog) && window.productCatalog.length) return window.productCatalog;
    return [];
  };

  const getPageData = () => {
    const main = document.querySelector('main');
    return {
      slug: normalize(main?.dataset.productSlug || location.pathname.split('/').pop()),
      title: main?.dataset.productTitle || document.querySelector('h1')?.textContent || '',
      category: main?.dataset.productCategory || document.querySelector('.detail-info .showcase-category')?.textContent || '',
    };
  };

  const scoreProduct = (product, current) => {
    const name = normalize(product.name);
    const tags = Array.isArray(product.tags) ? product.tags.map(normalize) : [];
    const currentTitle = normalize(current.title);
    const currentCategory = normalize(current.category);

    let score = 0;

    if (normalize(product.link || '').split('/').pop() === current.slug) return -999;

    if (currentCategory && tags.includes(currentCategory)) score += 12;
    if (currentCategory && name.includes(currentCategory)) score += 8;

    const currentTokens = currentTitle.split(' ').filter((w) => w.length > 2);
    currentTokens.forEach((token) => {
      if (name.includes(token)) score += 3;
    });

    if (currentTitle.includes('iron') && name.includes('iron')) score += 12;
    if (currentTitle.includes('kettle') && name.includes('kettle')) score += 12;
    if (currentTitle.includes('microwave') && name.includes('microwave')) score += 12;
    if (currentTitle.includes('refrigerator') && name.includes('refrigerator')) score += 12;
    if (currentTitle.includes('vacuum') && name.includes('vacuum')) score += 12;
    if (currentTitle.includes('water purifier') && name.includes('water purifier')) score += 12;

    return score;
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

    const current = getPageData();

    const related = catalog
      .map((product) => ({ ...product, score: scoreProduct(product, current) }))
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 4);

    if (!related.length) {
      emptyState.hidden = false;
      emptyState.textContent = 'No similar products found right now.';
      return;
    }

    grid.innerHTML = related.map((product) => {
      const href = `./${String(product.link || '').split('/').pop()}`;
      const image = normalizeImage(product.image);

      return `
        <div class="showcase">
          <div class="showcase-banner">
            <a href="${href}" class="showcase-img-box">
              <img src="${image}" alt="${product.name}" class="product-img default" width="300" height="300" loading="lazy">
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

      if (attempt < 40) {
        setTimeout(() => tryRender(attempt + 1), 100);
        return;
      }

      const emptyState = document.getElementById('related-products-empty');
      if (emptyState) {
        emptyState.hidden = false;
        emptyState.textContent = 'No similar products found right now.';
      }
    };

    tryRender();
  };

  document.addEventListener('DOMContentLoaded', init);
})();

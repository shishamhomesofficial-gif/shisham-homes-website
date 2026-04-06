'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

if (modal && modalCloseBtn && modalCloseOverlay) {
  const modalCloseFunc = function () { modal.classList.add('closed'); };

  modalCloseOverlay.addEventListener('click', modalCloseFunc);
  modalCloseBtn.addEventListener('click', modalCloseFunc);
}

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

if (notificationToast && toastCloseBtn) {
  toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
  });
}

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

if (mobileMenuOpenBtn.length && mobileMenu.length && mobileMenuCloseBtn.length && overlay) {
  for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    const mobileMenuCloseFunc = function () {
      mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    };

    mobileMenuOpenBtn[i].addEventListener('click', function () {
      mobileMenu[i].classList.add('active');
      overlay.classList.add('active');
    });

    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    overlay.addEventListener('click', mobileMenuCloseFunc);
  }
}

// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

if (accordionBtn.length && accordion.length) {
  for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener('click', function () {
      const clickedBtn = this.nextElementSibling.classList.contains('active');

      for (let j = 0; j < accordion.length; j++) {
        if (clickedBtn) break;

        if (accordion[j].classList.contains('active')) {
          accordion[j].classList.remove('active');
          accordionBtn[j].classList.remove('active');
        }
      }

      this.nextElementSibling.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}

// navigation link helpers
const getSiteRelativePath = function (targetPath) {
  const currentPath = window.location.pathname || '';
  const isProductDetailPage = currentPath.includes('/products/');
  return `${isProductDetailPage ? '../' : './'}${targetPath}`;
};

const getProductDetailPath = function (productFileName) {
  const currentPath = window.location.pathname || '';
  const isProductDetailPage = currentPath.includes('/products/');
  return `${isProductDetailPage ? './' : './products/'}${productFileName}`;
};

const resolveNavigationTarget = function (labelText) {
  const normalisedLabel = String(labelText || '').trim().toLowerCase();

  if (!normalisedLabel) {
    return null;
  }

  if (normalisedLabel.includes('home')) return getSiteRelativePath('index.html');
  if (normalisedLabel.includes('checkout')) return getSiteRelativePath('checkout.html');
  if (normalisedLabel.includes('category') || normalisedLabel.includes('shop') || normalisedLabel.includes('all product')) return getSiteRelativePath('index.html');
  if (normalisedLabel.includes('refrigerator') || normalisedLabel.includes('refrigeration')) return getSiteRelativePath('category-refrigerators.html');
  if (normalisedLabel.includes('tv')) return getSiteRelativePath('category-tv.html');
  if (normalisedLabel.includes('microwave') || normalisedLabel.includes('oven')) return getSiteRelativePath('category-microwaves-ovens.html');
  if (normalisedLabel.includes('kitchen') || normalisedLabel.includes('cooking') || normalisedLabel.includes('induction') || normalisedLabel.includes('kettle')) return getSiteRelativePath('category-smart-kitchen-appliances.html');
  if (normalisedLabel.includes('laundry') || normalisedLabel.includes('washing') || normalisedLabel.includes('household')) return getSiteRelativePath('category-smart-household-appliances.html');
  if (normalisedLabel.includes('other product') || normalisedLabel.includes('other appliance') || normalisedLabel.includes('accessor')) return getSiteRelativePath('category-other-products.html');
  if (normalisedLabel.includes('vacuum') || normalisedLabel.includes('washer')) return getSiteRelativePath('category-smart-household-appliances.html');
  if (normalisedLabel.includes('fridge') || normalisedLabel.includes('door refrigerator')) return getSiteRelativePath('category-refrigerators.html');
  if (normalisedLabel.includes('smart tv') || normalisedLabel.includes('android smart tv') || normalisedLabel.includes('samsung tv') || normalisedLabel.includes('sony tv')) return getSiteRelativePath('category-tv.html');
  if (normalisedLabel.includes('blog') || normalisedLabel.includes('offer')) return getSiteRelativePath('index.html');

  return null;
};

const productSearchIndex = [
  {
    keywords: ['samsung ce76jd', 'ce76jd', 'curd making microwave', 'samsung convection microwave'],
    path: getProductDetailPath('samsung-ce76jd-b1-im-21l-convection-microwave-with-curd-making-technology.html'),
  },
  {
    keywords: ['panasonic nn-st266byte', 'nn-st266byte', 'solo microwave'],
    path: getProductDetailPath('panasonic-nn-st266byte-solo-microwave.html'),
  },
  {
    keywords: ['sansui ss-vc16m37', 'ss-vc16m37', 'sansui vacuum cleaner'],
    path: getProductDetailPath('sansui-ss-vc16m37-1600w-bag-type-vacuum-cleaner.html'),
  },
  {
    keywords: ['electric kettle wb-ek188', 'wb-ek188', 'webor kettle'],
    path: getProductDetailPath('electric-kettle-wb-ek188-1-8l.html'),
  },
  {
    keywords: ['orbit infrared cooker', 'ok-20p46ica', 'orbit cooker'],
    path: getProductDetailPath('orbit-infrared-cooker-ok-20p46ica-ya.html'),
  },
  {
    keywords: ['panasonic nn-ct645byte', 'nn-ct645byte', 'panasonic convection grill microwave'],
    path: getProductDetailPath('panasonic-nn-ct645byte-convection-grill-microwave.html'),
  },
  {
    keywords: ['himstar hk-20d1ici', 'hk-20d1ici', 'himstar induction cooker'],
    path: getProductDetailPath('himstar-hk-20d1ici-ye-induction-cooker.html'),
  },
  {
    keywords: ['himstar hv-22703wdj', 'hv-22703wdj', 'himstar vacuum cleaner'],
    path: getProductDetailPath('himstar-hv-22703wdj-se-vacuum-cleaner.html'),
  },
  {
    keywords: ['panasonic nn-ct36hbyte', 'nn-ct36hbyte', 'panasonic grill microwave'],
    path: getProductDetailPath('panasonic-nn-ct36hbyte-convection-grill-microwave.html'),
  },
  {
    keywords: ['samsung smart microwave'],
    path: getProductDetailPath('samsung-smart-microwave.html'),
  },
  {
    keywords: ['samsung smart microwave with curd making technology'],
    path: getProductDetailPath('samsung-smart-microwave-with-curd-making-technology.html'),
  },
  {
    keywords: ['panasonic smart microwave oven', 'panasonic smart microwave'],
    path: getProductDetailPath('panasonic-smart-microwave-oven.html'),
  },
  {
    keywords: ['panasonic nn-ct645byte convection grill microwave'],
    path: getProductDetailPath('panasonic-nn-ct645byte-convection-grill-microwave.html'),
  },
  {
    keywords: ['home appliance accessory bundle', 'appliance accessory bundle'],
    path: getProductDetailPath('home-appliance-accessory-bundle.html'),
  },
  {
    keywords: ['webor electric kettle'],
    path: getProductDetailPath('webor-electric-kettle.html'),
  },
  {
    keywords: ['sansui vacuum cleaner'],
    path: getProductDetailPath('sansui-vacuum-cleaner.html'),
  },
];

const resolveSearchTarget = function (query) {
  const normalisedQuery = String(query || '').trim().toLowerCase();

  if (!normalisedQuery) {
    return null;
  }

  const navigationTarget = resolveNavigationTarget(normalisedQuery);
  if (navigationTarget) {
    return navigationTarget;
  }

  const queryTokens = normalisedQuery.split(/[^a-z0-9]+/).filter(Boolean);
  let bestMatch = null;

  productSearchIndex.forEach(function (productEntry) {
    const joinedKeywords = productEntry.keywords.join(' ');

    const directMatch = productEntry.keywords.some(function (keyword) {
      return keyword.includes(normalisedQuery) || normalisedQuery.includes(keyword);
    });

    const tokenHits = queryTokens.reduce(function (count, token) {
      return count + (joinedKeywords.includes(token) ? 1 : 0);
    }, 0);

    const score = directMatch ? 100 : tokenHits;

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = {
        score,
        path: productEntry.path,
      };
    }
  });

  if (bestMatch && bestMatch.score > 0) {
    return bestMatch.path;
  }

  return null;
};

const getSearchResultsPagePath = function (query) {
  const trimmedQuery = String(query || '').trim();
  const baseIndexPath = getSiteRelativePath('index.html');

  if (!trimmedQuery) {
    return baseIndexPath;
  }

  return `${baseIndexPath}?search=${encodeURIComponent(trimmedQuery)}`;
};

const setGlobalSearch = function () {
  const searchContainers = document.querySelectorAll('.header-search-container');

  searchContainers.forEach(function (searchContainer) {
    const searchInput = searchContainer.querySelector('.search-field');
    const searchButton = searchContainer.querySelector('.search-btn');

    if (!searchInput || !searchButton) {
      return;
    }

    const runSearch = function () {
      const rawQuery = String(searchInput.value || '').trim();

      if (!rawQuery) {
        window.alert('Please enter a product or category to search.');
        searchInput.focus();
        return;
      }

      const currentPath = window.location.pathname || '';
      const isHomePage = /(^|\/)index\.html$/.test(currentPath) || currentPath === '/' || currentPath === '';

      if (isHomePage) {
        window.dispatchEvent(new CustomEvent('shisham-global-search', {
          detail: {
            query: rawQuery,
            directTarget: resolveSearchTarget(rawQuery),
          },
        }));

        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('search', rawQuery);
        window.history.replaceState({}, '', nextUrl.toString());
        return;
      }

      window.location.href = getSearchResultsPagePath(rawQuery);
    };

    searchButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        runSearch();
      }
    });
  });
};

const normaliseSearchTokens = function (value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
};

const getTokenDistance = function (a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, function (_, rowIndex) {
    return Array.from({ length: a.length + 1 }, function (_, columnIndex) {
      if (rowIndex === 0) return columnIndex;
      if (columnIndex === 0) return rowIndex;
      return 0;
    });
  });

  for (let row = 1; row <= b.length; row++) {
    for (let column = 1; column <= a.length; column++) {
      const substitutionCost = b[row - 1] === a[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
};

const matchesSearchText = function (searchText, query) {
  const normalisedSearchText = String(searchText || '').toLowerCase();
  const normalisedQuery = String(query || '').toLowerCase().trim();

  if (!normalisedQuery) {
    return true;
  }

  if (normalisedSearchText.includes(normalisedQuery)) {
    return true;
  }

  const searchTokens = normaliseSearchTokens(normalisedSearchText);
  const queryTokens = normaliseSearchTokens(normalisedQuery);

  if (!queryTokens.length) {
    return true;
  }

  return queryTokens.every(function (queryToken) {
    if (queryToken.length < 2) {
      return searchTokens.includes(queryToken);
    }

    return searchTokens.some(function (searchToken) {
      return searchToken.includes(queryToken)
        || queryToken.includes(searchToken)
        || (searchToken.length > 2 && getTokenDistance(searchToken, queryToken) <= 1);
    });
  });
};

const applyHomepageSearchResultsMode = function (query) {
  const currentPath = window.location.pathname || '';
  const isHomePage = /(^|\/)index\.html$/.test(currentPath) || currentPath === '/' || currentPath === '';

  if (!isHomePage) {
    return;
  }

  const trimmedQuery = String(query || '').trim();
  const mainElement = document.querySelector('main');
  const productContainer = document.querySelector('.product-container');
  const productMain = productContainer ? productContainer.querySelector('.product-main') : null;

  if (!mainElement || !productContainer || !productMain) {
    return;
  }

  const isSearchMode = Boolean(trimmedQuery);

  Array.from(mainElement.children).forEach(function (mainChild) {
    if (mainChild === productContainer) {
      mainChild.style.display = '';
      return;
    }

    mainChild.style.display = isSearchMode ? 'none' : '';
  });

  const hiddenSelectors = ['.sidebar', '.product-minimal', '.product-featured'];
  hiddenSelectors.forEach(function (selector) {
    const sectionElement = productContainer.querySelector(selector);
    if (sectionElement) {
      sectionElement.style.display = isSearchMode ? 'none' : '';
    }
  });

  const productCards = Array.from(productMain.querySelectorAll('.product-grid > .showcase'));
  let matchedProductCount = 0;

  productCards.forEach(function (cardElement) {
    const text = cardElement.textContent || '';
    const show = matchesSearchText(text, trimmedQuery);
    cardElement.style.display = show ? '' : 'none';
    if (show) {
      matchedProductCount += 1;
    }
  });

  let searchHeading = productMain.querySelector('[data-search-results-heading]');
  if (!searchHeading) {
    searchHeading = document.createElement('h2');
    searchHeading.className = 'title';
    searchHeading.setAttribute('data-search-results-heading', '');
    searchHeading.style.display = 'none';
    searchHeading.style.marginBottom = '16px';
    productMain.insertAdjacentElement('afterbegin', searchHeading);
  }

  if (isSearchMode) {
    searchHeading.textContent = `Search results for "${trimmedQuery}"`;
    searchHeading.style.display = 'block';
  } else {
    searchHeading.style.display = 'none';
    searchHeading.textContent = '';
  }

  let noResultsElement = productMain.querySelector('[data-search-no-results]');
  if (!noResultsElement) {
    noResultsElement = document.createElement('p');
    noResultsElement.setAttribute('data-search-no-results', '');
    noResultsElement.textContent = 'No results found';
    noResultsElement.style.display = 'none';
    noResultsElement.style.fontWeight = '600';
    noResultsElement.style.marginTop = '12px';
    productMain.appendChild(noResultsElement);
  }

  noResultsElement.style.display = isSearchMode && matchedProductCount === 0 ? 'block' : 'none';
};

const ensureProductPagesUseMainNavigation = function () {
  const currentPath = window.location.pathname || '';
  const isProductPage = currentPath.includes('/products/');
  const headerElement = document.querySelector('header');

  if (!isProductPage || !headerElement || headerElement.querySelector('.desktop-navigation-menu')) {
    return;
  }

  const headerMainContainer = headerElement.querySelector('.header-main .container');
  if (headerMainContainer && !headerMainContainer.querySelector('.header-search-container')) {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'header-search-container';
    searchContainer.innerHTML = `
      <input type="search" name="search" class="search-field" placeholder="Enter your product name...">
      <button class="search-btn"><ion-icon name="search-outline"></ion-icon></button>
    `;
    headerMainContainer.appendChild(searchContainer);
  }

  const desktopNav = document.createElement('nav');
  desktopNav.className = 'desktop-navigation-menu';
  desktopNav.innerHTML = `
    <div class="container">
      <ul class="desktop-menu-category-list">
        <li class="menu-category"><a href="#" class="menu-title">Home</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Categories</a></li>
        <li class="menu-category"><a href="#" class="menu-title">TV</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Refrigerators</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Cooking</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Laundry</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Blog</a></li>
        <li class="menu-category"><a href="#" class="menu-title">Hot Offers</a></li>
      </ul>
    </div>
  `;

  const mobileBottomNav = document.createElement('div');
  mobileBottomNav.className = 'mobile-bottom-navigation';
  mobileBottomNav.innerHTML = `
    <button class="action-btn" data-mobile-menu-open-btn><ion-icon name="menu-outline"></ion-icon></button>
    <button class="action-btn"><ion-icon name="home-outline"></ion-icon></button>
    <button class="action-btn"><ion-icon name="bag-handle-outline"></ion-icon></button>
  `;

  const mobileMenu = document.createElement('nav');
  mobileMenu.className = 'mobile-navigation-menu has-scrollbar';
  mobileMenu.setAttribute('data-mobile-menu', '');
  mobileMenu.innerHTML = `
    <div class="menu-top">
      <h2 class="menu-title">Menu</h2>
      <button class="menu-close-btn" data-mobile-menu-close-btn><ion-icon name="close-outline"></ion-icon></button>
    </div>
    <ul class="mobile-menu-category-list">
      <li class="menu-category"><a href="#" class="menu-title">Home</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Categories</a></li>
      <li class="menu-category"><a href="#" class="menu-title">TV</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Refrigerators</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Cooking</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Laundry</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Blog</a></li>
      <li class="menu-category"><a href="#" class="menu-title">Hot Offers</a></li>
    </ul>
  `;

  headerElement.appendChild(desktopNav);
  headerElement.insertAdjacentElement('afterend', mobileBottomNav);
  mobileBottomNav.insertAdjacentElement('afterend', mobileMenu);

  const overlayElement = document.querySelector('[data-overlay]');
  const productMobileMenu = mobileMenu;
  const openButton = mobileBottomNav.querySelector('[data-mobile-menu-open-btn]');
  const closeButton = mobileMenu.querySelector('[data-mobile-menu-close-btn]');

  if (overlayElement && productMobileMenu && openButton && closeButton) {
    const closeMenu = function () {
      productMobileMenu.classList.remove('active');
      overlayElement.classList.remove('active');
    };

    openButton.addEventListener('click', function () {
      productMobileMenu.classList.add('active');
      overlayElement.classList.add('active');
    });
    closeButton.addEventListener('click', closeMenu);
    overlayElement.addEventListener('click', closeMenu);
  }
};

const setGlobalNavigationLinks = function () {
  const placeholderLinks = document.querySelectorAll('a[href="#"], a[href=""], a[href="javascript:void(0)"]');

  placeholderLinks.forEach(function (linkElement) {
    if (linkElement.classList.contains('social-link')) {
      return;
    }

    const labelText = linkElement.getAttribute('aria-label')
      || linkElement.getAttribute('title')
      || linkElement.textContent;
    const targetPath = resolveNavigationTarget(labelText);

    if (targetPath) {
      linkElement.setAttribute('href', targetPath);
      return;
    }

    if (linkElement.classList.contains('header-logo') || linkElement.closest('.header-logo')) {
      linkElement.setAttribute('href', getSiteRelativePath('index.html'));
      return;
    }

    if (linkElement.classList.contains('banner-btn')) {
      linkElement.setAttribute('href', getSiteRelativePath('index.html'));
    }
  });
};

const setGlobalNavigationButtons = function () {
  const iconButtons = document.querySelectorAll('button.action-btn, button.search-btn');

  iconButtons.forEach(function (buttonElement) {
    if (buttonElement.dataset.mobileMenuOpenBtn !== undefined || buttonElement.dataset.mobileMenuCloseBtn !== undefined) {
      return;
    }

    const iconElement = buttonElement.querySelector('ion-icon');
    const iconName = (iconElement && iconElement.getAttribute('name')) ? iconElement.getAttribute('name').toLowerCase() : '';
    let redirectPath = null;

    if (buttonElement.classList.contains('search-btn')) {
      const linkedSearchField = buttonElement.parentElement ? buttonElement.parentElement.querySelector('.search-field') : null;
      if (linkedSearchField) {
        return;
      }
      redirectPath = getSiteRelativePath('index.html');
    } else if (iconName.includes('home')) {
      redirectPath = getSiteRelativePath('index.html');
    } else if (iconName.includes('bag')) {
      redirectPath = getSiteRelativePath('index.html');
    } else if (iconName.includes('person') || iconName.includes('heart')) {
      redirectPath = getSiteRelativePath('index.html');
    }

    if (redirectPath) {
      buttonElement.addEventListener('click', function () {
        window.location.href = redirectPath;
      });
    }
  });
};

ensureProductPagesUseMainNavigation();
setGlobalNavigationLinks();
setGlobalSearch();
setGlobalNavigationButtons();

const searchQueryFromUrl = new URLSearchParams(window.location.search).get('search') || '';
if (searchQueryFromUrl) {
  applyHomepageSearchResultsMode(searchQueryFromUrl);
}

window.addEventListener('shisham-global-search', function (event) {
  const query = event && event.detail ? event.detail.query : '';
  applyHomepageSearchResultsMode(query);
});

const disableCartUi = function () {
  const cartCountElements = document.querySelectorAll('[data-cart-count]');
  cartCountElements.forEach(function (countElement) {
    countElement.textContent = '';
  });

  const bagButtons = document.querySelectorAll('button.action-btn ion-icon[name*="bag"]');
  bagButtons.forEach(function (iconElement) {
    const actionButton = iconElement.closest('button');
    if (actionButton) {
      actionButton.style.display = 'none';
    }
  });

  const cartWrappers = document.querySelectorAll('.cart-wrapper, [data-cart-items], [data-cart-empty], [data-cart-checkout-btn]');
  cartWrappers.forEach(function (element) {
    const block = element.classList.contains('cart-wrapper') ? element : element.closest('.cart-wrapper') || element;
    block.style.display = 'none';
  });
};

disableCartUi();

// ecommerce helpers
const CHECKOUT_PRODUCT_KEY = 'shishamHomesDirectCheckoutItem';
const EMAILJS_USER_ID = '1wIn1t-E9_XTOQ0pG';
const EMAILJS_SERVICE_ID = 'service_t7ls3th';
const EMAILJS_TEMPLATE_ID = 'template_5xtv29f';
const ORDER_RECEIVER_EMAIL = 'shishamshomesofficial@gmail.com';

const ensureText = function (value, fallback) {
  const normalised = String(value || '').trim();
  return normalised || fallback;
};

const buildEmailTemplateParams = function (orderData) {
  const orderDate = new Date().toLocaleString('en-GB');
  const safeOrderData = {
    toEmail: ensureText(orderData.toEmail, ORDER_RECEIVER_EMAIL),
    orderReference: ensureText(orderData.orderReference, `SH-${Date.now().toString().slice(-8)}`),
    fullName: ensureText(orderData.fullName, 'Not provided'),
    phone: ensureText(orderData.phone, 'Not provided'),
    email: ensureText(orderData.email, 'Not provided'),
    address: ensureText(orderData.address, 'Not provided'),
    city: ensureText(orderData.city, 'Not provided'),
    landmark: ensureText(orderData.landmark, 'Not provided'),
    deliveryDate: ensureText(orderData.deliveryDate, 'No specific date'),
    deliveryTime: ensureText(orderData.deliveryTime, 'No specific time slot'),
    orderNotes: ensureText(orderData.orderNotes, 'No additional notes'),
    paymentMethod: ensureText(orderData.paymentMethod, 'Cash on Delivery'),
    productsText: ensureText(orderData.productsText, 'No products selected'),
    orderDate,
  };

  const emailBody = `Order Reference: ${safeOrderData.orderReference}\nFull Name: ${safeOrderData.fullName}\nPhone Number: ${safeOrderData.phone}\nEmail: ${safeOrderData.email}\nShipping Address: ${safeOrderData.address}\nCity: ${safeOrderData.city}\nNearest Landmark: ${safeOrderData.landmark}\nPreferred Delivery Date: ${safeOrderData.deliveryDate}\nPreferred Delivery Time: ${safeOrderData.deliveryTime}\nOrder Notes: ${safeOrderData.orderNotes}\nPayment Method: ${safeOrderData.paymentMethod}\nOrder Date: ${safeOrderData.orderDate}\n\nProducts:\n${safeOrderData.productsText}`;

  return {
    // current template keys
    to_email: safeOrderData.toEmail,
    order_reference: safeOrderData.orderReference,
    full_name: safeOrderData.fullName,
    phone: safeOrderData.phone,
    email: safeOrderData.email,
    address: safeOrderData.address,
    city: safeOrderData.city,
    landmark: safeOrderData.landmark,
    delivery_date: safeOrderData.deliveryDate,
    delivery_time: safeOrderData.deliveryTime,
    order_notes: safeOrderData.orderNotes,
    payment_method: safeOrderData.paymentMethod,
    order_date: safeOrderData.orderDate,
    products: safeOrderData.productsText,
    message: emailBody,
    // compatibility keys for common EmailJS templates
    name: safeOrderData.fullName,
    from_name: safeOrderData.fullName,
    customer_name: safeOrderData.fullName,
    customer_phone: safeOrderData.phone,
    customer_email: safeOrderData.email,
    customer_address: `${safeOrderData.address}, ${safeOrderData.city}`,
    customer_notes: safeOrderData.orderNotes,
    reply_to: safeOrderData.email,
    subject: `New order ${safeOrderData.orderReference} - ${safeOrderData.fullName}`,
  };
};

const normalisePrice = function (rawPrice) {
  return (rawPrice || '').replace(/\s+/g, ' ').trim();
};

const createProductFromCard = function (cardElement) {
  const titleElement = cardElement.querySelector('.showcase-title');
  const priceElement = cardElement.querySelector('.price');
  const defaultImage = cardElement.querySelector('.product-img.default')
    || cardElement.querySelector('.showcase-img')
    || cardElement.querySelector('img');
  const hoverImage = cardElement.querySelector('.product-img.hover');

  if (!titleElement || !defaultImage) {
    return null;
  }

  const productName = titleElement.textContent.trim();
  const productPrice = priceElement ? normalisePrice(priceElement.textContent) : 'Rs 0';
  const fallbackImagePath = getSiteRelativePath('assets/images/products/Samsung-CE76JD-B1.jpg');

  return {
    id: `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${productPrice}`,
    name: productName,
    price: productPrice,
    images: Array.from(new Set([defaultImage.getAttribute('src') || fallbackImagePath, hoverImage ? hoverImage.getAttribute('src') : null].filter(Boolean))),
    category: cardElement.querySelector('.showcase-category') ? cardElement.querySelector('.showcase-category').textContent.trim() : 'Home Appliance',
    description: `Get ${productName} at Shisham Homes with trusted local support and fast checkout.`,
  };
};

const updateCartCount = function () {
  // shopping cart has been removed
};

const slugifyProductName = function (name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const getProductPageUrl = function (product) {
  return getSiteRelativePath(`products/${slugifyProductName(product.name)}.html`);
};

const PRODUCT_KEYWORD_ROUTES = [
  { keywords: ['samsung ce76jd', 'curd making'], page: 'samsung-ce76jd-b1-im-21l-convection-microwave-with-curd-making-technology.html' },
  { keywords: ['panasonic nn-st266byte'], page: 'panasonic-nn-st266byte-solo-microwave.html' },
  { keywords: ['panasonic nn-ct645byte'], page: 'panasonic-nn-ct645byte-convection-grill-microwave.html' },
  { keywords: ['panasonic nn-ct36hbyte'], page: 'panasonic-nn-ct36hbyte-convection-grill-microwave.html' },
  { keywords: ['himstar hk-20d1ici'], page: 'himstar-hk-20d1ici-ye-induction-cooker.html' },
  { keywords: ['himstar hv-22703wdj'], page: 'himstar-hv-22703wdj-se-vacuum-cleaner.html' },
  { keywords: ['sansui ss-vc16m37', 'vacuum cleaner'], page: 'sansui-ss-vc16m37-1600w-bag-type-vacuum-cleaner.html' },
  { keywords: ['electric kettle wb-ek188'], page: 'electric-kettle-wb-ek188-1-8l.html' },
  { keywords: ['webor electric kettle'], page: 'webor-electric-kettle.html' },
  { keywords: ['orbit infrared cooker'], page: 'orbit-infrared-cooker-ok-20p46ica-ya.html' },
  { keywords: ['samsung smart microwave with curd making technology'], page: 'samsung-smart-microwave-with-curd-making-technology.html' },
  { keywords: ['samsung smart microwave'], page: 'samsung-smart-microwave.html' },
  { keywords: ['panasonic smart microwave oven'], page: 'panasonic-smart-microwave-oven.html' },
  { keywords: ['sansui vacuum cleaner'], page: 'sansui-vacuum-cleaner.html' },
  { keywords: ['home appliance accessory bundle'], page: 'home-appliance-accessory-bundle.html' },
];

const getProductDetailUrl = function (productName) {
  const normalisedName = String(productName || '').trim().toLowerCase();
  const matchedProduct = PRODUCT_KEYWORD_ROUTES.find(function (route) {
    return route.keywords.every(function (keyword) {
      return normalisedName.includes(keyword);
    });
  });

  if (!matchedProduct) {
    return getProductPageUrl({ name: productName });
  }

  return getSiteRelativePath(`products/${matchedProduct.page}`);
};

const openProductPage = function (product) {
  mobileMenu.forEach(function (menuElement) {
    menuElement.classList.remove('active');
  });

  if (overlay) {
    overlay.classList.remove('active');
  }

  window.location.href = getProductDetailUrl(product.name);
};

const setProductPageLinks = function () {
  const allCards = document.querySelectorAll('.showcase');

  allCards.forEach(function (cardElement) {
    const product = createProductFromCard(cardElement);
    if (!product) {
      return;
    }

    const productUrl = getProductDetailUrl(product.name);
    const linkTargets = cardElement.querySelectorAll('.showcase-img-box, .showcase-content a');

    linkTargets.forEach(function (linkElement) {
      if (linkElement.tagName.toLowerCase() === 'a') {
        linkElement.setAttribute('href', productUrl);
      }
    });

    const actionButtons = cardElement.querySelectorAll('.btn-action');
    const viewButton = actionButtons[1];
    if (viewButton && viewButton.tagName.toLowerCase() === 'a') {
      viewButton.setAttribute('href', productUrl);
    }
  });
};

const detailSection = document.querySelector('[data-product-detail-section]');
const detailName = document.querySelector('[data-product-detail-name]');
const detailPrice = document.querySelector('[data-product-detail-price]');
const detailImages = document.querySelector('[data-product-detail-images]');
const detailCheckoutBtn = document.querySelector('[data-continue-checkout-btn]');

const handleProceedToCheckout = function (product) {
  if (product) {
    localStorage.setItem(CHECKOUT_PRODUCT_KEY, JSON.stringify(product));
  } else {
    localStorage.removeItem(CHECKOUT_PRODUCT_KEY);
  }

  const currentPath = window.location.pathname || '';
  const checkoutPath = currentPath.includes('/products/') ? '../checkout.html' : './checkout.html';
  window.location.href = checkoutPath;
};

if (detailSection && detailName && detailPrice && detailImages && detailCheckoutBtn) {
  const productCards = document.querySelectorAll('.product-main .showcase');

  productCards.forEach(function (cardElement) {
    const product = createProductFromCard(cardElement);
    if (!product) {
      return;
    }

    const actionButtons = cardElement.querySelectorAll('.btn-action');
    const viewButton = actionButtons[1];
    const checkoutButton = actionButtons[3];

    if (viewButton) {
      viewButton.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        openProductPage(product);
      });
    }

    if (checkoutButton) {
      checkoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        handleProceedToCheckout(product);
      });
    }
  });

  const featuredAddToCartButtons = document.querySelectorAll('.product-featured .add-cart-btn');
  featuredAddToCartButtons.forEach(function (buttonElement) {
    const featuredCard = buttonElement.closest('.showcase');
    if (!featuredCard) {
      return;
    }

    const titleElement = featuredCard.querySelector('.showcase-title');
    const priceElement = featuredCard.querySelector('.price');
    const imageElement = featuredCard.querySelector('.showcase-banner .showcase-img');
    if (!titleElement || !priceElement || !imageElement) {
      return;
    }

    const featuredProduct = {
      id: `${titleElement.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${normalisePrice(priceElement.textContent)}`,
      name: titleElement.textContent.trim(),
      price: normalisePrice(priceElement.textContent),
      images: [imageElement.getAttribute('src')],
    };

    buttonElement.textContent = 'Continue to checkout';

    buttonElement.addEventListener('click', function () {
      handleProceedToCheckout(featuredProduct);
    });
  });

  updateCartCount();
}

setProductPageLinks();

const allProductCards = document.querySelectorAll('.showcase');
allProductCards.forEach(function (cardElement) {
  const product = createProductFromCard(cardElement);
  if (!product) {
    return;
  }

  const detailTriggers = cardElement.querySelectorAll('.showcase-img-box, .showcase-content a:not(.showcase-category), .showcase-category');
  detailTriggers.forEach(function (triggerElement) {
    triggerElement.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openProductPage(product);
    });
  });

  const actionButtons = cardElement.querySelectorAll('.btn-action');

  actionButtons.forEach(function (actionButton) {
    actionButton.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      openProductPage(product);
    });
  });
});

const productCheckoutButton = document.querySelector('[data-product-page-checkout]');
if (productCheckoutButton) {
  productCheckoutButton.addEventListener('click', function () {
    const product = {
      id: productCheckoutButton.dataset.productId || slugifyProductName(productCheckoutButton.dataset.productName || 'product'),
      name: productCheckoutButton.dataset.productName || 'Selected Product',
      price: productCheckoutButton.dataset.productPrice || 'Rs 0',
      category: productCheckoutButton.dataset.productCategory || 'Home Appliance',
      description: productCheckoutButton.dataset.productDescription || '',
      sku: productCheckoutButton.dataset.productSku || 'N/A',
      warranty: productCheckoutButton.dataset.productWarranty || '1 year',
      delivery: productCheckoutButton.dataset.productDelivery || '2-4 days',
      images: [productCheckoutButton.dataset.productImage || './assets/images/products/Samsung-CE76JD-B1.jpg'],
    };

    handleProceedToCheckout(product);
  });
}


// product search
const allSearchContainers = document.querySelectorAll('.header-search-container');
const allSearchableCards = Array.from(document.querySelectorAll('.product-grid > .showcase, [data-category-grid] .showcase'));
const getSearchQueryParam = function () {
  return new URLSearchParams(window.location.search).get('search') || '';
};

const applySearch = function (query) {
  const cleanQuery = String(query || '').trim().toLowerCase();
  const searchSummary = document.querySelector('.search-results-status');
  const summaryElement = searchSummary || document.createElement('div');
  const productGrid = document.querySelector('.product-grid, [data-category-grid]');

  if (!searchSummary && productGrid) {
    summaryElement.className = 'search-results-status';
    summaryElement.setAttribute('aria-live', 'polite');
    productGrid.parentElement.insertBefore(summaryElement, productGrid);
  }

  if (!allSearchableCards.length) {
    return;
  }

  const searchLayoutSections = document.querySelectorAll('.category, .product-minimal, .product-featured, .sidebar, .testimonials-box, .cta-container, .service, .blog');
  searchLayoutSections.forEach(function (sectionElement) {
    sectionElement.classList.toggle('search-hidden-section', Boolean(cleanQuery));
  });

  let matches = 0;

  allSearchableCards.forEach(function (cardElement) {
    const cardText = `${cardElement.textContent || ''}`.toLowerCase();
    const visible = !cleanQuery || cardText.includes(cleanQuery);
    cardElement.classList.toggle('search-card-hidden', !visible);
    if (visible) {
      matches += 1;
    }
  });

  if (!summaryElement) {
    return;
  }

  if (!cleanQuery) {
    summaryElement.textContent = '';
    summaryElement.hidden = true;
    return;
  }

  summaryElement.hidden = false;
  summaryElement.textContent = matches
    ? `Showing ${matches} result${matches === 1 ? '' : 's'} for "${query}".`
    : `No products found for "${query}".`;
};

const submitSearch = function (searchInput) {
  const query = searchInput.value.trim();
  const hasProductsOnPage = allSearchableCards.length > 0;
  const isHomePage = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname === '/';

  if (!hasProductsOnPage || !isHomePage) {
    const targetPath = getSiteRelativePath(`index.html?search=${encodeURIComponent(query)}`);
    window.location.href = targetPath;
    return;
  }

  const url = new URL(window.location.href);
  if (query) {
    url.searchParams.set('search', query);
  } else {
    url.searchParams.delete('search');
  }
  window.history.replaceState({}, '', url.toString());
  applySearch(query);
};

allSearchContainers.forEach(function (searchContainer) {
  const searchField = searchContainer.querySelector('.search-field');
  const searchButton = searchContainer.querySelector('.search-btn');

  if (!searchField || !searchButton) {
    return;
  }

  const presetQuery = getSearchQueryParam();
  if (presetQuery) {
    searchField.value = presetQuery;
  }

  searchField.addEventListener('input', function () {
    if (!searchField.value.trim()) {
      applySearch('');
      return;
    }

    if (allSearchableCards.length > 0) {
      submitSearch(searchField);
    }
  });

  searchField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitSearch(searchField);
    }
  });

  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    submitSearch(searchField);
  });
});

applySearch(getSearchQueryParam());

// checkout page logic
const checkoutSummary = document.querySelector('[data-checkout-summary]');
const checkoutForm = document.querySelector('[data-checkout-form]');
const orderConfirmationModal = document.querySelector('[data-order-confirmation-modal]');
const orderConfirmationCloseButton = document.querySelector('[data-order-confirmation-close]');

if (checkoutSummary && checkoutForm) {
  const directProduct = localStorage.getItem(CHECKOUT_PRODUCT_KEY);
  const checkoutProducts = directProduct ? [JSON.parse(directProduct)] : [];
  const checkoutSubtotalElement = document.querySelector('[data-checkout-subtotal]');
  const checkoutDeliveryElement = document.querySelector('[data-checkout-delivery]');
  const checkoutTaxElement = document.querySelector('[data-checkout-tax]');
  const checkoutTotalElement = document.querySelector('[data-checkout-total]');
  const checkoutEtaElement = document.querySelector('[data-checkout-eta]');

  const parsePriceToNumber = function (rawPrice) {
    const numericValue = Number(String(rawPrice || '').replace(/[^0-9.]/g, ''));
    return Number.isNaN(numericValue) ? 0 : numericValue;
  };

  if (checkoutProducts.length) {
    const subtotal = checkoutProducts.reduce(function (sum, item) {
      return sum + parsePriceToNumber(item.price);
    }, 0);
    const deliveryCharge = subtotal >= 15000 ? 0 : 350;
    const estimatedTax = Math.round(subtotal * 0.13);
    const grandTotal = subtotal + deliveryCharge + estimatedTax;

    checkoutSummary.innerHTML = checkoutProducts
      .map(function (item, index) {
        return `<li>
          <strong>${index + 1}. ${item.name}</strong><br>
          Price: ${item.price}<br>
          SKU: ${item.sku || 'N/A'}<br>
          Category: ${item.category || 'Home Appliance'}<br>
          Warranty: ${item.warranty || '1 year'}<br>
          Delivery Window: ${item.delivery || '2-4 business days'}
        </li>`;
      })
      .join('');

    if (checkoutSubtotalElement) checkoutSubtotalElement.textContent = `Rs ${subtotal.toLocaleString()}`;
    if (checkoutDeliveryElement) checkoutDeliveryElement.textContent = deliveryCharge ? `Rs ${deliveryCharge.toLocaleString()}` : 'Free';
    if (checkoutTaxElement) checkoutTaxElement.textContent = `Rs ${estimatedTax.toLocaleString()}`;
    if (checkoutTotalElement) checkoutTotalElement.textContent = `Rs ${grandTotal.toLocaleString()}`;
    if (checkoutEtaElement) checkoutEtaElement.textContent = 'Estimated delivery: 2-4 business days in Kathmandu Valley';
  } else {
    checkoutSummary.innerHTML = '<li>No product selected yet. Please open a product page and choose "Continue to Checkout".</li>';
  }

  const toggleOrderConfirmationModal = function (shouldShow) {
    if (!orderConfirmationModal) {
      return;
    }

    orderConfirmationModal.hidden = !shouldShow;
    document.body.style.overflow = shouldShow ? 'hidden' : '';
  };

  if (orderConfirmationCloseButton) {
    orderConfirmationCloseButton.addEventListener('click', function () {
      toggleOrderConfirmationModal(false);
      window.location.href = './index.html';
    });
  }

  checkoutForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const fullName = ensureText(formData.get('fullName'), 'Not provided');
    const address = ensureText(formData.get('address'), 'Not provided');
    const phone = ensureText(formData.get('phone'), 'Not provided');
    const city = ensureText(formData.get('city'), 'Not provided');
    const landmark = ensureText(formData.get('landmark'), 'Not provided');
    const deliveryDate = ensureText(formData.get('deliveryDate'), 'No specific date');
    const deliveryTime = ensureText(formData.get('deliveryTime'), 'No specific time slot');
    const orderNotes = ensureText(formData.get('orderNotes'), 'No additional notes');
    const email = ensureText(formData.get('email'), 'Not provided');

    const productsText = checkoutProducts.length
      ? checkoutProducts.map(function (item, index) {
        return `${index + 1}. ${item.name} | Price: ${item.price} | SKU: ${item.sku || 'N/A'} | Category: ${item.category || 'Home Appliance'} | Warranty: ${item.warranty || '1 year'} | Delivery: ${item.delivery || '2-4 business days'}`;
      }).join('\n')
      : 'No products selected';

    const orderReference = `SH-${Date.now().toString().slice(-8)}`;
    const templateParams = buildEmailTemplateParams({
      toEmail: ORDER_RECEIVER_EMAIL,
      orderReference,
      fullName,
      phone,
      email,
      address,
      city,
      landmark,
      deliveryDate,
      deliveryTime,
      orderNotes,
      paymentMethod: 'Cash on Delivery',
      productsText,
    });
    const emailBody = templateParams.message;
    const submitButton = checkoutForm.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
    }

    try {
      if (!window.emailjs || typeof window.emailjs.send !== 'function') {
        throw new Error('EmailJS is not available.');
      }

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      checkoutForm.reset();
      localStorage.removeItem(CHECKOUT_PRODUCT_KEY);
      toggleOrderConfirmationModal(true);
    } catch (error) {
      const fallbackSubject = encodeURIComponent('New Order from Shisham Homes Website');
      const fallbackBody = encodeURIComponent(emailBody);
      window.location.href = `mailto:${ORDER_RECEIVER_EMAIL}?subject=${fallbackSubject}&body=${fallbackBody}`;
      alert('We could not submit automatically. Your email app has been opened so you can complete the order message.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Order';
      }
    }
  });
}

if (window.emailjs && typeof window.emailjs.init === 'function') {
  window.emailjs.init(EMAILJS_USER_ID);
}

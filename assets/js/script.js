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

const resolveNavigationTarget = function (labelText) {
  const normalisedLabel = String(labelText || '').trim().toLowerCase();

  if (!normalisedLabel) {
    return null;
  }

  if (normalisedLabel.includes('home')) return getSiteRelativePath('index.html');
  if (normalisedLabel.includes('checkout') || normalisedLabel.includes('cart') || normalisedLabel.includes('bag')) return getSiteRelativePath('checkout.html');
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
        buttonElement.addEventListener('click', function () {
          linkedSearchField.focus();
        });
        return;
      }
      redirectPath = getSiteRelativePath('index.html');
    } else if (iconName.includes('home')) {
      redirectPath = getSiteRelativePath('index.html');
    } else if (iconName.includes('bag')) {
      redirectPath = getSiteRelativePath('checkout.html');
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

setGlobalNavigationLinks();
setGlobalNavigationButtons();

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
  const cartCountElements = document.querySelectorAll('[data-cart-count]');

  cartCountElements.forEach(function (element) {
    element.textContent = '0';
  });
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
      event.stopPropagation();
      handleProceedToCheckout(product);
    });
  }
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
const searchField = document.querySelector('.header-search-container .search-field');
const searchButton = document.querySelector('.header-search-container .search-btn');
const homeMain = document.querySelector('main');
const homeProductMain = document.querySelector('.product-main');

if (searchField && searchButton && homeMain && homeProductMain) {
  const productCards = Array.from(homeProductMain.querySelectorAll('.product-grid > .showcase'));
  const productGrid = homeProductMain.querySelector('.product-grid');
  const searchSummary = document.createElement('div');
  searchSummary.className = 'search-results-status';
  searchSummary.setAttribute('aria-live', 'polite');
  searchSummary.hidden = true;

  if (productGrid) {
    homeProductMain.insertBefore(searchSummary, productGrid);
  }

  const hideSiblingBranches = function (targetElement, stopElement) {
    let node = targetElement;

    while (node && node.parentElement && node !== stopElement) {
      const parentNode = node.parentElement;

      Array.from(parentNode.children).forEach(function (siblingNode) {
        if (siblingNode !== node) {
          siblingNode.classList.add('search-hidden-section');
        }
      });

      node = parentNode;
    }
  };

  const resetSearchView = function () {
    document.body.classList.remove('search-active');
    document.querySelectorAll('.search-hidden-section').forEach(function (element) {
      element.classList.remove('search-hidden-section');
    });

    productCards.forEach(function (cardElement) {
      cardElement.classList.remove('search-card-hidden');
    });

    searchSummary.hidden = true;
    searchSummary.textContent = '';
  };

  const searchProducts = function () {
    const query = searchField.value.trim().toLowerCase();

    if (!query) {
      resetSearchView();
      return;
    }

    document.body.classList.add('search-active');
    hideSiblingBranches(homeProductMain, homeMain);

    let matchedProducts = 0;

    productCards.forEach(function (cardElement) {
      const title = cardElement.querySelector('.showcase-title') ? cardElement.querySelector('.showcase-title').textContent : '';
      const category = cardElement.querySelector('.showcase-category') ? cardElement.querySelector('.showcase-category').textContent : '';
      const price = cardElement.querySelector('.price') ? cardElement.querySelector('.price').textContent : '';
      const productText = `${title} ${category} ${price}`.toLowerCase();
      const isMatch = productText.includes(query);

      cardElement.classList.toggle('search-card-hidden', !isMatch);

      if (isMatch) {
        matchedProducts += 1;
      }
    });

    searchSummary.hidden = false;
    searchSummary.textContent = matchedProducts
      ? `Showing ${matchedProducts} result${matchedProducts === 1 ? '' : 's'} for "${searchField.value.trim()}".`
      : `No products found for "${searchField.value.trim()}". Clear search to return to the full homepage.`;
  };

  searchField.addEventListener('input', searchProducts);

  searchField.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      searchField.value = '';
      resetSearchView();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      searchProducts();
      homeProductMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    searchProducts();

    if (searchField.value.trim()) {
      homeProductMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

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

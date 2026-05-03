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

function initNavbar(root = document) {
  const rootElement = root === document ? document.documentElement : root;
  const mobileMenu = root.querySelector('[data-mobile-menu]');
  const overlay = root.querySelector('[data-overlay]');
  const openBtns = root.querySelectorAll('[data-mobile-menu-open-btn]');
  const closeBtn = root.querySelector('[data-mobile-menu-close-btn]');
  const accordionBtn = root.querySelectorAll('[data-accordion-btn]');
  const accordion = root.querySelectorAll('[data-accordion]');

  if (mobileMenu && overlay) {
    if (rootElement && rootElement.dataset.mobileMenuBound === 'true') {
      return;
    }
    const openMenu = function () {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
    };

    const closeMenu = function () {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        openMenu();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    overlay.addEventListener('click', closeMenu);

    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    let resizeRaf = null;
    window.addEventListener('resize', function () {
      if (resizeRaf) {
        window.cancelAnimationFrame(resizeRaf);
      }
      resizeRaf = window.requestAnimationFrame(function () {
        if (window.innerWidth > 768) {
          closeMenu();
        }
      });
    }, { passive: true });

    if (rootElement) {
      rootElement.dataset.mobileMenuBound = 'true';
    }
  }

  if (accordionBtn.length && accordion.length) {
    if (rootElement && rootElement.dataset.accordionBound === 'true') {
      return;
    }
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

    if (rootElement) {
      rootElement.dataset.accordionBound = 'true';
    }
  }
}

initNavbar(document);

const watchAsyncNavbarInjection = function () {
  const navbarMount = document.getElementById('navbar');

  if (!navbarMount || typeof MutationObserver === 'undefined') {
    return;
  }

  const initFromMount = function () {
    if (navbarMount.querySelector('[data-mobile-menu]')) {
      initNavbar(navbarMount);
    }
  };

  initFromMount();

  const observer = new MutationObserver(function () {
    initFromMount();
    if (navbarMount.querySelector('[data-mobile-menu]')) {
      observer.disconnect();
    }
  });

  observer.observe(navbarMount, { childList: true, subtree: true });
};

watchAsyncNavbarInjection();

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
  if (normalisedLabel.includes('category') || normalisedLabel.includes('shop')) return getSiteRelativePath('index.html');
  if (normalisedLabel.includes('refrigerator') || normalisedLabel.includes('refrigeration')) return getSiteRelativePath('category-refrigerators.html');
  if (normalisedLabel.includes('tv')) return getSiteRelativePath('category-tv.html');
  if (normalisedLabel.includes('microwave') || normalisedLabel.includes('oven')) return getSiteRelativePath('category-microwaves-ovens.html');
  if (normalisedLabel.includes('kitchen') || normalisedLabel.includes('cooking') || normalisedLabel.includes('induction')) return getSiteRelativePath('category-smart-kitchen-appliances.html');
  if (normalisedLabel.includes('laundry') || normalisedLabel.includes('washing') || normalisedLabel.includes('household')) return getSiteRelativePath('category-smart-household-appliances.html');
  if (normalisedLabel.includes('other product') || normalisedLabel.includes('other appliance')) return getSiteRelativePath('category-other-products.html');
  if (normalisedLabel.includes('blog')) return getSiteRelativePath('blog-energy-efficient-home-appliances-nepal.html');
  if (normalisedLabel.includes('offer')) return getSiteRelativePath('index.html');

  return null;
};

const setGlobalNavigationLinks = function () {
  const placeholderLinks = document.querySelectorAll('a[href="#"], a[href=""], a[href="javascript:void(0)"]');

  placeholderLinks.forEach(function (linkElement) {
    if (linkElement.closest('.desktop-navigation-menu')) {
      return;
    }

    if (linkElement.closest('[data-mobile-menu-open-btn], [data-mobile-menu-close-btn]')) {
      return;
    }

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

const optimiseImageLoading = function () {
  const allImages = document.querySelectorAll('img');
  const priorityImage = document.querySelector('.banner-img, .detail-image, .detail-images img, .showcase-banner img, .product-img');

  allImages.forEach(function (imageElement, imageIndex) {
    if (!imageElement.getAttribute('loading')) {
      const shouldPrioritise = imageElement === priorityImage || imageIndex === 0;
      imageElement.setAttribute('loading', shouldPrioritise ? 'eager' : 'lazy');
      if (!shouldPrioritise && !imageElement.getAttribute('fetchpriority')) {
        imageElement.setAttribute('fetchpriority', 'low');
      }
    }

    if (!imageElement.getAttribute('decoding')) {
      imageElement.setAttribute('decoding', 'async');
    }
  });
};

const ensureCanonicalUrl = function () {
  const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
  canonicalLink.setAttribute('rel', 'canonical');

  const currentUrl = new URL(window.location.href);
  currentUrl.hash = '';
  currentUrl.search = '';

  if (!canonicalLink.getAttribute('href')) {
    canonicalLink.setAttribute('href', currentUrl.toString());
  }

  if (!canonicalLink.parentNode) {
    document.head.appendChild(canonicalLink);
  }

  return canonicalLink.getAttribute('href') || currentUrl.toString();
};

const upsertMetaTag = function (selector, attrs) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.keys(attrs).forEach(function (key) {
      if (key !== 'content') tag.setAttribute(key, attrs[key]);
    });
    document.head.appendChild(tag);
  }
  if (attrs.content && !tag.getAttribute('content')) {
    tag.setAttribute('content', attrs.content);
  }
};

const enhanceSeoMetadata = function () {
  if (!document.head) {
    return;
  }

  const canonicalUrl = ensureCanonicalUrl();
  const title = (document.title || 'Shisham Homes').trim();
  const h1 = document.querySelector('h1');
  const fallbackDescription = h1
    ? `${h1.textContent.trim()} at Shisham Homes Kathmandu with genuine appliances and trusted service in Nepal.`
    : 'Shop genuine home appliances with trusted local support in Kathmandu at Shisham Homes.';

  upsertMetaTag('meta[name="description"]', { name: 'description', content: fallbackDescription });
  upsertMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' });
  upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Shisham Homes' });
  upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: fallbackDescription });
  upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: fallbackDescription });

  const ogImageTag = document.querySelector('meta[property="og:image"]');
  const twitterImageTag = document.querySelector('meta[name="twitter:image"]');
  const bestImage = document.querySelector('img[src]');
  if (bestImage) {
    const imageUrl = new URL(bestImage.getAttribute('src'), window.location.origin).toString();
    if (!ogImageTag) {
      upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    }
    if (!twitterImageTag) {
      upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    }
  }
};

const injectWebsiteSchema = function () {
  if (!document.head || document.querySelector('script[data-schema="website-search"]')) {
    return;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shisham Homes',
    url: 'https://www.shishamhomes.com.np/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.shishamhomes.com.np/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const schemaTag = document.createElement('script');
  schemaTag.type = 'application/ld+json';
  schemaTag.dataset.schema = 'website-search';
  schemaTag.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaTag);
};

const optimiseRenderingPerformance = function () {
  const heavySections = document.querySelectorAll('.product-main, .product-container, .blog, .category, .testimonial, footer');
  heavySections.forEach(function (section) {
    if (!section.style.contentVisibility) {
      section.style.contentVisibility = 'auto';
      section.style.containIntrinsicSize = '1px 800px';
    }
  });

  const firstMeaningfulImage = document.querySelector('.banner-img, .detail-image, .detail-images img, .showcase-banner img, .product-img');
  if (firstMeaningfulImage) {
    firstMeaningfulImage.setAttribute('loading', 'eager');
    firstMeaningfulImage.setAttribute('fetchpriority', 'high');
    firstMeaningfulImage.setAttribute('decoding', 'async');
  }

  const lazyFrames = document.querySelectorAll('iframe');
  lazyFrames.forEach(function (frame) {
    if (!frame.getAttribute('loading')) {
      frame.setAttribute('loading', 'lazy');
    }
    if (!frame.getAttribute('referrerpolicy')) {
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    }
  });
};

const runWhenIdle = function (callback, timeout) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(callback, { timeout: timeout || 1000 });
    return;
  }
  window.setTimeout(callback, Math.min(timeout || 1000, 300));
};

const runCoreEnhancements = function () {
  setGlobalNavigationLinks();
  setGlobalNavigationButtons();
  optimiseImageLoading();
  optimiseRenderingPerformance();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runCoreEnhancements, { once: true });
} else {
  runCoreEnhancements();
}

runWhenIdle(function () {
  enhanceSeoMetadata();
  injectWebsiteSchema();
}, 2000);

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
  const defaultImage = cardElement.querySelector('.product-img.default') || cardElement.querySelector('.showcase-img');
  const hoverImage = cardElement.querySelector('.product-img.hover');

  if (!titleElement || !priceElement || !defaultImage) {
    return null;
  }

  return {
    id: `${titleElement.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${normalisePrice(priceElement.textContent)}`,
    name: titleElement.textContent.trim(),
    price: normalisePrice(priceElement.textContent),
    images: Array.from(new Set([defaultImage.getAttribute('src'), hoverImage ? hoverImage.getAttribute('src') : null].filter(Boolean))),
    category: cardElement.querySelector('.showcase-category') ? cardElement.querySelector('.showcase-category').textContent.trim() : 'Home Appliance',
    description: `Get ${titleElement.textContent.trim()} at Shisham Homes with trusted local support and fast checkout.`,
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
  return `./products/${slugifyProductName(product.name)}.html`;
};

const openProductPage = function (product) {
  const openMenus = document.querySelectorAll('[data-mobile-menu].active');
  openMenus.forEach(function (menuElement) {
    menuElement.classList.remove('active');
  });

  const globalOverlay = document.querySelector('[data-overlay]');
  if (globalOverlay) {
    globalOverlay.classList.remove('active');
  }

  document.body.classList.remove('no-scroll');
  window.location.href = getProductPageUrl(product);
};

const setProductPageLinks = function () {
  const allCards = document.querySelectorAll('.showcase');

  allCards.forEach(function (cardElement) {
    const product = createProductFromCard(cardElement);
    if (!product) {
      return;
    }

    const productUrl = getProductPageUrl(product);
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

document.querySelectorAll('.desktop-navigation-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});

(function enhanceHomeAndCategoryUi() {
  const style = document.createElement('style');
  style.textContent = `
    .category-ui-panel{margin:18px 0 24px;padding:16px;border:1px solid #f0e7da;border-radius:14px;background:#fffaf3;box-shadow:0 10px 26px rgba(0,0,0,.06)}
    .category-ui-top{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
    .category-range-wrap{margin-top:10px}
    .category-range-grid{display:grid;grid-template-columns:1fr;gap:10px}
    .category-range-grid input{width:100%;accent-color:#c46d17}
    .category-range-labels{display:flex;justify-content:space-between;color:#555;font-size:.86rem;margin-top:6px}
    .category-page-wrapper .showcase{border:1px solid #f0f0f0;border-radius:12px;overflow:hidden;transition:.2s}
    .category-page-wrapper .showcase:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(0,0,0,.1)}
    .home-bottom-cta{margin:28px 0 10px}
  `;
  document.head.appendChild(style);

  const categoryPage = document.querySelector('[data-category-page]');
  if (!categoryPage) return;

  const sortBar = document.getElementById('sortBarContainer') || document.querySelector('.sort-bar');
  const grid = document.querySelector('[data-category-grid]');
  if (!sortBar || !grid) return;

  const parsePrice = (text) => Number((text || '').replace(/[^\d.]/g, '')) || 0;

  const getCards = () => Array.from(grid.querySelectorAll('.showcase'));
  const getPriceFromCard = (card) => parsePrice(card.querySelector('.price') ? card.querySelector('.price').textContent : '0');

  const setup = () => {
    const cards = getCards();
    if (!cards.length || document.querySelector('.category-ui-panel')) return;

    const prices = cards.map(getPriceFromCard).filter(Boolean);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    let selectedMax = max;

    const panel = document.createElement('div');
    panel.className = 'category-ui-panel';
    panel.innerHTML = `
      <div class="category-ui-top">
        <strong>Filter by Price</strong>
        <span id="categoryVisibleCount"></span>
      </div>
      <div class="category-range-wrap">
        <div class="category-range-grid">
          <input type="range" id="categoryPrice" min="${min}" max="${max}" step="100" value="${max}">
        </div>
        <div class="category-range-labels">
          <span>Rs ${min.toLocaleString()}</span>
          <span id="categoryMaxLabel">Up to Rs ${max.toLocaleString()}</span>
        </div>
      </div>
    `;

    sortBar.parentNode.insertBefore(panel, sortBar.nextSibling);
    const priceInput = panel.querySelector('#categoryPrice');
    const maxLabel = panel.querySelector('#categoryMaxLabel');
    const visibleCount = panel.querySelector('#categoryVisibleCount');

    const apply = () => {
      let visible = 0;
      getCards().forEach((card) => {
        const p = getPriceFromCard(card);
        const show = p <= selectedMax;
        card.style.display = show ? '' : 'none';
        if (show) visible += 1;
      });
      maxLabel.textContent = `Up to Rs ${selectedMax.toLocaleString()}`;
      visibleCount.textContent = `${visible} items`;
    };

    priceInput.addEventListener('input', () => {
      selectedMax = Number(priceInput.value);
      apply();
    });

    apply();

    const observer = new MutationObserver(() => {
      if (!document.body.contains(panel)) return;
      apply();
    });
    observer.observe(grid, { childList: true, subtree: true });
  };

  setup();
  const gridObserver = new MutationObserver(setup);
  gridObserver.observe(grid, { childList: true });
})();

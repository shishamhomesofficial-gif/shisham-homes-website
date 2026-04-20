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

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

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
  });

  observer.observe(navbarMount, { childList: true, subtree: true });
};

watchAsyncNavbarInjection();

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

if (mobileMenu.length && overlay) {
  const openMobileMenu = function () {
    mobileMenu.forEach(function (menuElement) {
      menuElement.classList.add('active');
    });

    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closeMobileMenu = function () {
    mobileMenu.forEach(function (menuElement) {
      menuElement.classList.remove('active');
    });

    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  mobileMenuOpenBtn.forEach(function (buttonElement) {
    buttonElement.addEventListener('click', function (event) {
      event.preventDefault();
      openMobileMenu();
    });
  });

  mobileMenuCloseBtn.forEach(function (buttonElement) {
    buttonElement.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  overlay.addEventListener('click', closeMobileMenu);

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
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

  allImages.forEach(function (imageElement, imageIndex) {
    if (!imageElement.getAttribute('loading')) {
      imageElement.setAttribute('loading', imageIndex === 0 ? 'eager' : 'lazy');
    }

    if (!imageElement.getAttribute('decoding')) {
      imageElement.setAttribute('decoding', 'async');
    }
  });
};

setGlobalNavigationLinks();
setGlobalNavigationButtons();
optimiseImageLoading();

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
  mobileMenu.forEach(function (menuElement) {
    menuElement.classList.remove('active');
  });

  if (overlay) {
    overlay.classList.remove('active');
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

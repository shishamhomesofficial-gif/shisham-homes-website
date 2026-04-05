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

// ecommerce helpers
const CART_STORAGE_KEY = 'shishamHomesCart';
const CHECKOUT_PRODUCT_KEY = 'shishamHomesDirectCheckoutItem';

const readCart = function () {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
};

const writeCart = function (cartItems) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
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
    images: [defaultImage.getAttribute('src'), hoverImage ? hoverImage.getAttribute('src') : defaultImage.getAttribute('src')].filter(Boolean),
  };
};

const addToCart = function (product) {
  const cartItems = readCart();
  cartItems.push(product);
  writeCart(cartItems);
  return cartItems;
};

const updateCartCount = function () {
  const cartCountElements = document.querySelectorAll('[data-cart-count]');
  const cartItems = readCart();

  cartCountElements.forEach(function (element) {
    element.textContent = cartItems.length;
  });
};

const detailSection = document.querySelector('[data-product-detail-section]');
const detailName = document.querySelector('[data-product-detail-name]');
const detailPrice = document.querySelector('[data-product-detail-price]');
const detailImages = document.querySelector('[data-product-detail-images]');
const detailCheckoutBtn = document.querySelector('[data-continue-checkout-btn]');
const cartItemsList = document.querySelector('[data-cart-items]');
const cartEmptyMessage = document.querySelector('[data-cart-empty]');
const cartCheckoutBtn = document.querySelector('[data-cart-checkout-btn]');

const renderCart = function () {
  if (!cartItemsList || !cartEmptyMessage) {
    return;
  }

  const cartItems = readCart();
  cartItemsList.innerHTML = '';

  if (!cartItems.length) {
    cartEmptyMessage.hidden = false;
    return;
  }

  cartEmptyMessage.hidden = true;

  cartItems.forEach(function (item, index) {
    const listItem = document.createElement('li');
    listItem.className = 'cart-item';
    listItem.innerHTML = `
      <img src="${item.images[0]}" alt="${item.name}" class="cart-item-thumb" width="60" height="60">
      <div class="cart-item-content">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
      </div>
      <button type="button" class="cart-remove-btn" data-remove-cart-item="${index}">Remove</button>
    `;
    cartItemsList.appendChild(listItem);
  });
};

const handleProceedToCheckout = function (product) {
  if (product) {
    localStorage.setItem(CHECKOUT_PRODUCT_KEY, JSON.stringify(product));
  } else {
    localStorage.removeItem(CHECKOUT_PRODUCT_KEY);
  }
  window.location.href = './checkout.html';
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
    const addToCartButton = actionButtons[3];

    if (viewButton) {
      viewButton.addEventListener('click', function (event) {
        event.preventDefault();
        detailName.textContent = product.name;
        detailPrice.textContent = product.price;
        detailImages.innerHTML = product.images
          .map(function (imagePath) {
            return `<img src="${imagePath}" alt="${product.name}" class="detail-image" width="200" height="200">`;
          })
          .join('');

        detailCheckoutBtn.onclick = function () {
          handleProceedToCheckout(product);
        };

        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (addToCartButton) {
      addToCartButton.addEventListener('click', function (event) {
        event.preventDefault();
        addToCart(product);
        updateCartCount();
        renderCart();
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

    buttonElement.addEventListener('click', function () {
      addToCart(featuredProduct);
      updateCartCount();
      renderCart();
    });
  });

  if (cartItemsList) {
    cartItemsList.addEventListener('click', function (event) {
      const removeButton = event.target.closest('[data-remove-cart-item]');
      if (!removeButton) {
        return;
      }

      const removeIndex = Number(removeButton.getAttribute('data-remove-cart-item'));
      const cartItems = readCart();
      cartItems.splice(removeIndex, 1);
      writeCart(cartItems);
      updateCartCount();
      renderCart();
    });
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', function () {
      handleProceedToCheckout(null);
    });
  }

  updateCartCount();
  renderCart();
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

if (checkoutSummary && checkoutForm) {
  const directProduct = localStorage.getItem(CHECKOUT_PRODUCT_KEY);
  const cartItems = readCart();
  const checkoutProducts = directProduct ? [JSON.parse(directProduct)] : cartItems;

  if (checkoutProducts.length) {
    checkoutSummary.innerHTML = checkoutProducts
      .map(function (item) {
        return `<li><strong>${item.name}</strong> - ${item.price}</li>`;
      })
      .join('');
  } else {
    checkoutSummary.innerHTML = '<li>No products selected yet. Please add products from the home page.</li>';
  }

  checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const fullName = formData.get('fullName');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const email = formData.get('email') || 'Not provided';

    const productsText = checkoutProducts.length
      ? checkoutProducts.map(function (item, index) { return `${index + 1}. ${item.name} (${item.price})`; }).join('%0D%0A')
      : 'No products selected';

    const emailBody = `Full Name: ${fullName}%0D%0AShipping Address: ${address}%0D%0APhone Number: ${phone}%0D%0AEmail: ${email}%0D%0APayment Method: Cash on Delivery%0D%0A%0D%0AProducts:%0D%0A${productsText}`;

    window.location.href = `mailto:shishamhomesofficial@gmail.com?subject=New Order from Shisham Homes Website&body=${emailBody}`;

    localStorage.removeItem(CHECKOUT_PRODUCT_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
  });
}

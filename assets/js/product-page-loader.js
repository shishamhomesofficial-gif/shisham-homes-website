/**
 * Renders a product page using a shared template.
 * @param {Object} product - Product data (see example below).
 * @param {string} containerSelector - CSS selector for the container where the template will be inserted.
 */
async function renderProductPage(product, containerSelector = '#product-content-container') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error('Product container not found.');
    return;
  }

  try {
    // 1. Fetch the layout template
    const response = await fetch('/components/product-layout.html');
    if (!response.ok) throw new Error(`Failed to load template: ${response.status}`);
    let template = await response.text();

    // 2. Replace simple placeholders
    template = template
      .replace(/{{title}}/g, product.title)
      .replace(/{{category}}/g, product.category)
      .replace(/{{priceDisplay}}/g, product.priceDisplay)
      .replace(/{{shortDescription}}/g, product.shortDescription)
      .replace(/{{imageSrc}}/g, product.imageSrc)
      .replace(/{{imageAlt}}/g, product.imageAlt)
      .replace(/{{productId}}/g, product.productId)
      .replace(/{{sku}}/g, product.sku)
      .replace(/{{warranty}}/g, product.warranty)
      .replace(/{{delivery}}/g, product.delivery)
      .replace(/{{whatsappLink}}/g, product.whatsappLink);

    // 3. Replace description HTML (triple braces placeholder)
    template = template.replace('{{{descriptionHtml}}}', product.descriptionHtml);

    // 4. Replace specs loop ({{#specs}} ... {{/specs}})
    const specsRegex = /{{#specs}}([\s\S]*?){{\/specs}}/;
    const specsMatch = template.match(specsRegex);
    if (specsMatch && product.specs) {
      const specTemplate = specsMatch[1];
      const specsHtml = product.specs.map(spec =>
        specTemplate
          .replace(/{{label}}/g, spec.label)
          .replace(/{{value}}/g, spec.value)
      ).join('');
      template = template.replace(specsRegex, specsHtml);
    } else {
      // Remove the placeholder if no specs are provided
      template = template.replace(specsRegex, '');
    }

    // 5. Insert the final HTML into the container
    container.innerHTML = template;

    // 6. Optionally dispatch an event so other scripts know the DOM is ready
    window.dispatchEvent(new CustomEvent('productPageRendered'));
  } catch (error) {
    console.error('Error rendering product page:', error);
    container.innerHTML = '<p>Sorry, something went wrong loading the product page.</p>';
  }
}

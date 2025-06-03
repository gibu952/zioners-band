document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Basic Structure and Data ---
    const products = [
        { id: 1, name: 'Zioners Band t-Shirt', price: 1500, image: 'MEDIA/zt.png', category: 'shirts', description: 'A stylish and comfortable shirt for all Zioners fans.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Grey'], images: ['MEDIA/zt.png', 'MEDIA/zt.png', 'MEDIA/zt.png'] },
        { id: 2, name: 'Zioners Hoodie', price: 2500, image: 'MEDIA/zHoodie.png', category: 'hoodies', description: 'Stay warm and stylish with this Zioners hoodie.', sizes: ['M', 'L', 'XL'], colors: ['Navy', 'Maroon'], images: ['MEDIA/zHoodie.png'] },
        { id: 3, name: 'Zioners Cap', price: 1000, image: 'MEDIA/zcap.png', category: 'caps', description: 'A trendy cap to complete your Zioners look.', colors: ['Black', 'Red', 'Blue'], images: ['MEDIA/zcap.png'] },
        { id: 4, name: 'Zioners Jacket', price: 3000, image: 'MEDIA/Jacket Design.png', category: 'jackets', description: 'A premium jacket for Zioners fans.', sizes: ['L', 'XL', 'XXL'], images: ['MEDIA/Jacket Design.png'] },
        { id: 6, name: 'Zioners Backpack', price: 2800, image: 'MEDIA/Backpack.png', category: 'bags', description: 'A durable backpack for everyday use.', images: ['MEDIA/Backpack.png'] },
        { id: 9, name: 'Zioners Water Bottle', price: 800, image: 'MEDIA/WaterBottle.png', category: 'bottles', description: 'Stay hydrated with this stylish bottle.', images: ['MEDIA/WaterBottle.png'] },

    ];

    let cart = [];
    // DOM Element References
    const productGrid = document.querySelector('.featured-merch .merch-grid');
    const filterButtons = document.querySelectorAll('.filters .filter-button');
    const searchBarForm = document.querySelector('.header-extras .search-bar');
    const searchInput = searchBarForm ? searchBarForm.querySelector('input[type="text"]') : null;

    // Product Popup Elements - Ensure these match your HTML structure for the popup
    const productPopup = document.querySelector('.product-popup'); // Should exist in HTML body
    const closePopupButton = productPopup ? productPopup.querySelector('.close-popup') : null;
    const popupImage = productPopup ? productPopup.querySelector('.popup-product-image') : null;
    const popupTitle = productPopup ? productPopup.querySelector('.popup-product-title') : null;
    const popupPrice = productPopup ? productPopup.querySelector('.popup-product-price') : null;
    const popupDescription = productPopup ? productPopup.querySelector('.popup-product-description') : null;
    const popupAddToCartButton = productPopup ? productPopup.querySelector('.popup-add-to-cart') : null;
    // Optional: If you add quantity to popup
    // const popupQuantityInput = productPopup ? productPopup.querySelector('#popup-quantity') : null;
    const mainProductDetailsSection = document.getElementById('product-details');
    const mainProductImagesContainer = mainProductDetailsSection ? mainProductDetailsSection.querySelector('.product-images') : null;
    const mainProductInfoContainer = mainProductDetailsSection ? mainProductDetailsSection.querySelector('.product-info') : null;
    const mainProductTitle = mainProductInfoContainer ? mainProductInfoContainer.querySelector('h2') : null;
    const mainProductMaterialP = mainProductInfoContainer ? mainProductInfoContainer.querySelectorAll('p')[0] : null; // Example, adjust if needed
    const mainProductFitP = mainProductInfoContainer ? mainProductInfoContainer.querySelectorAll('p')[1] : null; // Example
    const mainProductWashingP = mainProductInfoContainer ? mainProductInfoContainer.querySelectorAll('p')[2] : null; // Example
    const mainProductPriceP = mainProductInfoContainer ? mainProductInfoContainer.querySelectorAll('p')[3] : null; // Example
    const mainProductSizeSelect = document.getElementById('size');
    const mainProductColorSelect = document.getElementById('color');
    const mainProductQuantityInput = document.getElementById('quantity');
    const mainProductAddToCartButton = mainProductInfoContainer ? mainProductInfoContainer.querySelector('.add-to-cart-button') : null;
    const mainProductBuyNowButton = mainProductInfoContainer ? mainProductInfoContainer.querySelector('.buy-now-button') : null;

    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountSpans = document.querySelectorAll('.cart-count');
    const continueShoppingButton = document.querySelector('.cart-actions .continue-shopping');
    const checkoutButton = document.querySelector('.cart-actions .checkout');
    const deleteAllButton = document.querySelector('.cart-actions .delete-all-button');

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // --- Toast Notification ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // --- 2. Product Display Logic ---
    function renderProducts(productsArrayToDisplay) {
        if (!productGrid) {
            console.error("Product grid (.featured-merch .merch-grid) not found!");
            return;
        }
        productGrid.innerHTML = '';

        const rows = [];
        for (let i = 0; i < productsArrayToDisplay.length; i += 4) {
            rows.push(productsArrayToDisplay.slice(i, i + 4));
        }

        rows.forEach(rowProducts => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('merch-row');
            rowProducts.forEach(product => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('merch-item');
                itemDiv.innerHTML = `
                    <img src="${product.image || 'MEDIA/placeholder.jpg'}" alt="${product.name}" onerror="this.onerror=null;this.src='MEDIA/placeholder.jpg';">
                    <h3>${product.name}</h3>
                    <p>KES ${product.price.toFixed(2)}</p>
                    <p class="description">${product.description || 'No description available.'}</p>
                    <button class="quick-view-button" data-product-id="${product.id}">Quick View</button>
                `;
                rowDiv.appendChild(itemDiv);
            });
            productGrid.appendChild(rowDiv);
        });

        const quickViewButtons = productGrid.querySelectorAll('.quick-view-button');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                openQuickView(productId);
                updateMainProductDetails(productId);
            });
        });
    }

    // --- 3. "Quick View" Popup Functionality ---
    function openQuickView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || !productPopup) {
            console.error("Product or Popup not found for Quick View. Product ID:", productId);
            return;
        }

        if (popupImage) popupImage.src = product.image || 'MEDIA/placeholder.jpg';
        if (popupTitle) popupTitle.textContent = product.name;
        if (popupPrice) popupPrice.textContent = `KES ${product.price.toFixed(2)}`;
        if (popupDescription) popupDescription.textContent = product.description || 'Detailed description coming soon.';

        if (popupAddToCartButton) {
            popupAddToCartButton.dataset.productId = product.id;
            // If you add quantity input to popup:
            // const qtyInput = productPopup.querySelector('#popup-quantity');
            // if (qtyInput) qtyInput.value = 1;
        }

        productPopup.classList.add('visible'); // This class should make it display: flex and opacity: 1
        document.body.style.overflow = 'hidden';
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            if (productPopup) productPopup.classList.remove('visible');
            document.body.style.overflow = 'auto';
        });
    }

    if (productPopup) {
        productPopup.addEventListener('click', (event) => {
            // Close if clicking on the overlay itself, not the content
            if (event.target === productPopup) {
                productPopup.classList.remove('visible');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Event listener for "Add to Cart" button INSIDE THE POPUP
    if (popupAddToCartButton) {
        popupAddToCartButton.addEventListener('click', () => {
            const productId = parseInt(popupAddToCartButton.dataset.productId);
            if (productId) {
                // Assuming default quantity 1 and no specific size/color from popup for now
                // If you add selectors to popup, get their values here.
                // const quantity = productPopup.querySelector('#popup-quantity') ? parseInt(productPopup.querySelector('#popup-quantity').value) : 1;
                addToCart(productId, 1, null, null); // Add with default qty 1, no specific options
                if (productPopup) productPopup.classList.remove('visible'); // Close popup after adding
                document.body.style.overflow = 'auto';
            }
        });
    }


    // --- 4. "Product Details" Section Update ---
    function updateMainProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || !mainProductDetailsSection) return;

        if (mainProductImagesContainer) {
            mainProductImagesContainer.innerHTML = '';
            const imagesToDisplay = product.images && product.images.length > 0 ? product.images : [product.image];
            imagesToDisplay.forEach(imgPath => {
                if (imgPath) {
                    const img = document.createElement('img');
                    img.src = imgPath;
                    img.alt = `${product.name} view`;
                    img.onerror = function() { this.onerror=null; this.src='MEDIA/placeholder.jpg'; };
                    mainProductImagesContainer.appendChild(img);
                }
            });
        }

        if (mainProductTitle) mainProductTitle.textContent = product.name;

        // Update specific <p> tags if they exist and product has corresponding data
        // This requires your HTML to have these <p> tags in the expected order or with IDs
        if (mainProductMaterialP && product.material) mainProductMaterialP.textContent = `Material: ${product.material}`;
        else if (mainProductMaterialP) mainProductMaterialP.textContent = product.description || 'Detailed product information.'; // Fallback to description

        if (mainProductFitP && product.fit) mainProductFitP.textContent = `Fit: ${product.fit}`;
        else if (mainProductFitP) mainProductFitP.textContent = ''; // Clear if no fit info

        if (mainProductWashingP && product.washing) mainProductWashingP.textContent = `Washing Instructions: ${product.washing}`;
        else if (mainProductWashingP) mainProductWashingP.textContent = ''; // Clear

        if (mainProductPriceP) mainProductPriceP.textContent = `Price: KES ${product.price.toFixed(2)}`;


        if (mainProductSizeSelect) {
            mainProductSizeSelect.innerHTML = '';
            const sizeLabel = mainProductSizeSelect.previousElementSibling; // Assuming label is right before select
            if (product.sizes && product.sizes.length > 0) {
                product.sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.value = size;
                    option.textContent = size;
                    mainProductSizeSelect.appendChild(option);
                });
                if (sizeLabel) sizeLabel.style.display = 'block';
                mainProductSizeSelect.style.display = 'block';
            } else {
                if (sizeLabel) sizeLabel.style.display = 'none';
                mainProductSizeSelect.style.display = 'none';
            }
        }

        if (mainProductColorSelect) {
            mainProductColorSelect.innerHTML = '';
            const colorLabel = mainProductColorSelect.previousElementSibling;
            if (product.colors && product.colors.length > 0) {
                product.colors.forEach(color => {
                    const option = document.createElement('option');
                    option.value = color.toLowerCase();
                    option.textContent = color;
                    mainProductColorSelect.appendChild(option);
                });
                if (colorLabel) colorLabel.style.display = 'block';
                mainProductColorSelect.style.display = 'block';
            } else {
                if (colorLabel) colorLabel.style.display = 'none';
                mainProductColorSelect.style.display = 'none';
            }
        }

        if (mainProductQuantityInput) mainProductQuantityInput.value = 1;

        if (mainProductAddToCartButton) mainProductAddToCartButton.dataset.productId = product.id;
        if (mainProductBuyNowButton) mainProductBuyNowButton.dataset.productId = product.id;

        mainProductDetailsSection.style.display = 'flex';
        // Optional: Scroll to the details section if it's far down the page
        // mainProductDetailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- 5. Cart Functionality ---
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpans.forEach(span => {
            if (span) span.textContent = totalItems;
        });
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('zionersMerchCart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('zionersMerchCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        renderCartItems();
        updateCartCount();
    }
    }

    function addToCart(productId, quantity = 1, size = null, color = null) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error("Product not found for ID:", productId);
            return;
        }
        const cartItemId = `${productId}-${size || 'any'}-${color || 'any'}`;
        const existingItem = cart.find(item => item.cartItemId === cartItemId);

        if (existingItem) {
            existingItem.quantity += quantity;
            } else {
            cart.push({
                cartItemId, id: product.id, name: product.name, price: product.price,
                image: product.image, quantity: quantity, size: size, color: color,
        });
    }
        showToast(`${product.name} added to cart!`);
        renderCartItems();
        updateCartCount();
        saveCartToLocalStorage();
    }

    // Remove the global window.addToCartFromDetails if it exists from previous versions
    // The event listener will be attached directly.
    if (mainProductAddToCartButton) {
        // Remove previous listener if any to avoid duplicates
        // mainProductAddToCartButton.removeEventListener('click', existingListenerFunction); // You'd need to store the listener
        mainProductAddToCartButton.onclick = null; // Simpler way to remove inline onclick if it was there
        mainProductAddToCartButton.addEventListener('click', () => {
            const productId = parseInt(mainProductAddToCartButton.dataset.productId);
            const quantity = mainProductQuantityInput ? parseInt(mainProductQuantityInput.value) : 1;
            const size = mainProductSizeSelect && mainProductSizeSelect.style.display !== 'none' ? mainProductSizeSelect.value : null;
            const color = mainProductColorSelect && mainProductColorSelect.style.display !== 'none' ? mainProductColorSelect.value : null;

            if (productId && quantity > 0) {
                addToCart(productId, quantity, size, color);
            } else {
                alert("Please select a valid product and quantity.");
            }
        });
    }


    function renderCartItems() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
            if (deleteAllButton) deleteAllButton.disabled = true;
            if (checkoutButton) checkoutButton.disabled = true;
            return;
        }

        if (deleteAllButton) deleteAllButton.disabled = false;
        if (checkoutButton) checkoutButton.disabled = false;

        let cartTotal = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            cartTotal += itemSubtotal;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            let optionsDisplay = '';
            if (item.size) optionsDisplay += `<span>Size: ${item.size}</span>`;
            if (item.color) optionsDisplay += ` <span style="margin-left:10px;">Color: ${item.color}</span>`;

            itemDiv.innerHTML = `
                <img src="${item.image || 'MEDIA/placeholder.jpg'}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; margin-right: 15px;" onerror="this.onerror=null;this.src='MEDIA/placeholder.jpg';">
                <div style="flex-grow: 1;">
                    <h4>${item.name}</h4>
                    <p>Price: KES ${item.price.toFixed(2)}</p>
                    ${optionsDisplay ? `<p><small>${optionsDisplay}</small></p>` : ''}
                </div>
                <div style="display: flex; align-items: center; margin: 0 10px;">
                    <label for="qty-${item.cartItemId}" class="sr-only">Quantity for ${item.name}</label>
                    <input type="number" id="qty-${item.cartItemId}" value="${item.quantity}" min="1" data-cart-item-id="${item.cartItemId}" style="width: 50px; text-align: center; margin-right: 5px;">
                </div>
                <p style="min-width: 90px; text-align: right;">KES ${itemSubtotal.toFixed(2)}</p>
                <button class="remove-cart-item-btn" data-cart-item-id="${item.cartItemId}" aria-label="Remove ${item.name}" style="background: #ff3333; color: white; border: none; padding: 5px 8px; cursor: pointer; margin-left: 10px; font-size: 0.9em;">&times;</button>
    `;
            cartItemsContainer.appendChild(itemDiv);

            const quantityInput = itemDiv.querySelector(`input[data-cart-item-id="${item.cartItemId}"]`);
            quantityInput.addEventListener('change', (event) => {
                const newQuantity = parseInt(event.target.value);
                updateCartItemQuantity(item.cartItemId, newQuantity);
}); 

            const removeButton = itemDiv.querySelector(`.remove-cart-item-btn[data-cart-item-id="${item.cartItemId}"]`);
            removeButton.addEventListener('click', () => {
                removeFromCart(item.cartItemId);
            });
        });
        // Display cart total if you have an element for it
        // const cartTotalElement = document.getElementById('cart-total-display');
        // if (cartTotalElement) cartTotalElement.textContent = `Total: KES ${cartTotal.toFixed(2)}`;
    }

    function updateCartItemQuantity(cartItemId, newQuantity) {
        const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
        if (itemIndex > -1 && newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else if (itemIndex > -1 && newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is zero or less
        }
        renderCartItems();
        updateCartCount();
        saveCartToLocalStorage();
    }

    function removeFromCart(cartItemId) {
        const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
        if (itemIndex > -1) {
            const removedItemName = cart[itemIndex].name;
            cart.splice(itemIndex, 1);
            showToast(`${removedItemName} removed from cart.`, 'error');
        }
        renderCartItems();
        updateCartCount();
        saveCartToLocalStorage();
    }

    if (deleteAllButton) {
        deleteAllButton.addEventListener('click', () => {
            if (cart.length > 0 && confirm("Are you sure you want to clear your entire cart?")) {
                cart = [];
                showToast('Cart cleared!', 'error');
                renderCartItems();
                updateCartCount();
                saveCartToLocalStorage();
            }
        });
    }

    // --- 6. Other Button Functionalities ---
    if (hamburgerMenu && navLinksContainer) {
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', navLinksContainer.classList.contains('active'));
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active')); // Assuming 'active' class for styling
            button.classList.add('active');
            const category = button.dataset.category;
            const filteredProducts = category === 'all' || !category ? products : products.filter(p => p.category === category);
            renderProducts(filteredProducts);
        });
    });

    if (searchBarForm && searchInput) {
        searchBarForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            const searchedProducts = searchTerm ? products.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                (p.description && p.description.toLowerCase().includes(searchTerm)) ||
                p.category.toLowerCase().includes(searchTerm)
            ) : products;
            renderProducts(searchedProducts);
        });
    }

    const shopNowButton = document.querySelector('.shop-now-button');
    if (shopNowButton && shopNowButton.getAttribute('href') === '#shop') {
        shopNowButton.addEventListener('click', (e) => {
            e.preventDefault();
            const shopSection = document.getElementById('shop');
            if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (continueShoppingButton && continueShoppingButton.getAttribute('href') === '#shop') {
        continueShoppingButton.addEventListener('click', (e) => {
            e.preventDefault();
            const shopSection = document.getElementById('shop');
            if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
                // Simple checkout process
                const confirmCheckout = confirm(`Proceed to checkout?\nTotal Amount: KES ${totalAmount}`);
                if (confirmCheckout) {
                    alert('Thank you for your purchase!\nOrder confirmed.');
                    // Clear cart after successful order
                    cart = [];
                    saveCartToLocalStorage();
                    renderCartItems();
                    updateCartCount();
                    showToast('Order placed successfully!', 'success');
                }
            } else {
                showToast("Your cart is empty.", "error");
            }
        });
    }

    // Enhanced Hover Effects for Buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Enhanced Shop Now Button
    const shopNowBtn = document.querySelector('.shop-now-button');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const shopSection = document.querySelector('#shop');
            if (shopSection) {
                shopSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                // Add highlight animation to the shop section
                shopSection.classList.add('highlight');
                setTimeout(() => shopSection.classList.remove('highlight'), 2000);
            }
        });
    }

    // Enhanced Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-button');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add loading animation
            const category = this.dataset.category;
            const productGrid = document.querySelector('.merch-grid');
            if (productGrid) {
                productGrid.classList.add('loading');
                setTimeout(() => {
                    const filteredProducts = category === 'all' ? 
                        products : 
                        products.filter(p => p.category === category);
                    renderProducts(filteredProducts);
                    productGrid.classList.remove('loading');
                }, 300);
            }
        });
    });

    // Enhanced Add to Cart Button
    function enhanceAddToCartButton(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Get product data
            const productId = parseInt(this.dataset.productId);
            if (!productId) return;

            // Add loading state
            this.classList.add('loading');
            this.disabled = true;

            // Simulate loading
            setTimeout(() => {
                addToCart(productId);
                
                // Success animation
                this.classList.remove('loading');
                this.classList.add('success');
                
                // Reset button state
                setTimeout(() => {
                    this.classList.remove('success');
                    this.disabled = false;
                }, 1500);
            }, 500);
        });
    }

    // Apply enhancement to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart-button').forEach(enhanceAddToCartButton);

    // Enhanced Checkout Button
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                showToast('Your cart is empty!', 'error');
                return;
            }

            // Add loading state
            this.classList.add('loading');
            
            // Simulate checkout process
            setTimeout(() => {
                // Calculate total
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                // Show checkout confirmation
                const confirmCheckout = confirm(
                    `Proceed to checkout?\n\nTotal: KES ${total.toFixed(2)}\nItems: ${cart.length}`
                );

                if (confirmCheckout) {
                    // Simulate successful checkout
                    showToast('Checkout successful! Redirecting to payment...', 'success');
                    setTimeout(() => {
                        // Here you would normally redirect to payment gateway
                        alert('This is where the payment gateway integration would happen!');
                    }, 2000);
                }

                this.classList.remove('loading');
            }, 800);
        });
    }

    // Enhanced Delete All Button
    const deleteAllBtn = document.querySelector('.delete-all-button');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                showToast('Cart is already empty!', 'error');
                return;
            }

            // Add confirmation with items count
            const confirmDelete = confirm(`Are you sure you want to remove all ${cart.length} items from your cart?`);
            
            if (confirmDelete) {
                // Add loading state
                this.classList.add('loading');
                
                setTimeout(() => {
                    cart = [];
                    renderCartItems();
                    updateCartCount();
                    saveCartToLocalStorage();
                    showToast('Cart cleared successfully!', 'success');
                    this.classList.remove('loading');
                }, 500);
            }
        });
    }

    // Enhanced Quick View Button
    function enhanceQuickViewButton(button) {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            if (!productId) return;

            // Add loading state
            this.classList.add('loading');
            
            // Simulate loading product details
            setTimeout(() => {
                openQuickView(productId);
                updateMainProductDetails(productId);
                this.classList.remove('loading');
            }, 300);
        });
    }

    // Apply enhancement to all quick view buttons
    document.querySelectorAll('.quick-view-button').forEach(enhanceQuickViewButton);

    // Add keyboard navigation for popup
    document.addEventListener('keydown', function(e) {
        const popup = document.querySelector('.product-popup.visible');
        if (popup && e.key === 'Escape') {
            popup.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    });

    // Enhanced quantity input buttons
    function createQuantityControls(quantityInput) {
        const wrapper = document.createElement('div');
        wrapper.className = 'quantity-controls';
        
        const decrementBtn = document.createElement('button');
        decrementBtn.textContent = '-';
        decrementBtn.className = 'quantity-btn decrement';
        
        const incrementBtn = document.createElement('button');
        incrementBtn.textContent = '+';
        incrementBtn.className = 'quantity-btn increment';
        
        decrementBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                quantityInput.dispatchEvent(new Event('change'));
            }
        });
        
        incrementBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            quantityInput.dispatchEvent(new Event('change'));
        });
        
        wrapper.appendChild(decrementBtn);
        wrapper.appendChild(quantityInput.cloneNode(true));
        wrapper.appendChild(incrementBtn);
        
        quantityInput.parentNode.replaceChild(wrapper, quantityInput);
    }

    // Apply quantity controls to all quantity inputs
    document.querySelectorAll('input[type="number"]').forEach(createQuantityControls);

    // --- Initial Load ---
    renderProducts(products);
    loadCartFromLocalStorage();

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .toast { /* ... your toast styles ... */ }
        .toast.show { /* ... */ }
        .toast.success { /* ... */ }
        .toast.error { /* ... */ }
        .sr-only { /* ... your sr-only styles ... */ }
    `;
    document.head.appendChild(styleSheet);
});


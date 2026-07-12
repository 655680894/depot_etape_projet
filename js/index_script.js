/* ==========================================================================
   1. INITIALISATION GENERALE AU CHARGEMENT DE LA PAGE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Gestion du thème persistant
    const activeTheme = localStorage.getItem('market_theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', activeTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = activeTheme === 'dark' ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }
    
    // Initialisation automatique du Carrousel (Slide)
    const carouselHTML = document.getElementById('featuredShopsCarousel');
    if (carouselHTML && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carouselHTML, {
            interval: 4000,   // Temps de défilement : 4 secondes
            ride: 'carousel', // Démarre automatiquement immédiatement
            wrap: true,       // Tourne en boucle indéfiniment
            pause: 'hover'    // Pause temporaire au survol de la souris
        });
    }

    // Mise à jour des compteurs et badges du Header
    refreshLocalCounters();
});

/* ==========================================================================
   2. INTERACTION THEME (LIGHT / DARK MODE)
   ========================================================================== */
function toggleTheme() {
    const root = document.documentElement;
    const icon = document.getElementById('themeIcon');
    const targetedTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-bs-theme', targetedTheme);
    localStorage.setItem('market_theme', targetedTheme);
    
    if (icon) {
        icon.className = targetedTheme === 'dark' ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }
}

/* ==========================================================================
   3. SYSTEME DE RECHERCHE EN DIRECT (LIVE SEARCH)
   ========================================================================== */
function filterCatalogProducts() {
    const searchInput = document.getElementById('liveSearchInput');
    if (!searchInput) return;

    const inputKeyword = searchInput.value.toLowerCase();
    const productContainers = document.querySelectorAll('.product-item-container');

    productContainers.forEach(container => {
        const productTitleNode = container.querySelector('.product-title-text');
        const shopTitleNode = container.querySelector('.shop-title-text');
        
        // Sécurisation : extraction du texte uniquement si les éléments HTML existent
        const productTitle = productTitleNode ? productTitleNode.innerText.toLowerCase() : '';
        const shopTitle = shopTitleNode ? shopTitleNode.innerText.toLowerCase() : '';
        
        if (productTitle.includes(inputKeyword) || shopTitle.includes(inputKeyword)) {
            container.style.setProperty("display", "block", "important");
        } else {
            container.style.setProperty("display", "none", "important");
        }
    });
}

/* ==========================================================================
   4. SYSTEME DE PANIER VIRTUEL & FAVORIS
   ========================================================================== */
function toggleFavoriteItem(itemId) {
    let currentFavs = JSON.parse(localStorage.getItem('market_favorites')) || [];
    const itemIndex = currentFavs.indexOf(itemId);
    
    if (itemIndex === -1) { 
        currentFavs.push(itemId); 
    } else { 
        currentFavs.splice(itemIndex, 1); 
    }
    
    localStorage.setItem('market_favorites', JSON.stringify(currentFavs));
    refreshLocalCounters();
}

// Compteur du panier virtuel
let internalCartQuantity = parseInt(localStorage.getItem('market_cart_qty')) || 0;

function addItemToVirtualCart(itemId, itemName) {
    let currentFavs = JSON.parse(localStorage.getItem('market_favorites')) || [];
    
    if (!currentFavs.includes(itemId)) {
        currentFavs.push(itemId);
        localStorage.setItem('market_favorites', JSON.stringify(currentFavs));
    }

    internalCartQuantity++;
    localStorage.setItem('market_cart_qty', internalCartQuantity);
    refreshLocalCounters();
    alert(`"${itemName}" a été ajouté à votre panier virtuel !`);
}

/* ==========================================================================
   5. REFRESH DES COMPTEURS VISUELS (BADGES)
   ========================================================================== */
function refreshLocalCounters() {
    // Badge des favoris
    const currentFavs = JSON.parse(localStorage.getItem('market_favorites')) || [];
    const favBadge = document.getElementById('favBadgeCount');
    if (favBadge) {
        favBadge.innerText = currentFavs.length;
    }
    
    // Badge du panier
    const cartQty = localStorage.getItem('market_cart_qty') || 0;
    const cartDisplay = document.getElementById('cartValueDisplay');
    if (cartDisplay) {
        cartDisplay.innerText = cartQty;
    }
}



function toggleLikeItem(itemId, buttonElement) {
    let currentLikes = JSON.parse(localStorage.getItem('market_likes')) || [];
    const itemIndex = currentLikes.indexOf(itemId);
    
    if (itemIndex === -1) {
        // L'article n'est pas liké -> on l'ajoute
        currentLikes.push(itemId);
        buttonElement.classList.add('liked');
        // Remplacer l'icône vide par l'icône de cœur remplie de Bootstrap Icons
        buttonElement.innerHTML = '<i class="bi bi-heart-fill"></i>';
    } else {
        // L'article est déjà liké -> on le retire
        currentLikes.splice(itemIndex, 1);
        buttonElement.classList.remove('liked');
        // Remettre l'icône vide
        buttonElement.innerHTML = '<i class="bi bi-heart"></i>';
    }
    
    localStorage.setItem('market_likes', JSON.stringify(currentLikes));
}

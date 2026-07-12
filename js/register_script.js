// 1. Gestion de l'affichage des options Vendeur / Client
function toggleVendorFields() {
    const roleSelect = document.getElementById('roleSelect');
    const vendorSection = document.getElementById('vendorSection');
    const shopLogoInput = document.getElementById('shop_logo');
    const shopNameInput = document.getElementById('shop_name');
    const imageLabel = document.getElementById('imageLabel');
    const imageHelp = document.getElementById('imageHelp');
    const previewContainer = document.getElementById('previewContainer');

    if (roleSelect.value === 'vendeur') {
        vendorSection.classList.remove('d-none');
        shopNameInput.setAttribute('required', 'required');
        shopLogoInput.setAttribute('required', 'required');
        
        imageLabel.innerText = "Logo de la Boutique";
        imageLabel.className = "form-label small text-warning";
        imageHelp.innerText = "(Obligatoire pour configurer votre espace vendeur.)";
        imageHelp.className = "text-warning mt-1";
        previewContainer.style.borderColor = "#f97316"; // Devient orange pour le vendeur
    } else {
        vendorSection.classList.add('d-none');
        shopNameInput.removeAttribute('required');
        shopLogoInput.removeAttribute('required');
        
        imageLabel.innerText = "Photo de Profil";
        imageLabel.className = "form-label small text-white";
        imageHelp.innerText = "(Vous pouvez laisser vide pour utiliser l'avatar par défaut.)";
        imageHelp.className = "text-muted mt-1";
        previewContainer.style.borderColor = "#334155"; // Repasse gris pour l'acheteur
    }
}

// 2. Traitement et prévisualisation immédiate de l'image
function previewImageFile() {
    const fileInput = document.getElementById('shop_logo');
    const previewImg = document.getElementById('imagePreview');
    const placeholderIcon = document.getElementById('previewPlaceholder');
    
    const file = fileInput.files[0]; // Récupère le premier fichier sélectionné
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;        // Assigne le résultat binaire à la balise img
            previewImg.classList.remove('d-none');   // Rend l'image visible
            placeholderIcon.classList.add('d-none'); // Masque l'icône de remplacement
        }
        
        reader.readAsDataURL(file); // Lance la lecture du fichier image
    } else {
        // En cas d'annulation ou fichier vide, réinitialise la vue par défaut
        previewImg.src = "";
        previewImg.classList.add('d-none');
        placeholderIcon.classList.remove('d-none');
    }
}

// Lancer au chargement initial de la page
document.addEventListener("DOMContentLoaded", toggleVendorFields);
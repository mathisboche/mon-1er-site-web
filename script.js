
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var menu = document.querySelector('.menu-fullscreen');
    var menuLinks = document.querySelectorAll('.menu-fullscreen a');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('show');
    });

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('show');
            hamburger.classList.remove('active');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 73, // Ajustez pour la hauteur du header
                behavior: 'smooth'
            });
        }
    });
});
        
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Ignorer les clics qui viennent directement du bouton
        if (e.target.classList.contains('flip-button')) return;

        // Gérer le retournement de la carte
        toggleCard(this);
    });
});

document.querySelectorAll('.flip-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Empêcher le clic de se propager à la carte
        e.stopPropagation();

        // Gérer le retournement de la carte
        var card = this.closest('.card');
        if (card) {
            toggleCard(card);
        }
    });
});

function toggleCard(card) {
    var cardInner = card.querySelector('.card-inner');
    if (cardInner) {
        // Remettre toutes les autres cartes en position initiale
        document.querySelectorAll('.card-inner').forEach(otherCardInner => {
            if (otherCardInner !== cardInner) {
                otherCardInner.style.transform = '';
            }
        });

        // Basculer la transformation de cette carte
        if (cardInner.style.transform === 'rotateY(180deg)') {
            cardInner.style.transform = '';
        } else {
            cardInner.style.transform = 'rotateY(180deg)';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var mySwiper = new Swiper('.swiper-container', {
        // Options de Swiper
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

document.querySelectorAll('.blog-card').forEach(function(card, index) {
    card.addEventListener('click', function() {
        openModal('modal-article' + (index + 1));
    });
});

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    var modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('open');
    document.body.style.overflow = 'hidden'; // Désactive le défilement de la page principale
    modal.style.display = 'block'; // Affiche le modal
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = ''; // Réactive le défilement de la page principale
}

// Attache closeModal à tous les boutons de fermeture et aux clics en dehors de la modale
document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        let modalId = this.closest('.modal').id;
        closeModal(modalId);
    });
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};
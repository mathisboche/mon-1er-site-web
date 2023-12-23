
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

// Ouverture de la modale
document.querySelectorAll('.blog-card').forEach(function(card, index) {
    let touchstartX = 0;
    let touchendX = 0;

    function handleTouchStart(evt) {
        touchstartX = evt.changedTouches[0].screenX;
    }

    function handleTouchEnd(evt) {
        touchendX = evt.changedTouches[0].screenX;
        if (Math.abs(touchstartX - touchendX) < 10) { // Seuil pour détecter un tap plutôt qu'un swipe
            openModal();
        }
    }

    function openModal() {
        document.getElementById('modal-article' + (index + 1)).style.display = 'block';
    }

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchend', handleTouchEnd);
});


// Fermeture de la modale
document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
    });
});

// Fermer la modale en cliquant en dehors
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

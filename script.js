
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
    let startX, startY, dist, threshold = 10, // seuil pour détecter un tap
        allowedTime = 200, // durée maximale entre touchstart et touchend
        elapsedTime, startTime;

    function handleTouchStart(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        startTime = new Date().getTime(); // enregistre le temps au début du toucher
        e.stopPropagation(); // empêche la propagation de l'événement
    }

    function handleTouchEnd(e) {
        dist = e.changedTouches[0].pageX - startX; // calcule la distance parcourue
        elapsedTime = new Date().getTime() - startTime; // calcule le temps écoulé
        if (Math.abs(dist) <= threshold && elapsedTime <= allowedTime) {
            openModal(); // ouvre le modal si c'est un tap
        }
        e.stopPropagation(); // empêche la propagation de l'événement
    }

    function handleClick() {
        openModal(); // gère le clic pour les ordinateurs de bureau
    }

    function openModal() {
        document.getElementById('modal-article' + (index + 1)).style.display = 'block';
        document.body.style.overflow = 'hidden'; // Désactive le défilement
    }

    function closeModal() {
        document.getElementById('modal-article' + (index + 1)).style.display = 'none';
        document.body.style.overflow = ''; // Réactive le défilement
    }

    // Attachez closeModal à vos éléments de fermeture
    document.querySelectorAll('.close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    });

    card.addEventListener('touchstart', handleTouchStart, false);
    card.addEventListener('touchmove', handleTouchMove, false);
    card.addEventListener('touchend', handleTouchEnd, false);
    card.addEventListener('click', handleClick, false);
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

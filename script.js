const swiper = new Swiper(".role-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 10000, // 10 secondes
      disableOnInteraction: false, // continue même si l'utilisateur interagit
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  const preInscriptionBtn01 = document.getElementById('preInscriptionBtn01');
  const preInscriptionBtn02 = document.getElementById('preInscriptionBtn02');
  const preInscriptionBtn03 = document.getElementById('preInscriptionBtn03');
  const preInscriptionBtn04 = document.getElementById('preInscriptionBtn04');
  const preInscriptionModal = document.getElementById('preInscriptionModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Ouvrir la modal et désactiver le scroll du body
  preInscriptionBtn01.addEventListener('click', () => {
    preInscriptionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  preInscriptionBtn02.addEventListener('click', () => {
    preInscriptionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  preInscriptionBtn03.addEventListener('click', () => {
    preInscriptionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  preInscriptionBtn04.addEventListener('click', () => {
    preInscriptionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Fermer la modal et réactiver le scroll du body
  function closeModal() {
    preInscriptionModal.style.display = 'none';
    document.body.style.overflow = 'none';
  }

  // Événement pour le bouton de fermeture
  closeModalBtn.addEventListener('click', closeModal);

  // Fermer la modal si l'utilisateur clique sur l'overlay

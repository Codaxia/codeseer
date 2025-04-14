
  const toggle = document.getElementById("language-toggle");

  // Si l'URL contient "/fr", on est sur la page française → toggle ON
  if (window.location.pathname.includes("/fr")) {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }

const preInscriptionBtn01 = document.getElementById("preInscriptionBtn01");
const preInscriptionBtn02 = document.getElementById("preInscriptionBtn02");
const preInscriptionModal = document.getElementById("preInscriptionModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// Ouvrir la modal et désactiver le scroll du body
preInscriptionBtn01.addEventListener("click", () => {
  preInscriptionModal.style.display = "block";
  document.body.style.overflow = "hidden";
});

preInscriptionBtn02.addEventListener("click", () => {
  preInscriptionModal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Fermer la modal et réactiver le scroll du body
function closeModal() {
  preInscriptionModal.style.display = "none";
  document.body.style.overflow = "none";
}

// Événement pour le bouton de fermeture
closeModalBtn.addEventListener("click", closeModal);

const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let slides = Array.from(track.children);
let slidesToShow = getSlidesToShow();
let currentIndex = slidesToShow;

// Clonage
const startClones = slides
  .slice(0, slidesToShow)
  .map((slide) => slide.cloneNode(true));
const endClones = slides
  .slice(-slidesToShow)
  .map((slide) => slide.cloneNode(true));

startClones.forEach((clone) => track.appendChild(clone));
endClones.reverse().forEach((clone) => track.insertBefore(clone, track.firstChild));

// Recalcul des slides
slides = Array.from(track.children);

// 🔁 Responsive : 1 slide si <768px, sinon 3
function getSlidesToShow() {
  return window.innerWidth < 768 ? 1 : 3;
}

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

function updateActiveSlides() {
  slides.forEach((slide) => slide.classList.remove("active-slide"));

  for (let i = 0; i < slidesToShow; i++) {
    const visibleIndex = currentIndex + i;
    if (slides[visibleIndex]) {
      slides[visibleIndex].classList.add("active-slide");
    }
  }
}

function setInitialPosition() {
  slidesToShow = getSlidesToShow(); // recalcul au resize
  currentIndex = slidesToShow;
  const slideWidth = getSlideWidth();
  track.style.transition = "none";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateActiveSlides();
}

window.addEventListener("load", setInitialPosition);
window.addEventListener("resize", setInitialPosition);

function goToSlide(index) {
  const slideWidth = getSlideWidth();
  track.style.transition = "transform 0.3s ease-in-out";
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
  updateActiveSlides();
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  goToSlide(currentIndex);

  if (currentIndex === slides.length - slidesToShow) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = slidesToShow;
      track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
      updateActiveSlides();
    }, 300);
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  goToSlide(currentIndex);

  if (currentIndex === 0) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = slides.length - slidesToShow * 2;
      track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
      updateActiveSlides();
    }, 300);
  }
});

// Auto-slide
setInterval(() => nextBtn.click(), 8000);

let startX;
let isSwiping = false;

track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  },
  { passive: true }
);

track.addEventListener(
  "touchmove",
  (e) => {
    // Optionnel : tu pourrais ajouter une animation ici
  },
  { passive: true }
);

track.addEventListener("touchend", (e) => {
  if (!isSwiping) return;

  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX)) {
    if (deltaX > 0) {
      prevBtn.click(); // swipe droite → slide précédent
    } else {
      nextBtn.click(); // swipe gauche → slide suivant
    }
  }

  isSwiping = false;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#preInscriptionModal form");
  const successModal = document.getElementById("successModal");
  const emailInput = document.querySelector("#email");

  const btn01 = document.getElementById("preInscriptionBtn01");
  const btn02 = document.getElementById("preInscriptionBtn02");

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(email);
  }

  function shakeInput(input) {
    input.classList.add("shake");
    setTimeout(() => {
      input.classList.remove("shake");
    }, 500);
  }

  function handlePreInscription() {
    const email = emailInput.value.trim();

    if (email === "") {
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      alert("Veuillez entrer une adresse email valide. / Please enter a valid email address.");
      shakeInput(emailInput);
      emailInput.focus();
      return;
    }

    successModal.classList.add("show");

    setTimeout(() => {
      form.submit();
    }, 300);

    setTimeout(() => {
      successModal.classList.remove("show");
    }, 5000);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handlePreInscription();
    });
  }

  if (btn01) {
    btn01.addEventListener("click", function (e) {
      e.preventDefault();
      handlePreInscription();
    });
  }

  if (btn02) {
    btn02.addEventListener("click", function (e) {
      e.preventDefault();
      handlePreInscription();
    });
  }
});

const form = document.getElementById("joinForm");
const emailInput = document.getElementById("joinEmail");
const successModal = document.getElementById("successModal"); // 👈 Assure-toi qu’il existe bien dans le HTML

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Toujours bloquer au départ
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    alert("Veuillez entrer une adresse email valide. / Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  // ✅ Si l’email est valide → on affiche la modale et on soumet après un court délai
  successModal.classList.add("show");

  setTimeout(() => {
    form.submit(); // Formsubmit s’occupe d’envoyer et rediriger
  }, 300);

  setTimeout(() => {
    successModal.classList.remove("show");
  }, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const rejoinBtn = document.getElementById("rejoinBtn");
  const rejoinEmail = document.getElementById("rejoinEmail");
  const successModal = document.getElementById("successModal");

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(email);
  }

  rejoinBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = rejoinEmail.value.trim();

    if (!isValidEmail(email)) {
      alert("Veuillez entrer une adresse email valide. / Please enter a valid email address.");
      rejoinEmail.focus();
      return;
    }

    successModal.classList.add("show");
    const hiddenForm = document.createElement("form");
    hiddenForm.action = "https://formsubmit.co/xavier@codaxia.com";
    hiddenForm.method = "POST";
    hiddenForm.style.display = "none";
    const emailField = document.createElement("input");
    emailField.type = "hidden";
    emailField.name = "email";
    emailField.value = email;
    hiddenForm.appendChild(emailField);
    hiddenForm.innerHTML += `
      <input type="hidden" name="_subject" value="Nouvelle inscription Rejoindre CodeSeer">
      <input type="hidden" name="_next" value="https://codeseer.codaxia.com/">
      <input type="text" name="_honey" style="display:none">
    `;

    document.body.appendChild(hiddenForm);

    setTimeout(() => {
      hiddenForm.submit();
    }, 300);

    setTimeout(() => {
      successModal.classList.remove("show");
    }, 5000);
  });
});

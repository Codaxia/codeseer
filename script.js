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
setInterval(() => nextBtn.click(), 8000);

let slides = Array.from(track.children);
const slidesToShow = 3;
let currentIndex = slidesToShow;

// Clone les premières et dernières cartes pour effet de boucle
const startClones = slides
  .slice(0, slidesToShow)
  .map((slide) => slide.cloneNode(true));
const endClones = slides
  .slice(-slidesToShow)
  .map((slide) => slide.cloneNode(true));

startClones.forEach((clone) => track.appendChild(clone));
endClones
  .reverse()
  .forEach((clone) => track.insertBefore(clone, track.firstChild));

// Recalculer la liste des slides après clonage
slides = Array.from(track.children);

// Appliquer le bon offset initial
function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

function setInitialPosition() {
  const slideWidth = getSlideWidth();
  track.style.transition = "none";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
window.addEventListener("load", setInitialPosition);
window.addEventListener("resize", setInitialPosition);

// Aller à l'index
function goToSlide(index) {
  const slideWidth = getSlideWidth();
  track.style.transition = "transform 0.3s ease-in-out";
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
}

// Suivant
nextBtn.addEventListener("click", () => {
  currentIndex++;
  goToSlide(currentIndex);

  if (currentIndex === slides.length - slidesToShow) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = slidesToShow;
      track.style.transform = `translateX(-${
        currentIndex * getSlideWidth()
      }px)`;
    }, 300);
  }
});

// Précédent
prevBtn.addEventListener("click", () => {
  currentIndex--;
  goToSlide(currentIndex);

  if (currentIndex === 0) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = slides.length - slidesToShow * 2;
      track.style.transform = `translateX(-${
        currentIndex * getSlideWidth()
      }px)`;
    }, 300);
  }
});

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

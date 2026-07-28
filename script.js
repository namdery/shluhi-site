const revealItems = document.querySelectorAll(".section, .hero-card, .site-footer");

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item) => observer.observe(item));

/* ---------- Dynamic banner slider ---------- */
const sliderStage = document.querySelector("#slider-stage");
let slides = [];
const dots = [];
let currentSlide = 0;
let sliderTimer = null;
const isMobile = window.innerWidth <= 640;
const bannerPrefix = isMobile ? "telbanner" : "pkbanner";
const bannerOverlayDesktop =
  "linear-gradient(90deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.46) 44%, rgba(0,0,0,0.72) 100%)";
const bannerOverlayMobile =
  "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 28%, rgba(0,0,0,0.36) 100%)";
const bannerOverlay = isMobile ? bannerOverlayMobile : bannerOverlayDesktop;

function tryBannerLoad(index) {
  const extensions = [".jpg", ".jpeg", ".png", ".webp"];
  return new Promise((resolve) => {
    let tried = 0;
    function attempt(ext) {
      const img = new Image();
      const src = `./${bannerPrefix}${index}${ext}`;
      img.onload = () => resolve(src);
      img.onerror = () => {
        tried++;
        if (tried < extensions.length) {
          attempt(extensions[tried]);
        } else {
          resolve(null);
        }
      };
      img.src = src;
    }
    attempt(extensions[0]);
  });
}

async function initBannerSlider() {
  if (!sliderStage) return;

  const bannerSources = [];
  for (let i = 1; i <= 20; i++) {
    const src = await tryBannerLoad(i);
    if (src) {
      bannerSources.push(src);
    } else {
      break;
    }
  }

  if (bannerSources.length === 0) {
    // fallback — use existing images
    bannerSources.push("./banner-main.png", "./image.png");
  }

  bannerSources.forEach((src, index) => {
    const article = document.createElement("article");
    article.className = "slide" + (index === 0 ? " is-active" : "");
    article.setAttribute("data-slide", "");
    const div = document.createElement("div");
    div.className = "slide-image";
    div.style.backgroundImage = `${bannerOverlay}, url("${src}")`;
    article.appendChild(div);
    sliderStage.appendChild(article);
  });

  slides = Array.from(document.querySelectorAll("[data-slide]"));

  if (slides.length > 1) {
    setActiveSlide(0);
    queueNextSlide();
  }
}

const slideInterval = 4200;

function setActiveSlide(index) {
  const prev = slides[currentSlide];
  const next = slides[index];

  // Убираем всё
  slides.forEach((slide) => {
    slide.classList.remove("is-active", "is-leaving", "is-fading");
  });

  // Новый слайд сразу виден снизу
  if (next) next.classList.add("is-active");

  // Старый поверх — и плавно растворяется
  if (prev && prev !== next) {
    prev.classList.add("is-leaving");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        prev.classList.add("is-fading");
      });
    });
    setTimeout(() => {
      prev.classList.remove("is-leaving", "is-fading");
    }, 950);
  }

  currentSlide = index;
}

function queueNextSlide() {
  window.clearInterval(sliderTimer);
  sliderTimer = window.setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    setActiveSlide(nextIndex);
  }, slideInterval);
}

initBannerSlider();

const demoReviews = [
  {
    name: "Анонимно",
    rating: 5,
    date: "14 марта 2021",
    text: "Восхитительные девушки, мягкая подача и очень красивая ночная атмосфера.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "27 мая 2021",
    text: "Красивые гостьи, спокойный ритм и ощущение приватности на протяжении всего вечера.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "19 августа 2021",
    text: "Зайки очень внимательные, интерьер темный и стильный, эмоции остались надолго.",
  },
  {
    name: "Анонимно",
    rating: 4,
    date: "11 декабря 2021",
    text: "Приятная музыка, уютная посадка и очень деликатные девушки в зале.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "6 февраля 2022",
    text: "Незабываемые эмоции, красивые феи и ощущение закрытого особенного места.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "28 апреля 2022",
    text: "Очень эффектная подача, гостьи общаются легко и атмосфера держится до самого утра.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "17 июля 2022",
    text: "Восхитительные леди и сильная энергетика, хочется вернуться еще раз.",
  },
  {
    name: "Анонимно",
    rating: 4,
    date: "3 октября 2022",
    text: "Красивые бабочки, хороший свет и мягкий вайб без лишней суеты.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "25 января 2023",
    text: "Очень понравилось, девушки деликатные, вечер прошел ярко и красиво.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "8 мая 2023",
    text: "Редкий случай, когда и музыка, и феи, и общая подача на одном высоком уровне.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "30 августа 2023",
    text: "Красивые зайки, приятный темный интерьер и очень насыщенная ночная атмосфера.",
  },
  {
    name: "Анонимно",
    rating: 4,
    date: "12 ноября 2023",
    text: "Уютно, приватно, гостьи очень аккуратные в общении и создают правильное настроение.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "21 февраля 2024",
    text: "Ночная эстетика сильная, девушки выглядят восхитительно, вечер получился особенным.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "9 июня 2024",
    text: "Красивые бабочки и очень приятный формат для спокойного вечернего отдыха.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "24 сентября 2024",
    text: "Одна из самых запоминающихся ночей, феи и атмосфера действительно на уровне.",
  },
  {
    name: "Анонимно",
    rating: 4,
    date: "16 декабря 2024",
    text: "Темный свет, хорошие напитки и леди, которые поддерживают настроение вечера.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "13 марта 2025",
    text: "Восхитительные девушки, красивый интерьер и ощущение приватного клуба без лишнего шума.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "5 июля 2025",
    text: "Очень понравилось, гостьи создают мягкую и уверенную атмосферу весь вечер.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "29 октября 2025",
    text: "Красивые бабочки, хорошая музыка и очень приятная подача во всех деталях.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "18 января 2026",
    text: "Незабываемые эмоции, феи выглядят роскошно, а вечер проходит легко и ярко.",
  },
  {
    name: "Анонимно",
    rating: 4,
    date: "22 апреля 2026",
    text: "Приватно, красиво и без напряжения, девушки очень тактичные и внимательные.",
  },
  {
    name: "Анонимно",
    rating: 5,
    date: "27 июля 2026",
    text: "Свежая атмосфера, красивые зайки и очень приятный темп ночи от начала до конца.",
  },
];

/* ---------- Photos carousel ---------- */
(function () {
  const track = document.querySelector("#photos-track");
  if (!track) return;

  const photoFiles = [];
  const extensions = [".jpg", ".jpeg", ".png", ".webp"];

  function tryLoad(index) {
    return new Promise((resolve) => {
      let tried = 0;
      function attempt(ext) {
        const img = new Image();
        const src = `./foto${index}${ext}`;
        img.onload = () => resolve(src);
        img.onerror = () => {
          tried++;
          if (tried < extensions.length) {
            attempt(extensions[tried]);
          } else {
            resolve(null);
          }
        };
        img.src = src;
      }
      attempt(extensions[0]);
    });
  }

  async function discoverPhotos() {
    for (let i = 1; i <= 30; i++) {
      const src = await tryLoad(i);
      if (src) {
        photoFiles.push(src);
      } else {
        break;
      }
    }
    if (photoFiles.length === 0) return;

    const html = photoFiles
      .map(
        (src) =>
          `<div class="photo-slide"><img src="${src}" alt="Фотосессия" /></div>`
      )
      .join("");

    track.innerHTML = html + html;

    // Force reflow to kick animation on mobile
    void track.offsetWidth;
    track.style.animation = "none";
    void track.offsetWidth;
    track.style.animation = "";
  }

  discoverPhotos();
})();

const publishedStorageKey = "mdmsw-published-reviews";
const defaultPublishDateIso = "2026-07-27";
const fallbackPublishDate = "27 июля 2026";
const unlockDigest = [
  "0c86f2dfd04b5d52",
  "de85408b658cd99e",
  "053d9010b38c56da",
  "20673c9a891e9746",
].join("");

function shuffle(array) {
  const clone = [...array];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }

  return clone;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function starsMarkup(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const activeClass = index < rating ? " is-on" : "";
    return `<span class="review-star${activeClass}">★</span>`;
  }).join("");
}

function reviewCardMarkup(review) {
  return `
    <article class="review-card photo-card">
      <div class="review-stars" aria-label="Оценка ${review.rating} из 5">
        ${starsMarkup(review.rating)}
      </div>
      <p>«${escapeHtml(review.text)}»</p>
      <div class="review-meta">
        <span>${escapeHtml(review.name)}</span>
        <span>${escapeHtml(review.date)}</span>
      </div>
    </article>
  `;
}

function fillReviewTrack(track, reviews) {
  if (!track) {
    return;
  }

  const items = reviews.map(reviewCardMarkup).join("");
  track.innerHTML = items + items;
}

function loadPublishedReviews() {
  try {
    const raw = window.localStorage.getItem(publishedStorageKey);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((review) => {
        return (
          review &&
          typeof review.name === "string" &&
          typeof review.text === "string" &&
          Number.isInteger(review.rating) &&
          review.rating >= 1 &&
          review.rating <= 5
        );
      })
      .map((review) => ({
        ...review,
        date: typeof review.date === "string" && review.date ? review.date : fallbackPublishDate,
      }));
  } catch {
    return [];
  }
}

function savePublishedReviews(reviews) {
  window.localStorage.setItem(publishedStorageKey, JSON.stringify(reviews));
}

const publishedReviews = loadPublishedReviews();
const reviewsTrackA = document.querySelector("#reviews-track-a");
const reviewsTrackB = document.querySelector("#reviews-track-b");

function pauseTrack(track) {
  if (!track) {
    return;
  }

  track.classList.add("is-paused");
}

function resumeTrack(track) {
  if (!track || track.dataset.clickPaused === "true") {
    return;
  }

  track.classList.remove("is-paused");
}

function clearPinnedTrackPause(exceptTrack = null) {
  [reviewsTrackA, reviewsTrackB].forEach((track) => {
    if (!track || track === exceptTrack) {
      return;
    }

    delete track.dataset.clickPaused;
    track.classList.remove("is-paused");
  });
}

function bindReviewTrackInteractions(track) {
  if (!track) {
    return;
  }

  const cards = Array.from(track.querySelectorAll(".review-card"));

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      pauseTrack(track);
    });

    card.addEventListener("mouseleave", () => {
      resumeTrack(track);
    });

    card.addEventListener("click", () => {
      clearPinnedTrackPause(track);
      track.dataset.clickPaused = "true";
      pauseTrack(track);
    });
  });

  if (track.dataset.pauseBound !== "true") {
    track.addEventListener("mouseleave", () => {
      resumeTrack(track);
    });

    track.dataset.pauseBound = "true";
  }
}

function renderReviews() {
  const prioritized = [...publishedReviews].reverse();
  const trackAReviews = [...prioritized, ...shuffle(demoReviews)];
  const trackBReviews = [...shuffle(demoReviews), ...prioritized];

  fillReviewTrack(reviewsTrackA, trackAReviews);
  fillReviewTrack(reviewsTrackB, trackBReviews);
  bindReviewTrackInteractions(reviewsTrackA);
  bindReviewTrackInteractions(reviewsTrackB);
}

renderReviews();

document.addEventListener("click", (event) => {
  if (event.target.closest(".review-card")) {
    return;
  }

  clearPinnedTrackPause();
});

function setupRatingPicker({ input, picker, initialValue = 5 }) {
  if (!input || !picker) {
    return {
      getValue: () => 0,
      reset: () => {},
    };
  }

  const stars = Array.from(picker.querySelectorAll(".rating-star"));

  function updateRatingStars(value) {
    stars.forEach((star) => {
      const starValue = Number(star.dataset.rating);
      star.classList.toggle("is-active", starValue <= value && value > 0);
    });
  }

  function setValue(value) {
    input.value = value > 0 ? String(value) : "";
    updateRatingStars(value);
  }

  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      updateRatingStars(Number(star.dataset.rating));
    });

    star.addEventListener("click", () => {
      setValue(Number(star.dataset.rating));
    });
  });

  picker.addEventListener("mouseleave", () => {
    updateRatingStars(Number(input.value) || 0);
  });

  setValue(initialValue);

  return {
    getValue: () => Number(input.value) || 0,
    reset: () => setValue(initialValue),
    setValue,
  };
}

async function digestText(value) {
  const buffer = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  const bytes = Array.from(new Uint8Array(buffer));
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function formatPublishDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const reviewForm = document.querySelector("#review-form");
const reviewMessage = document.querySelector('textarea[name="message"]');
const formStatus = document.querySelector("#form-status");
const adminPanel = document.querySelector("#admin-panel");
const adminForm = document.querySelector("#admin-form");
const adminStatus = document.querySelector("#admin-status");
const publishDateInput = document.querySelector("#publish-date");
const publishMessageInput = document.querySelector('textarea[name="publishMessage"]');

const guestRating = setupRatingPicker({
  input: document.querySelector("#rating-input"),
  picker: document.querySelector("#review-form .rating-picker"),
  initialValue: 5,
});

const publishRating = setupRatingPicker({
  input: document.querySelector("#publish-rating-input"),
  picker: document.querySelector("#publish-rating-picker"),
  initialValue: 0,
});

let adminUnlocked = false;
let unlockCheckId = 0;

function openAdminPanel() {
  if (!adminPanel || adminUnlocked) {
    return;
  }

  adminUnlocked = true;
  adminPanel.hidden = false;

  if (reviewMessage) {
    reviewMessage.value = "";
  }

  if (formStatus) {
    formStatus.textContent = "";
  }

  window.setTimeout(() => {
    publishDateInput?.focus();
  }, 0);
}

if (reviewMessage) {
  reviewMessage.addEventListener("input", async () => {
    if (adminUnlocked) {
      return;
    }

    const typedValue = reviewMessage.value.trim();
    const currentCheckId = unlockCheckId + 1;
    unlockCheckId = currentCheckId;

    if (!typedValue) {
      return;
    }

    const typedDigest = await digestText(typedValue);

    if (currentCheckId !== unlockCheckId) {
      return;
    }

    if (typedDigest === unlockDigest) {
      openAdminPanel();
    }
  });
}

if (reviewForm && formStatus) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Спасибо за отзыв";
    reviewForm.reset();
    guestRating.reset();
  });
}

if (publishDateInput) {
  publishDateInput.value = defaultPublishDateIso;
}

if (adminForm && adminStatus && publishDateInput && publishMessageInput) {
  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const rating = publishRating.getValue();
    const publishDate = publishDateInput.value;
    const reviewText = publishMessageInput.value.trim();

    if (!publishDate) {
      adminStatus.textContent = "Выберите дату";
      publishDateInput.focus();
      return;
    }

    if (!rating) {
      adminStatus.textContent = "Выберите звезды";
      return;
    }

    if (!reviewText) {
      adminStatus.textContent = "Добавьте текст";
      publishMessageInput.focus();
      return;
    }

    publishedReviews.push({
      name: "Анонимно",
      rating,
      date: formatPublishDate(publishDate),
      text: reviewText,
    });

    savePublishedReviews(publishedReviews);
    renderReviews();

    adminStatus.textContent = "Отзыв опубликован";
    adminForm.reset();
    publishDateInput.value = defaultPublishDateIso;
    publishRating.reset();
  });
}

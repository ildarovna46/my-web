// Анимация заголовка с сохранением визуальных пробелов между словами
const heading = document.getElementById("animatedHeading");
if (heading) {
  const words = heading.textContent.trim().split(/\s+/);
  heading.innerHTML = words
    .map(
      (word, i) =>
        `<span style="animation-delay: ${i * 0.03 + 0.05}s; margin-right: 0.22em;">${word}</span>`
    )
    .join("");
}


// Intersection Observer для анимации появления
const fadeElements = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
);

fadeElements.forEach((el) => observer.observe(el));
document
  .querySelectorAll(
    ".skill-card, .step, .project-card, .audience-item"
  )
  .forEach((el) => observer.observe(el));

// Карусель проектов
const wrapper = document.getElementById("projectsWrapper");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const prev = document.getElementById("prevProject");
const next = document.getElementById("nextProject");
let idx = 0;
let perView = 3;

function updatePerView() {
  if (window.innerWidth <= 640) perView = 1;
  else perView = 2;

  const maxIdx = Math.max(0, projectCards.length - perView);
  if (idx > maxIdx) idx = maxIdx;
  moveSlider();
}

function moveSlider() {
  if (!wrapper) return;
  const gap = 28;
  const cardWidth = projectCards[0]?.offsetWidth || 300;
  const shift = idx * (cardWidth + gap);
  wrapper.style.transform = `translateX(-${shift}px)`;
}

next?.addEventListener("click", () => {
  const max = Math.max(0, projectCards.length - perView);
  if (idx < max) idx++;
  else if (idx === max && projectCards.length > perView) idx = 0;
  moveSlider();
});

prev?.addEventListener("click", () => {
  if (idx > 0) idx--;
  else idx = Math.max(0, projectCards.length - perView);
  moveSlider();
});

window.addEventListener("resize", () => {
  updatePerView();
  moveSlider();
});
updatePerView();

// Кнопка "наверх"
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 480) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Контактная форма (временный клиентский обработчик)
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[name="name"]')?.value.trim() || "";
  const email = form.querySelector('input[name="email"]')?.value.trim() || "";
  const message = form.querySelector('textarea[name="message"]')?.value.trim() || "";
  const subject = encodeURIComponent(`Заявка с сайта от ${name || "клиента"}`);
  const body = encodeURIComponent(
    `Имя: ${name}\nEmail: ${email}\n\nЗадача:\n${message}`
  );
  window.location.href = `mailto:ildarovna46@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
});

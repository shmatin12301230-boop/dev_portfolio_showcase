const serviceButtons = document.querySelectorAll(".pick-service");
const sectionsInput = document.getElementById("sections-count");
const sectionsValue = document.getElementById("sections-value");
const addonChecks = document.querySelectorAll("[data-addon]");
const supportPeriod = document.getElementById("support-period");
const promoInput = document.getElementById("promo-input");
const applyPromo = document.getElementById("apply-promo");
const promoStatus = document.getElementById("promo-status");
const resetBuilder = document.getElementById("reset-builder");

const summaryPackage = document.getElementById("summary-package");
const summaryBase = document.getElementById("summary-base");
const summarySections = document.getElementById("summary-sections");
const summaryAddons = document.getElementById("summary-addons");
const summarySupport = document.getElementById("summary-support");
const summaryDiscount = document.getElementById("summary-discount");
const summaryTotal = document.getElementById("summary-total");

const toneButtons = document.querySelectorAll(".tone-btn");
const ctaPreview = document.getElementById("cta-preview");
const ctaTitle = document.getElementById("cta-title");
const ctaText = document.getElementById("cta-text");
const ctaButton = document.getElementById("cta-button");

let currentPackage = "Conversion Core";
let currentBase = 1800;
let discountPercent = 0;

const toneMap = {
  direct: {
    title: "Запустить сегодня",
    text: "Чёткий оффер, прозрачная цена и понятный путь клиента к покупке.",
    button: "Оставить заявку"
  },
  premium: {
    title: "Собрать премиум-витрину",
    text: "Визуал, который усиливает бренд и поднимает средний чек.",
    button: "Получить предложение"
  },
  warm: {
    title: "Подобрать лучший формат",
    text: "Мягкая коммуникация и доверительный сценарий до первого контакта.",
    button: "Обсудить проект"
  }
};

const formatMoney = (value) => `$${Math.round(value)}`;

const updateSummary = () => {
  const sections = Number(sectionsInput?.value || 9);
  const sectionsCost = sections * 120;
  const addonsCost = [...addonChecks].reduce((sum, checkbox) => {
    return checkbox.checked ? sum + Number(checkbox.dataset.addon || 0) : sum;
  }, 0);
  const supportCost = Number(supportPeriod?.value || 0);
  const subtotal = currentBase + sectionsCost + addonsCost + supportCost;
  const discountValue = subtotal * discountPercent;
  const total = subtotal - discountValue;

  if (sectionsValue) sectionsValue.textContent = `${sections} секций`;
  if (summaryPackage) summaryPackage.textContent = currentPackage;
  if (summaryBase) summaryBase.textContent = formatMoney(currentBase);
  if (summarySections) summarySections.textContent = formatMoney(sectionsCost);
  if (summaryAddons) summaryAddons.textContent = formatMoney(addonsCost);
  if (summarySupport) summarySupport.textContent = formatMoney(supportCost);
  if (summaryDiscount) summaryDiscount.textContent = `-${formatMoney(discountValue)}`;
  if (summaryTotal) summaryTotal.textContent = formatMoney(total);
};

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    serviceButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");
    currentPackage = button.dataset.package || "Conversion Core";
    currentBase = Number(button.dataset.price || 1800);
    updateSummary();
  });
});

sectionsInput?.addEventListener("input", updateSummary);
addonChecks.forEach((checkbox) => checkbox.addEventListener("change", updateSummary));
supportPeriod?.addEventListener("change", updateSummary);

applyPromo?.addEventListener("click", () => {
  const code = promoInput?.value.trim().toUpperCase();
  if (code === "LUNEX10") {
    discountPercent = 0.1;
    if (promoStatus) promoStatus.textContent = "Промокод LUNEX10 применён: -10%.";
  } else if (code === "LUNEX20") {
    discountPercent = 0.2;
    if (promoStatus) promoStatus.textContent = "Промокод LUNEX20 применён: -20%.";
  } else {
    discountPercent = 0;
    if (promoStatus) promoStatus.textContent = "Промокод не найден.";
  }
  updateSummary();
});

resetBuilder?.addEventListener("click", () => {
  sectionsInput.value = "9";
  supportPeriod.value = "0";
  promoInput.value = "";
  discountPercent = 0;
  addonChecks.forEach((checkbox) => {
    checkbox.checked = false;
  });
  if (promoStatus) promoStatus.textContent = "";
  updateSummary();
});

toneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tone = button.dataset.tone;
    if (!tone || !toneMap[tone]) return;

    toneButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");

    ctaPreview.classList.remove("direct", "premium", "warm");
    ctaPreview.classList.add(tone);
    ctaTitle.textContent = toneMap[tone].title;
    ctaText.textContent = toneMap[tone].text;
    ctaButton.textContent = toneMap[tone].button;
  });
});

updateSummary();

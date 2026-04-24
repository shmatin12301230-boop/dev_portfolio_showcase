const packageButtons = document.querySelectorAll(".select-package");
const timelineSelect = document.getElementById("timeline");
const pagesInput = document.getElementById("pages");
const pagesValue = document.getElementById("pages-value");
const addonChecks = document.querySelectorAll("[data-addon-price]");
const resetButton = document.getElementById("reset-estimate");

const selectedPackageName = document.getElementById("selected-package-name");
const basePriceNode = document.getElementById("base-price");
const screenPriceNode = document.getElementById("screen-price");
const addonsPriceNode = document.getElementById("addons-price");
const timelineValueNode = document.getElementById("timeline-value");
const totalPriceNode = document.getElementById("total-price");

const styleButtons = document.querySelectorAll(".style-btn");
const stylePreview = document.getElementById("style-preview");
const styleTitle = document.getElementById("style-title");
const styleDescription = document.getElementById("style-description");

const stylesMap = {
  editorial: {
    title: "Редакционный",
    description: "Редакционный стиль с крупной типографикой и выразительной иерархией блоков."
  },
  cinematic: {
    title: "Кинематографичный",
    description: "Сильный контраст, световые акценты и драматичная подача для премиум-продуктов."
  },
  minimal: {
    title: "Минималистичный",
    description: "Чистая геометрия, спокойный ритм и фокус на смыслах и ясности."
  }
};

let currentBasePrice = 2400;
let currentPackageName = "Brand Story";

const formatMoney = (value) => `$${Math.round(value)}`;

const updateEstimate = () => {
  const pages = Number(pagesInput?.value || 7);
  const perScreen = 220;
  const screensCost = pages * perScreen;
  const addonsCost = [...addonChecks].reduce((sum, checkbox) => {
    return checkbox.checked ? sum + Number(checkbox.dataset.addonPrice || 0) : sum;
  }, 0);
  const timelineFactor = Number(timelineSelect?.value || 1);
  const total = (currentBasePrice + screensCost + addonsCost) * timelineFactor;

  if (pagesValue) pagesValue.textContent = `${pages} экранов`;
  if (selectedPackageName) selectedPackageName.textContent = currentPackageName;
  if (basePriceNode) basePriceNode.textContent = formatMoney(currentBasePrice);
  if (screenPriceNode) screenPriceNode.textContent = formatMoney(screensCost);
  if (addonsPriceNode) addonsPriceNode.textContent = formatMoney(addonsCost);
  if (timelineValueNode) timelineValueNode.textContent = `x${timelineFactor.toFixed(2)}`;
  if (totalPriceNode) totalPriceNode.textContent = formatMoney(total);
};

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    packageButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");
    currentBasePrice = Number(button.dataset.base || 2400);
    currentPackageName = button.dataset.name || "Brand Story";
    updateEstimate();
  });
});

timelineSelect?.addEventListener("change", updateEstimate);
pagesInput?.addEventListener("input", updateEstimate);
addonChecks.forEach((checkbox) => checkbox.addEventListener("change", updateEstimate));

resetButton?.addEventListener("click", () => {
  pagesInput.value = "7";
  timelineSelect.value = "1";
  addonChecks.forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateEstimate();
});

styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const styleId = button.dataset.style;
    if (!styleId || !stylesMap[styleId]) return;

    styleButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");

    stylePreview.classList.remove("editorial", "cinematic", "minimal");
    stylePreview.classList.add(styleId);
    styleTitle.textContent = stylesMap[styleId].title;
    styleDescription.textContent = stylesMap[styleId].description;
  });
});

updateEstimate();

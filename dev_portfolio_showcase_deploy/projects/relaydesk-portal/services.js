const ticketsInput = document.getElementById("tickets");
const operatorsInput = document.getElementById("operators");
const priorityMix = document.getElementById("priority-mix");
const ticketsValue = document.getElementById("tickets-value");
const operatorsValue = document.getElementById("operators-value");
const avgResponse = document.getElementById("avg-response");
const slaRisk = document.getElementById("sla-risk");

const filterButtons = document.querySelectorAll(".filter-btn");
const queueList = document.getElementById("queue-list");
const queueMeta = document.getElementById("queue-meta");
const queueItems = queueList ? [...queueList.querySelectorAll("li")] : [];

const buildReportButton = document.getElementById("build-report");
const reportStatus = document.getElementById("report-status");
const moduleButtons = document.querySelectorAll(".module-btn");

const updateSla = () => {
  const tickets = Number(ticketsInput?.value || 110);
  const operators = Number(operatorsInput?.value || 6);
  const priorityFactor = Number(priorityMix?.value || 1);
  const load = (tickets * priorityFactor) / operators;

  const responseMinutes = Math.max(4, Math.round(load / 2.4));
  let risk = "Низкий";
  if (load > 30) risk = "Средний";
  if (load > 42) risk = "Высокий";

  if (ticketsValue) ticketsValue.textContent = `${tickets} заявок`;
  if (operatorsValue) operatorsValue.textContent = `${operators} операторов`;
  if (avgResponse) avgResponse.textContent = `${responseMinutes} мин`;
  if (slaRisk) slaRisk.textContent = risk;
};

const applyFilter = (filter) => {
  let visibleCount = 0;
  queueItems.forEach((item) => {
    const state = item.dataset.state;
    const shouldShow = filter === "all" || state === filter;
    item.style.display = shouldShow ? "flex" : "none";
    if (shouldShow) visibleCount += 1;
  });
  if (queueMeta) queueMeta.textContent = `Отображается задач: ${visibleCount}`;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");
    applyFilter(button.dataset.filter || "all");
  });
});

queueItems.forEach((item) => {
  const taskButton = item.querySelector(".task-btn");
  if (!taskButton) return;

  taskButton.addEventListener("click", () => {
    const isDone = item.dataset.state === "done";
    if (isDone) {
      item.dataset.state = "waiting";
      taskButton.textContent = "В работу";
    } else {
      item.dataset.state = "done";
      taskButton.textContent = "Готово";
    }

    const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
    applyFilter(activeFilter);
  });
});

buildReportButton?.addEventListener("click", () => {
  const now = new Date();
  const time = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  if (reportStatus) {
    reportStatus.textContent = `Отчёт собран и отправлен в клиентский канал (${time}).`;
  }
});

moduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Модуль подключён";
    button.disabled = true;
  });
});

ticketsInput?.addEventListener("input", updateSla);
operatorsInput?.addEventListener("input", updateSla);
priorityMix?.addEventListener("change", updateSla);

updateSla();
applyFilter("all");

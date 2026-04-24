const toggleButton = document.getElementById("toggle-view");
const chart = document.querySelector(".chart");
const navLinks = document.querySelectorAll(".sidebar nav a");
const averageNode = document.getElementById("chart-average");
const updatedNode = document.getElementById("chart-updated");

const lineNode = chart?.querySelector(".chart-line");
const areaNode = chart?.querySelector(".chart-area");
const pointsNode = chart?.querySelector(".chart-points");
const bars = chart ? [...chart.querySelectorAll(".bar")] : [];

const chartModes = {
  weekly: {
    bars: [41, 63, 56, 79, 86, 60, 48],
    line: [34, 46, 43, 59, 68, 53, 41],
    average: "Средняя квалификация: 61%",
    updated: "Данные обновлены 2 минуты назад",
    button: "Сравнить с 30 днями"
  },
  monthly: {
    bars: [72, 46, 82, 67, 58, 76, 88],
    line: [62, 39, 69, 56, 44, 63, 79],
    average: "Средняя квалификация: 70%",
    updated: "Срез за 30 дней обновлён 10 минут назад",
    button: "Назад к неделе"
  }
};

const buildPoints = (values) => {
  const width = 700;
  const height = 220;
  const padX = 26;
  const padTop = 16;
  const padBottom = 16;

  return values.map((value, index) => {
    const x = padX + (index * (width - padX * 2)) / (values.length - 1);
    const y = height - padBottom - ((height - padTop - padBottom) * value) / 100;
    return { x, y };
  });
};

const pointsToLinePath = (points) => {
  if (points.length === 0) return "";
  return `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`;
};

const pointsToAreaPath = (points) => {
  if (points.length === 0) return "";
  const baseline = 204;
  const first = points[0];
  const last = points[points.length - 1];
  return `M ${first.x} ${baseline} L ${points.map((point) => `${point.x} ${point.y}`).join(" L ")} L ${last.x} ${baseline} Z`;
};

const renderPoints = (points) => {
  if (!pointsNode) return;
  pointsNode.innerHTML = points
    .map(
      (point, index) =>
        `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="4.2" style="animation-delay:${index * 0.12}s"></circle>`
    )
    .join("");
};

const updateBars = (values) => {
  bars.forEach((bar, index) => {
    const valueNode = bar.querySelector("i");
    if (!valueNode) return;

    const current = values[index] ?? 0;
    const previous = index === 0 ? current : values[index - 1];

    bar.classList.remove("up", "down", "flat");
    if (Math.abs(current - previous) < 4) {
      bar.classList.add("flat");
    } else if (current > previous) {
      bar.classList.add("up");
    } else {
      bar.classList.add("down");
    }

    valueNode.style.height = `${current}%`;
  });
};

const renderChart = (mode) => {
  if (!chart || !lineNode || !areaNode) return;

  const selectedMode = chartModes[mode] ? mode : "weekly";
  const modeData = chartModes[selectedMode];
  const points = buildPoints(modeData.line);

  chart.dataset.mode = selectedMode;
  updateBars(modeData.bars);

  lineNode.setAttribute("d", pointsToLinePath(points));
  areaNode.setAttribute("d", pointsToAreaPath(points));
  renderPoints(points);

  if (averageNode) averageNode.textContent = modeData.average;
  if (updatedNode) updatedNode.textContent = modeData.updated;
  if (toggleButton) toggleButton.textContent = modeData.button;

  chart.classList.remove("is-refreshing");
  void chart.offsetWidth;
  chart.classList.add("is-refreshing");
};

toggleButton?.addEventListener("click", () => {
  const currentMode = chart?.dataset.mode === "monthly" ? "monthly" : "weekly";
  const nextMode = currentMode === "weekly" ? "monthly" : "weekly";
  renderChart(nextMode);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((node) => node.classList.remove("active"));
    link.classList.add("active");
  });
});

renderChart("weekly");

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (node) => {
  const target = Number(node.dataset.counter || 0);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    node.textContent = Math.floor(target * progress);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      node.textContent = target;
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => observer.observe(counter));

const languageStorageKey = "portfolio_ui_lang";
let uiLang = localStorage.getItem(languageStorageKey) === "en" ? "en" : "ru";

const translationGroups = [
  { selector: ".brand", en: ["Portfolio"] },
  { selector: ".topnav a", en: ["About", "Bot", "Projects", "Approach", "Process", "Contact"] },
  { selector: ".intro-copy .eyebrow", en: ["Intro"] },
  { selector: ".intro-copy h2", en: ["Hi everyone, I'm Ilya."] },
  {
    selector: ".intro-copy p",
    en: [
      "Full-Stack developer. I help businesses launch websites, bots, and interfaces that don't just look good, but actually solve problems."
    ]
  },
  { selector: ".intro-actions a", en: ["More about me", "View projects"] },
  { selector: ".hero-copy > .eyebrow", en: ["Ilya • Websites • Bots • Automation"] },
  { selector: ".hero-title", en: ["I build websites and bots that look like strong commercial products."] },
  {
    selector: ".hero-text",
    en: [
      "I launch landing pages, client services, Telegram bots, and working dashboards with clear business logic."
    ]
  },
  { selector: ".hero-actions a", en: ["View projects", "Try the bot"] },
  {
    selector: ".metrics-grid span",
    en: [
      "active project directions",
      "formats: bots, websites, dashboards, services",
      "hours on average to ship the first working version"
    ]
  },
  { selector: ".hero-board .card-label", en: ["Work format", "Positioning", "Result"] },
  { selector: ".hero-board .board-large h2", en: ["Clear delivery without overload"] },
  {
    selector: ".hero-board .board-large p",
    en: ["Websites, bots, and interfaces that look and work like mature products with a clear user flow."]
  },
  { selector: ".hero-board .board-tags span", en: ["Telegram bots", "Lead generation", "Dashboards", "UI systems"] },
  { selector: ".board-row .board-card strong", en: ["Product-first approach", "Opens and sells from the first screen"] },
  {
    selector: ".board-row .board-card p",
    en: [
      "Focus on outcomes, metrics, and user convenience.",
      "Clean static showcase that's easy to share."
    ]
  },
  { selector: "#about .section-heading .eyebrow", en: ["About"] },
  { selector: "#about .section-heading h2", en: ["A developer who takes a task from idea to a ready showcase"] },
  { selector: "#about .about-main h3", en: ["Ilya, interface and automation developer"] },
  {
    selector: "#about .about-main p",
    en: [
      "I build product interfaces, landing pages, Telegram bots, and internal panels so they look like mature commercial products, not template demos.",
      "I work fast and clean with focus on outcomes: clear offer, strong visual delivery, and logic that convinces."
    ]
  },
  { selector: "#about .about-card:nth-of-type(2) h3", en: ["My stack"] },
  {
    selector: "#about .about-card:nth-of-type(2) li",
    en: [
      "HTML, CSS, JavaScript, responsive layout",
      "UI/UX, design systems, conversion-focused landing pages",
      "Bots, automation, integrations, and MVP interfaces"
    ]
  },
  { selector: "#about .about-card:nth-of-type(3) h3", en: ["How I work"] },
  {
    selector: "#about .about-card:nth-of-type(3) li",
    en: [
      "Fast start from a short brief",
      "Clear stages and intermediate releases",
      "A result you're comfortable showing to a client"
    ]
  },
  { selector: "#bot .section-heading .eyebrow", en: ["Interactive"] },
  { selector: "#bot .section-heading h2", en: ["Telegram bot right on the site"] },
  { selector: "#bot .bot-instructions h3", en: ["Commands for a quick test"] },
  {
    selector: "#bot .bot-instructions p",
    en: [
      "Click commands or type them manually. Sales and support modes are built in.",
      "Free input also works, for example: \"need a lead-gen bot\" or \"need a launch website\"."
    ]
  },
  { selector: ".mode-chip", en: ["Sales", "Support"] },
  { selector: "#bot-form .button", en: ["Send"] },
  { selector: "#lead-form .lead-submit", en: ["Save lead"] },
  { selector: "#projects .section-heading .eyebrow", en: ["Projects"] },
  { selector: "#projects .section-heading h2", en: ["A selection of projects across key product directions"] },
  { selector: ".project-type", en: ["Bot Platform", "Analytics Platform", "Marketing Website", "Client Portal", "E-commerce"] },
  {
    selector: ".project-card .project-meta > p",
    en: [
      "Telegram bot for lead capture, qualification, and funnel routing tailored for a SaaS product or a client case.",
      "Monitoring dashboard for campaigns, operator workload, funnel statuses, and signal-based decision making.",
      "Atmospheric landing page for a studio or premium specialist with focus on taste, confidence, and visual delivery.",
      "Workspace for clients and team: task statuses, launch stages, comments, progress counters, and project visibility.",
      "Premium product page for a digital product, course, or tech brand with strong conversion-focused presentation."
    ]
  },
  {
    selector: ".project-card .project-meta li",
    en: [
      "Scenario: lead generation and auto-qualification",
      "Looks like: agency product or client case",
      "Format: interactive working interface",
      "Scenario: SaaS admin panel or internal tool",
      "Looks like: mature MVP service",
      "Format: data-rich interface",
      "Scenario: client website or studio homepage",
      "Looks like: premium marketing landing",
      "Format: static presentation with atmosphere",
      "Scenario: CRM, client portal, service panel",
      "Looks like: internal studio or agency product",
      "Format: clean operational interface",
      "Scenario: product launch, info-product, digital shop",
      "Looks like: branded e-commerce storefront",
      "Format: conversion landing page with cards and offer"
    ]
  },
  { selector: ".project-card .project-meta a", en: ["Open project", "Open project", "Open project", "Open project", "Open project"] },
  { selector: ".strategy-section .section-heading .eyebrow", en: ["Approach & process"] },
  { selector: ".strategy-section .section-heading h2", en: ["One cohesive system: from idea to confident release"] },
  {
    selector: ".strategy-section .section-heading p",
    en: ["I combine visuals, product logic, and working flows so the interface looks convincing, polished, and premium from the start."]
  },
  { selector: ".strategy-section .info-card h3", en: ["Visual delivery with character", "Product logic inside", "Fast release without compromises"] },
  {
    selector: ".strategy-section .info-card p",
    en: [
      "Bold typography, clear hierarchy, and emphasis on what matters. The page holds attention and communicates value immediately.",
      "Each showcase has an action scenario: metrics, states, funnels, decision points, and clear next steps.",
      "First we launch a working version, then scale modules, automation, and improvements based on data."
    ]
  },
  { selector: "#process .section-heading .eyebrow", en: ["Launch stages"] },
  { selector: "#process .section-heading h2", en: ["From idea to release: a compact process with predictable outcomes"] },
  { selector: "#process .timeline h3", en: ["Define goal and scenario", "Build architecture and visuals", "Release and scale"] },
  {
    selector: "#process .timeline p",
    en: [
      "We define the task, audience, channel, and key conversion points.",
      "We design structure, offer, micro-interactions, and key states.",
      "We launch a working version, connect analytics, and improve based on actual data."
    ]
  },
  { selector: "#contact .eyebrow", en: ["Collaboration"] },
  { selector: "#contact h2", en: ["Ready to join your project and ship a working release"] },
  {
    selector: "#contact p",
    en: ["I work transparently: short brief, stages, regular updates, and a final result that is ready to launch."]
  },
  { selector: "#contact .contact-actions a", en: ["Submit request", "View projects"] }
];

const placeholderGroups = [
  { selector: "#bot-input", en: ["Type a command or message..."] },
  { selector: "#lead-name", en: ["Name"] },
  { selector: "#lead-contact", en: ["Contact (Telegram / Email)"] },
  { selector: "#lead-task", en: ["Briefly: what is the task and what should be built"] }
];

const ruTextSnapshots = translationGroups.map((group) =>
  [...document.querySelectorAll(group.selector)].map((node) => node.textContent)
);
const ruPlaceholderSnapshots = placeholderGroups.map((group) =>
  [...document.querySelectorAll(group.selector)].map((node) => node.getAttribute("placeholder") || "")
);

const pageTitleRu = document.title;
const pageDescriptionNode = document.querySelector('meta[name="description"]');
const pageDescriptionRu = pageDescriptionNode?.getAttribute("content") || "";

const applyLanguage = (lang) => {
  uiLang = lang === "en" ? "en" : "ru";

  translationGroups.forEach((group, groupIndex) => {
    const nodes = [...document.querySelectorAll(group.selector)];
    nodes.forEach((node, nodeIndex) => {
      const nextText = uiLang === "en" ? group.en[nodeIndex] : ruTextSnapshots[groupIndex]?.[nodeIndex];
      if (typeof nextText === "string") {
        node.textContent = nextText;
      }
    });
  });

  placeholderGroups.forEach((group, groupIndex) => {
    const nodes = [...document.querySelectorAll(group.selector)];
    nodes.forEach((node, nodeIndex) => {
      const nextPlaceholder = uiLang === "en" ? group.en[nodeIndex] : ruPlaceholderSnapshots[groupIndex]?.[nodeIndex];
      if (typeof nextPlaceholder === "string") {
        node.setAttribute("placeholder", nextPlaceholder);
      }
    });
  });

  document.documentElement.lang = uiLang;
  if (uiLang === "en") {
    document.title = "Portfolio - Full-Stack Developer";
    pageDescriptionNode?.setAttribute(
      "content",
      "Portfolio: websites, bots, dashboards, and automation for business. Development focused on outcomes and clear product logic."
    );
  } else {
    document.title = pageTitleRu;
    pageDescriptionNode?.setAttribute("content", pageDescriptionRu);
  }

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === uiLang);
  });
};

const initLanguageSwitch = () => {
  const buttons = [...document.querySelectorAll(".lang-btn")];
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLang = button.dataset.lang === "en" ? "en" : "ru";
      applyLanguage(nextLang);
      localStorage.setItem(languageStorageKey, nextLang);
    });
  });

  applyLanguage(uiLang);
};

initLanguageSwitch();

const initAmbientReveal = () => {
  const activate = () => {
    document.body.classList.add("is-awake");
  };

  if (document.readyState === "complete") {
    activate();
  } else {
    window.addEventListener("load", activate, { once: true });
  }
};

initAmbientReveal();

const initCursorEffect = () => {
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hasFinePointer || reduceMotion) return;

  const aura = document.createElement("div");
  aura.className = "cursor-aura";
  document.body.append(aura);

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let isVisible = false;
  let frameId = 0;

  const setActive = (active) => {
    if (isVisible === active) return;
    isVisible = active;
    aura.classList.toggle("active", active);
  };

  const renderAura = () => {
    aura.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    frameId = 0;
  };

  const scheduleRender = () => {
    if (frameId !== 0) return;
    frameId = requestAnimationFrame(renderAura);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setActive(true);
      scheduleRender();
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => setActive(false));
  window.addEventListener("blur", () => setActive(false));
  scheduleRender();
};

initCursorEffect();

const botForm = document.getElementById("bot-form");
const botInput = document.getElementById("bot-input");
const botLog = document.getElementById("bot-log");
const commandChips = document.querySelectorAll(".command-chip");
const modeChips = document.querySelectorAll(".mode-chip");
const leadForm = document.getElementById("lead-form");
const leadName = document.getElementById("lead-name");
const leadContact = document.getElementById("lead-contact");
const leadTask = document.getElementById("lead-task");
const leadStatus = document.getElementById("lead-status");

let botMode = "sales";
const leadsStorageKey = "ilya_site_leads";

const modeReplies = {
  sales: {
    "/start":
      "Привет. Я в режиме продаж. Помогу определить задачу и формат запуска.",
    "/services":
      "Делаю лендинги, Telegram-ботов, дашборды и клиентские кабинеты под запуск.",
    "/price":
      "Базовый запуск обычно занимает 1-3 дня. Точный расчет даю после мини-брифа.",
    "/contact":
      "Оставь контакт и задачу в форме ниже. Сохраню заявку и подготовлю ответ."
  },
  support: {
    "/start":
      "Привет. Я в режиме поддержки. Помогу с ошибкой, статусом и next steps.",
    "/status":
      "Статус: бот активен. Если нужна проверка задачи, опиши проблему в одном сообщении.",
    "/bug":
      "Чтобы зафиксировать баг: что ожидалось, что получилось, где воспроизводится.",
    "/contact":
      "Оставь контакт и описание проблемы в форме заявки, чтобы передать в работу."
  }
};

const modeRepliesEn = {
  sales: {
    "/start": "Hi. I'm in sales mode. I can help define your task and launch format.",
    "/services": "I build landing pages, Telegram bots, dashboards, and client portals for launch.",
    "/price": "A basic launch usually takes 1-3 days. I can estimate after a short mini-brief.",
    "/contact": "Leave your contact and task in the form below. I'll save the lead and prepare a reply."
  },
  support: {
    "/start": "Hi. I'm in support mode. I can help with bugs, status checks, and next steps.",
    "/status": "Status: bot is active. If you need task verification, describe the issue in one message.",
    "/bug": "To report a bug: what you expected, what happened, and where it reproduces.",
    "/contact": "Leave your contact and issue details in the form below so we can route it to work."
  }
};

const appendBotMessage = (text, role = "bot") => {
  if (!botLog) return;
  const node = document.createElement("div");
  node.className = `bot-message ${role}`;
  node.textContent = text;
  botLog.appendChild(node);
  botLog.scrollTop = botLog.scrollHeight;
};

const readLeads = () => {
  try {
    const raw = localStorage.getItem(leadsStorageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const updateModeChips = () => {
  modeChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.mode === botMode);
  });
};

const getSmartReply = (message) => {
  const normalized = message.trim().toLowerCase();
  const isEn = uiLang === "en";
  const currentModeReplies = (isEn ? modeRepliesEn : modeReplies)[botMode] || {};
  const hasAny = (words) => words.some((word) => normalized.includes(word));

  if (normalized === "/help") {
    if (botMode === "sales") {
      return isEn
        ? "Sales mode: /services, /price, /contact. You can also describe your project in free text."
        : "Режим продаж: /services, /price, /contact. Можно писать свободно про проект.";
    }
    return isEn
      ? "Support mode: /status, /bug, /contact. You can describe the issue in free text."
      : "Режим поддержки: /status, /bug, /contact. Можно описать проблему текстом.";
  }

  if (currentModeReplies[normalized]) {
    return currentModeReplies[normalized];
  }

  if (botMode === "sales") {
    if (hasAny(["бот", "bot", "telegram"])) {
      return isEn
        ? "Great. For a bot, share your traffic channel, key scenarios, and where leads should be routed."
        : "Отлично. Для бота подскажи канал трафика, ключевые сценарии и куда передавать лиды.";
    }

    if (hasAny(["сайт", "лендинг", "website", "site", "landing"])) {
      return isEn
        ? "For a website, I can assemble offer structure, visual direction, and a responsive launch-ready page."
        : "Для сайта соберу структуру оффера, дизайн и адаптивную витрину под запуск.";
    }

    if (hasAny(["дашборд", "панел", "dashboard", "panel"])) {
      return isEn
        ? "For a dashboard, we need metric structure, user roles, and data refresh cadence."
        : "Для дашборда нужна схема метрик, роли пользователей и частота обновления данных.";
    }

    if (hasAny(["цена", "стоим", "price", "cost", "budget"])) {
      return isEn
        ? "Pricing depends on scope. I can estimate after a short mini-brief in 5-7 messages."
        : "Стоимость зависит от объема. Могу оценить после короткого мини-брифа в 5-7 сообщений.";
    }

    return isEn
      ? "Got it. I'm in sales mode and can suggest project format, timeline, and budget."
      : "Принял. Я в режиме продаж: могу подсказать формат проекта, сроки и стоимость.";
  }

  if (normalized === "/services" || normalized === "/price") {
    return isEn
      ? "Support mode is active now. Switch to Sales mode for commercial questions."
      : "Сейчас активен режим поддержки. Для коммерции переключи режим на «Продажи».";
  }

  if (hasAny(["ошиб", "баг", "error", "bug", "issue"])) {
    return isEn
      ? "Got it. Please describe reproduction steps and where exactly the issue appears."
      : "Принял. Опиши шаги воспроизведения и где именно возникает ошибка.";
  }

  if (hasAny(["не работает", "не груз", "not working", "doesn't work", "wont load", "won't load"])) {
    return isEn
      ? "Understood. Check browser console and send the error text through the lead form below."
      : "Понял. Проверь консоль браузера и отправь текст ошибки через форму заявки ниже.";
  }

  if (hasAny(["статус", "status"])) {
    return isEn
      ? "You can refresh status with /status and share task details in the form."
      : "Статус можно обновить через /status, а детали задачи передать в форме.";
  }

  return isEn
    ? "Got it. I'm in support mode and can help with diagnostics and next steps."
    : "Принял. Я в режиме поддержки: помогу с диагностикой и next steps.";
};

if (botLog) {
  appendBotMessage(
    uiLang === "en"
      ? "Hi. This is an interactive Telegram bot demo. Mode: sales."
      : "Привет. Это интерактивный Telegram-бот. Режим: продажи."
  );
}

if (botForm && botInput) {
  botForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = botInput.value.trim();
    if (!value) return;

    appendBotMessage(value, "user");
    botInput.value = "";

    const reply = getSmartReply(value);
    window.setTimeout(() => {
      appendBotMessage(reply, "bot");
    }, 260);
  });
}

commandChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const cmd = chip.dataset.command;
    if (!cmd || !botInput || !botForm) return;
    botInput.value = cmd;
    botForm.requestSubmit();
  });
});

modeChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const nextMode = chip.dataset.mode;
    if (!nextMode || nextMode === botMode) return;
    botMode = nextMode;
    updateModeChips();
    if (botMode === "sales") {
      appendBotMessage(
        uiLang === "en"
          ? "Switched to Sales mode. Type /help to see commands."
          : "Переключено на режим продаж. Напиши /help для списка команд."
      );
    } else {
      appendBotMessage(
        uiLang === "en"
          ? "Switched to Support mode. Type /help to see commands."
          : "Переключено на режим поддержки. Напиши /help для списка команд."
      );
    }
  });
});

if (leadForm && leadName && leadContact && leadTask && leadStatus) {
  const existingLeads = readLeads();
  if (existingLeads.length > 0) {
    leadStatus.textContent =
      uiLang === "en"
        ? `Leads saved locally: ${existingLeads.length}.`
        : `Локально сохранено заявок: ${existingLeads.length}.`;
  }

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = leadName.value.trim();
    const contact = leadContact.value.trim();
    const task = leadTask.value.trim();

    if (!name || !contact || !task) {
      leadStatus.textContent =
        uiLang === "en"
          ? "Fill in name, contact, and task to save the lead."
          : "Заполни имя, контакт и задачу, чтобы сохранить заявку.";
      return;
    }

    const lead = {
      name,
      contact,
      task,
      mode: botMode,
      createdAt: new Date().toISOString()
    };

    try {
      const currentLeads = readLeads();
      currentLeads.unshift(lead);
      localStorage.setItem(leadsStorageKey, JSON.stringify(currentLeads.slice(0, 100)));

      leadStatus.textContent =
        uiLang === "en"
          ? `Lead saved. Local count: ${Math.min(currentLeads.length, 100)}.`
          : `Заявка сохранена. Локально: ${Math.min(currentLeads.length, 100)}.`;
      appendBotMessage(
        uiLang === "en"
          ? `Lead accepted: ${name}, mode ${botMode === "sales" ? "sales" : "support"}.`
          : `Заявка принята: ${name}, режим ${botMode === "sales" ? "продаж" : "поддержки"}.`
      );
      leadForm.reset();
    } catch (error) {
      leadStatus.textContent =
        uiLang === "en"
          ? "Couldn't save the lead to localStorage."
          : "Не удалось сохранить заявку в localStorage.";
    }
  });
}

updateModeChips();

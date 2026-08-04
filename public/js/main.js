(function () {
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      const icon = theme === 'dark' ? 'moon' : 'sun';
      themeToggle.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i>`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setLanguage(language) {
    document.cookie = `i18next=${language}; path=/; max-age=31536000; SameSite=Lax`;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.location.href = url.toString();
  }

  function setupCertificationTabs() {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) {
      return;
    }

    function activateTab(tab) {
      tabs.forEach((item) => {
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', selected ? 'true' : 'false');
        item.setAttribute('tabindex', selected ? '0' : '-1');
        if (panel) {
          panel.classList.toggle('d-none', !selected);
        }
      });
      tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
        if (!keys.includes(event.key)) {
          return;
        }

        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        }

        activateTab(tabs[nextIndex]);
      });
    });
  }

  function setupContactValidation() {
    const form = document.getElementById('contactForm');
    const alert = document.getElementById('formAlert');
    if (!form || !alert) {
      return;
    }

    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        alert.textContent = form.dataset.validationRequired || 'Please complete the required fields before sending your message.';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTheme(getPreferredTheme());

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }

    document.querySelectorAll('[data-language]').forEach(function (control) {
      control.addEventListener('click', function () {
        setLanguage(control.getAttribute('data-language'));
      });
    });

    document.querySelectorAll('[data-print-page]').forEach((button) => {
      button.addEventListener('click', () => window.print());
    });

    setupCertificationTabs();
    setupContactValidation();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
}());

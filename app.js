/**
 * PORTFOLIO APPLICATION LOGIC
 * High-craft interactions, scroll triggers, clipboard management, and interactive tabs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTerminalTabs();
  initEmailCopy();
  initHeaderScroll();
});

/**
 * 1. IntersectionObserver for Smooth, Non-Janky Scroll Entrance
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/**
 * 2. Emil-Style Micro-Tab Switcher for the Terminal Explorer
 */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const panes = document.querySelectorAll('.tab-content-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update tab active states
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update pane states with smooth display toggle
      panes.forEach(pane => {
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 3. Clipboard Copy with Toast Feedback
 */
function initEmailCopy() {
  const copyButtons = [
    document.getElementById('copyEmailBtn'),
    document.getElementById('copyContactEmailBtn')
  ].filter(Boolean);

  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'Sumitkumar_264071@aitpune.edu.in';
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        showToast(`Copied ${email} to clipboard`);

        const btnText = btn.querySelector('#copyBtnText');
        if (btnText) {
          const original = btnText.textContent;
          btnText.textContent = 'Copied to Clipboard!';
          setTimeout(() => {
            btnText.textContent = original;
          }, 2200);
        }
      } catch (err) {
        showToast('Direct email: Sumitkumar_264071@aitpune.edu.in');
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/**
 * 4. Header Background Shift on Scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.style.backgroundColor = '#080A10';
        } else {
          header.style.backgroundColor = '#0C0F17';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

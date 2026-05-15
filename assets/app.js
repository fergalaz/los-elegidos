(function () {
  'use strict';

  const SERVICES = {
    spotify: {
      name: 'Spotify',
      color: '#1DB954',
      url: q => `https://open.spotify.com/search/${encodeURIComponent(q)}`
    },
    apple: {
      name: 'Apple Music',
      color: '#FA233B',
      url: q => `https://music.apple.com/search?term=${encodeURIComponent(q)}`
    },
    youtube: {
      name: 'YouTube Music',
      color: '#FF0000',
      url: q => `https://music.youtube.com/search?q=${encodeURIComponent(q)}`
    },
    tidal: {
      name: 'Tidal',
      color: '#000000',
      url: q => `https://listen.tidal.com/search?q=${encodeURIComponent(q)}`
    },
    deezer: {
      name: 'Deezer',
      color: '#a238ff',
      url: q => `https://www.deezer.com/search/${encodeURIComponent(q)}`
    },
    amazon: {
      name: 'Amazon Music',
      color: '#25D1DA',
      url: q => `https://music.amazon.com/search?keywords=${encodeURIComponent(q)}`
    }
  };

  const STORAGE_KEY = 'preferred-music-service';
  const DEFAULT = 'spotify';

  function getService() {
    const key = localStorage.getItem(STORAGE_KEY);
    return (key && SERVICES[key]) ? key : DEFAULT;
  }

  function setService(key) {
    if (!SERVICES[key]) return;
    localStorage.setItem(STORAGE_KEY, key);
    render();
  }

  function buildPicker() {
    const bar = document.createElement('div');
    bar.id = 'service-picker';
    bar.innerHTML = `
      <div class="sp-inner">
        <span class="sp-label">Elige la plataforma streaming que usas</span>
        <div class="sp-buttons" role="tablist">
          ${Object.entries(SERVICES).map(([key, s]) => `
            <button class="sp-btn" data-service="${key}" style="--accent: ${s.color}" role="tab" aria-label="${s.name}">${s.name}</button>
          `).join('')}
        </div>
      </div>
    `;
    // Inserta el picker justo antes del bloque de contenido principal
    // (después del título/intro). Funciona en master, índice de década y año.
    const content = document.querySelector('.decades-grid, .grid, ol');
    if (content && content.parentNode) {
      content.parentNode.insertBefore(bar, content);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.querySelectorAll('.sp-btn').forEach(btn => {
      btn.addEventListener('click', () => setService(btn.dataset.service));
    });
  }

  function render() {
    const current = getService();
    const accent = SERVICES[current].color;
    document.querySelectorAll('.sp-btn').forEach(btn => {
      const isActive = btn.dataset.service === current;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    document.documentElement.style.setProperty('--accent-color', accent);
  }

  function interceptLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.album');
      if (!link) return;
      const encoded = link.dataset.search;
      if (!encoded) return;
      e.preventDefault();
      const query = decodeURIComponent(encoded);
      const service = SERVICES[getService()];
      window.open(service.url(query), '_blank', 'noopener,noreferrer');
    });
  }

  function init() {
    buildPicker();
    render();
    interceptLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

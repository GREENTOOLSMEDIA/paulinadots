// js/gallery-loader.js
const prompts = {}; // necesario para que funcione openPrompt()

fetch('paulina_dots_gallery_data.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n');
    const headers = lines[1].split(';'); // omite la primera línea global del CSV

    const items = lines.slice(2).map(line => {
      const values = line.split(';');
      const item = {};
      headers.forEach((header, index) => {
        item[header.trim()] = values[index]?.trim() || '';
      });
      return item;
    });

    const gallery = document.querySelector('.gallery');
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="images/${item.IMG_FILE}" alt="${item.TITLE}" class="main-photo">
        <div class="overlay">
          <h3>${item.TITLE}</h3>
          <p>${item.DESCRIPTION}</p>
          <div class="overlay-controls">
            <button onclick="openPrompt('${item.PROMPT_ID}')">Prompt</button>
            <button onclick="openVideo('${item.VIDEO_URL}')">Video</button>
            <div class="like-button" onclick="incrementLike(this)">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-6.5-5.2-9-9C1.2 9 2 5 5 5c2 0 3 2 3 2s1-2 3-2c3 0 4 4 2 7-2.5 3.8-4 5-4 5z" stroke-width="1.5"/></svg>
              <span class="like-count">${item.LIKES}</span>
            </div>
          </div>
        </div>
        <img src="images/PaulinaDotsLogo.svg" class="watermark" alt="Logo">
      `;
      gallery.appendChild(card);

      // Guarda el prompt para uso posterior
      prompts[item.PROMPT_ID] = item.PROMPT_TEXT;
    });
  })
  .catch(error => {
    console.error('Error loading gallery:', error);
    document.querySelector('.gallery').innerHTML = `<p style="padding: 2rem; color: white;">Failed to load gallery.</p>`;
  });

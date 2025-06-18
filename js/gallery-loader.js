// js/gallery-loader.js
fetch('paulina_dots_gallery_data.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n');
    const headers = rows[0].split(';');
    const gallery = document.querySelector('.gallery');

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(';');
      const data = {};
      headers.forEach((h, j) => data[h.trim()] = cols[j]?.trim());

      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="images/${data.IMG_FILE}" alt="${data.TITLE}" class="main-photo">
        <div class="overlay">
          <h3>${data.TITLE}</h3>
          <p>${data.DESCRIPTION}</p>
          <div class="overlay-controls">
            <button onclick="openPrompt('${data.PROMPT_ID}')">Prompt</button>
            <button onclick="openVideo('${data.VIDEO_URL}')">Video</button>
            <div class="like-button" onclick="incrementLike(this)">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-6.5-5.2-9-9C1.2 9 2 5 5 5c2 0 3 2 3 2s1-2 3-2c3 0 4 4 2 7-2.5 3.8-4 5-4 5z" stroke-width="1.5"/></svg>
              <span class="like-count">${data.LIKES}</span>
            </div>
          </div>
        </div>
        <img src="images/PaulinaDotsLogo.svg" class="watermark" alt="Logo">
      `;
      gallery.appendChild(card);
    }
  })
  .catch(error => console.error('Error loading CSV gallery:', error));

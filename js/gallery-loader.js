fetch('paulina_dots_gallery_data.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1); // omitir encabezado
    const gallery = document.querySelector('.gallery');
    const prompts = {};

    rows.forEach(row => {
      const [id, imgFile, title, description, videoUrl, promptId, promptText, likes] = row.split(';');

      prompts[promptId] = promptText;

      const card = document.createElement('div');
      card.className = 'photo-card';
      card.innerHTML = `
        <img src="images/${imgFile}" alt="${title}" class="main-photo">
        <div class="overlay">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="overlay-controls">
            <button onclick="openPrompt('${promptId}')">Prompt</button>
            <button onclick="openVideo('${videoUrl}')">Video</button>
            <div class="like-button" onclick="incrementLike(this)">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 21s-6.5-5.2-9-9C1.2 9 2 5 5 5c2 0 3 2 3 2s1-2 3-2c3 0 4 4 2 7-2.5 3.8-4 5-4 5z" stroke-width="1.5"/>
              </svg>
              <span class="like-count">${likes}</span>
            </div>
          </div>
        </div>
        <img src="images/PaulinaDotsLogo.svg" class="watermark" alt="Logo">
      `;
      gallery.appendChild(card);
    });

    // hacer global para los modales
    window.prompts = prompts;
  })
  .catch(error => {
    console.error('Error loading gallery:', error);
  });

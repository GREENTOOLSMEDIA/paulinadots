// js/gallery-loader.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("paulina_dots_gallery_data.csv")
    .then((response) => response.text())
    .then((csv) => {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",");
      const gallery = document.querySelector(".gallery");
      const prompts = {};

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        const data = Object.fromEntries(headers.map((h, j) => [h, cols[j]]));

        prompts[`prompt-${data.id}`] = data.prompt;

        const card = document.createElement("div");
        card.className = "photo-card";
        card.innerHTML = `
          <img src="images/${data.image}" alt="${data.title}" class="main-photo">
          <div class="overlay">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="overlay-controls">
              <button onclick="openPrompt('prompt-${data.id}')">Prompt</button>
              <button onclick="openVideo('${data.videoUrl}')">Video</button>
              <div class="like-button" onclick="incrementLike(this)">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-6.5-5.2-9-9C1.2 9 2 5 5 5c2 0 3 2 3 2s1-2 3-2c3 0 4 4 2 7-2.5 3.8-4 5-4 5z" stroke-width="1.5" stroke="white"/>
                </svg>
                <span class="like-count">${data.likes}</span>
              </div>
            </div>
          </div>
          <img src="images/PaulinaDotsLogo.svg" class="watermark" alt="Logo">
        `;
        gallery.appendChild(card);
      }

      // Export prompts to global scope
      window.prompts = prompts;
    });
});

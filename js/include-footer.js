// js/include-footer.js
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    const container = document.getElementById('footer-container');
    if (container) {
      container.innerHTML = data;
    } else {
      console.error('No se encontró el contenedor #footer-container.');
    }
  })
  .catch(error => console.error('Error al cargar el footer:', error));


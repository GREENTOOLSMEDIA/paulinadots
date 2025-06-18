// js/include-footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footerTarget = document.getElementById("footer-placeholder");
  if (footerTarget) {
    fetch("footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(data => {
        footerTarget.innerHTML = data;
      })
      .catch(error => {
        console.error("Footer load error:", error);
      });
  }
});

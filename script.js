document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".collapsible-header");
  
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
  
        // Toggle the "visible" class
        content.classList.toggle("visible");
  
        // Rotate the arrow
        const arrow = header.querySelector(".arrow");
        arrow.classList.toggle("rotated");
      });
    });
  });
  

// Handle modal
document.querySelectorAll(".itinerary-card").forEach((card) => {
    card.addEventListener("click", () => {
      // Fetch data from card
      const title = card.dataset.title;
      const time = card.dataset.time;
      const weather = card.dataset.weather;
      const notes = card.dataset.notes;
  
      // Populate modal
      document.getElementById("modal-title").innerText = title;
      document.getElementById("modal-time").innerText = `Time: ${time}`;
      document.getElementById("modal-weather").innerText = `Weather: ${weather}`;
      document.getElementById("modal-notes").innerText = `Notes: ${notes}`;
  
      // Show modal
      document.getElementById("modal").classList.add("visible");
    });
  });
  
  // Close modal logic
  document.querySelector(".close-modal").addEventListener("click", () => {
    document.getElementById("modal").classList.remove("visible");
  });
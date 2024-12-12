document.addEventListener("DOMContentLoaded", () => {
    // Collapsible headers
    const headers = document.querySelectorAll(".collapsible-header");
  
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
  
        // Toggle visibility
        content.classList.toggle("visible");
  
        // Rotate the arrow
        const arrow = header.querySelector(".arrow");
        arrow.classList.toggle("rotated");
      });
    });
  
    // Main Modal Logic
    const mainModal = document.getElementById("modal");
    const mainCloseBtn = document.getElementById("close-main-modal");
  
    document.querySelectorAll(".itinerary-card").forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.dataset.title;
        const time = card.dataset.time;
        const weather = card.dataset.weather;
        const notes = card.dataset.notes;
  
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-time").innerText = `Time: ${time}`;
        document.getElementById("modal-weather").innerText = `Weather: ${weather}`;
        document.getElementById("modal-notes").innerText = `Notes: ${notes}`;
  
        mainModal.classList.add("visible");
      });
    });
  
    mainCloseBtn.addEventListener("click", () => {
      mainModal.classList.remove("visible");
    });
  
    // Add Trip Modal Logic
    const addTripBtn = document.getElementById("add-trip-btn");
    const addTripModal = document.getElementById("add-trip-modal");
    const addTripCloseBtn = document.getElementById("close-add-trip-modal");
    const addTripForm = document.getElementById("add-trip-form");
    const itinerarySection = document.querySelector(".itinerary-section"); // Main section where trips are displayed
  
    addTripBtn.addEventListener("click", () => {
      addTripModal.classList.add("visible");
      addTripModal.classList.remove("hidden");
    });
  
    addTripCloseBtn.addEventListener("click", () => {
      addTripModal.classList.remove("visible");
      addTripModal.classList.add("hidden");
    });
  
    addTripForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get form data
      const category = document.getElementById("trip-category").value;
      const date = document.getElementById("trip-date").value;
      const startTime = document.getElementById("trip-start-time").value;
      const endTime = document.getElementById("trip-end-time").value;
      const location = document.getElementById("trip-location").value;
      const notes = document.getElementById("trip-notes").value;
  
      // Create new itinerary card
      const card = document.createElement("div");
      card.classList.add("itinerary-card");
      card.dataset.title = location;
      card.dataset.time = `${startTime} - ${endTime}`;
      card.dataset.weather = "Weather info not available"; // Default value
      card.dataset.notes = notes;
  
      card.innerHTML = `
        <div class="card-icon">📍</div>
        <div class="card-content">
          <h3>${location}</h3>
          <p>${startTime} - ${endTime}</p>
          <p>Notes: ${notes}</p>
        </div>
        <div class="card-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
  
      // Add event listener for the new card to show in modal
      card.addEventListener("click", () => {
        document.getElementById("modal-title").innerText = location;
        document.getElementById("modal-time").innerText = `Time: ${startTime} - ${endTime}`;
        document.getElementById("modal-weather").innerText = "Weather info not available";
        document.getElementById("modal-notes").innerText = `Notes: ${notes}`;
        mainModal.classList.add("visible");
      });
  
      // Append the new card to the itinerary section
      itinerarySection.appendChild(card);
  
      // Reset the form and close the modal
      addTripForm.reset();
      addTripModal.classList.remove("visible");
      addTripModal.classList.add("hidden");
    });
  });
  
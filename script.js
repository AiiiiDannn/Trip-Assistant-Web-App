document.addEventListener("DOMContentLoaded", () => {
    const ITINERARY_KEY = "paris_trip_events";
  
    const itinerarySection = document.querySelector(".itinerary-section");
    const tripHeader = document.querySelector(".trip-header");
    const tripToParisItem = document.getElementById("trip-to-paris");
    const addTripForm = document.getElementById("add-trip-form");
    const addTripModal = document.getElementById("add-trip-modal");
    const addTripCloseBtn = document.getElementById("close-add-trip-modal");
    const addTripBtn = document.getElementById("add-trip-btn");
    const mainModal = document.getElementById("modal");
    const mainCloseBtn = document.getElementById("close-main-modal");
  
    const modalTitle = document.getElementById("modal-title");
    const modalTime = document.getElementById("modal-time");
    const modalCategory = document.getElementById("modal-category");
    const modalLocation = document.getElementById("modal-location");
    const modalNotes = document.getElementById("modal-notes");
    const modalWeather = document.getElementById("modal-weather");

    const notificationButton = document.querySelector(".top-bar-right img");
    const signupButton = document.querySelector(".sign-btn");

    // Notification and signup modal elements
    const notificationModal = document.getElementById("notification-modal");
    const signupModal = document.getElementById("signup-modal");
    const notificationCloseBtn = document.getElementById("close-notification-modal");
    const signupCloseBtn = document.getElementById("close-signup-modal");

    // Show modals on button clicks
    notificationButton.addEventListener("click", () => {
        notificationModal.classList.add("visible");
    });

    signupButton.addEventListener("click", () => {
        signupModal.classList.add("visible");
    });

    // Close modals on close button clicks
    notificationCloseBtn.addEventListener("click", () => {
        notificationModal.classList.remove("visible");
    });

    signupCloseBtn.addEventListener("click", () => {
        signupModal.classList.remove("visible");
    });

    // Define filter checkboxes
    const filterCheckboxes = document.querySelectorAll(".filter .collapsible-content input[type='checkbox']");

  
    const weatherCodeMapping = {
      "0": "Unknown",
      "1000": "Clear, Sunny",
      "1100": "Mostly Clear",
      "1101": "Partly Cloudy",
      "1102": "Mostly Cloudy",
      "1001": "Cloudy",
      "2000": "Fog",
      "2100": "Light Fog",
      "4000": "Drizzle",
      "4001": "Rain",
      "4200": "Light Rain",
      "4201": "Heavy Rain",
      "5000": "Snow",
      "5001": "Flurries",
      "5100": "Light Snow",
      "5101": "Heavy Snow",
      "6000": "Freezing Drizzle",
      "6001": "Freezing Rain",
      "6200": "Light Freezing Rain",
      "6201": "Heavy Freezing Rain",
      "7000": "Ice Pellets",
      "7101": "Heavy Ice Pellets",
      "7102": "Light Ice Pellets",
      "8000": "Thunderstorm",
    };
  
    // Fetch weather for a location
    const fetchWeather = (location) => {
      const apiKey = "M5RsHE1wTXYgDqS9E6Y3yziFTOn0NjqE";
      location = location.toLowerCase();
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };
  
      return fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const weatherData = data.data.values;
          return {
            code: weatherData.weatherCode,
            description: weatherCodeMapping[weatherData.weatherCode] || "Unknown",
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            visibility: weatherData.visibility,
            windSpeed: weatherData.windSpeed,
          };
        });
    };
  
    // Load events from LocalStorage
    const loadItinerary = () => {
      const events = localStorage.getItem(ITINERARY_KEY);
      return events ? JSON.parse(events) : [];
    };
  
    // Save events to LocalStorage
    const saveItinerary = (events) => {
      localStorage.setItem(ITINERARY_KEY, JSON.stringify(events));
      updateTripHeaderDates();
    };
  
    // Sort events by date and time
    const sortEvents = (events) => {
      return events.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time.split(" - ")[0]}`);
        const dateB = new Date(`${b.date} ${b.time.split(" - ")[0]}`);
        return dateA - dateB;
      });
    };

    // Get active categories based on filter checkboxes
    const getActiveCategories = () => {
        return Array.from(filterCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.dataset.category);
    };


    // Update trip header date range dynamically
const updateTripHeaderDates = () => {
    const events = loadItinerary();
    if (events.length === 0) {
        const tripInfoText = document.querySelector(".trip-info-text p");
        tripInfoText.textContent = "📅 No trips available.";
        return;
    }

    const sortedDates = events
        .map((event) => new Date(event.date))
        .sort((a, b) => a - b); // Sort dates in ascending order

    // Ensure startDate and endDate include full day
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);

    startDate.setHours(0, 0, 0, 0); // Set to start of the day
    endDate.setHours(23, 59, 59, 999); // Set to end of the day

    startDate.setDate(startDate.getDate() + 1); // Include the previous day
    endDate.setDate(endDate.getDate() + 1);

    // Fix the inclusive date range
    if (sortedDates.length === 1) {
        endDate.setDate(endDate.getDate()); // Single date event
    } else {
        endDate.setDate(endDate.getDate()); // Include the last day
    }

    // Format dates as Month Day
    const formatDate = (date) => {
        const options = { month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    const tripInfoText = document.querySelector(".trip-info-text p");
    tripInfoText.textContent = `📅 ${formatDate(startDate)} - ${formatDate(endDate)}`;
};


  
// Render itinerary
const renderItinerary = () => {
    const events = sortEvents(loadItinerary());
    const activeCategories = getActiveCategories();
    itinerarySection.innerHTML = "";
    itinerarySection.appendChild(tripHeader);
  
    if (events.length === 0) {
      const noContent = document.createElement("p");
      noContent.textContent = "No events added yet.";
      itinerarySection.appendChild(noContent);
      updateTripHeaderDates();
      return;
    }
  
    const eventsByDate = events.reduce((acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    }, {});
  
    Object.keys(eventsByDate).forEach((date) => {
      const dateHeader = document.createElement("div");
      dateHeader.classList.add("date-header");
      dateHeader.textContent = date;
      itinerarySection.appendChild(dateHeader);
  
      eventsByDate[date]
        .filter((event) => activeCategories.includes(event.category))
        .forEach((event) => {
          const card = document.createElement("div");
          card.classList.add("itinerary-card");
          card.dataset.id = event.id;
  
          card.innerHTML = `
            <div class="card-icon">📍</div>
            <div class="card-content">
              <h3>${event.title}</h3>
              <p>Time: ${event.time}</p>
              <p>Category: ${event.category}</p>
              <p>Location: ${event.location.charAt(0).toUpperCase() + event.location.slice(1).toLowerCase()}</p>
            </div>
            <div class="card-actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
          `;
  
          card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("edit-btn") && !e.target.classList.contains("delete-btn")) {
              showEventDetails(event);
            }
          });
  
          card.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteItineraryEvent(event.id);
            updateTripHeaderDates();
          });
  
          card.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            editItineraryEvent(event.id, event);
            updateTripHeaderDates();
          });
  
          itinerarySection.appendChild(card);
        });
    });
  };
  
    // Show event details with weather
    const showEventDetails = (event) => {
      modalTitle.innerText = "Loading...";
      modalTime.innerText = "Loading...";
      modalCategory.innerText = "Loading...";
      modalLocation.innerText = "Loading...";
      modalNotes.innerText = "Loading...";
      modalWeather.innerText = "Fetching weather data...";
  
      mainModal.classList.add("visible");
  
      fetchWeather(event.location)
        .then((weather) => {
          modalTitle.innerText = event.title;
          modalTime.innerText = `Time: ${event.time}`;
          modalCategory.innerText = `Category: ${event.category}`;
          modalLocation.innerText = `Location: ${event.location.charAt(0).toUpperCase() + event.location.slice(1).toLowerCase()}`;
          modalWeather.innerText = `Weather: ${weather.description}, ${weather.temperature}°C`;
          modalNotes.innerText = `Notes: ${event.notes}`;
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          modalWeather.innerText = "Unable to fetch weather data.";
        });
    };
  
    // Add new event to the itinerary
    const addItineraryEvent = (event) => {
      const events = loadItinerary();
      events.push({ ...event, id: Date.now() });
      saveItinerary(events);
      renderItinerary();
    };
  
    // Delete an event from the itinerary
    const deleteItineraryEvent = (id) => {
      let events = loadItinerary();
      events = events.filter((event) => event.id !== id);
      saveItinerary(events);
      renderItinerary();
    };
  
    // Edit an event in the itinerary
    const editItineraryEvent = (id, event) => {
      const titleInput = document.getElementById("trip-name");
      const categoryInput = document.getElementById("trip-category");
      const dateInput = document.getElementById("trip-date");
      const startTimeInput = document.getElementById("trip-start-time");
      const endTimeInput = document.getElementById("trip-end-time");
      const locationInput = document.getElementById("trip-location");
      const notesInput = document.getElementById("trip-notes");
  
      titleInput.value = event.title;
      categoryInput.value = event.category;
      dateInput.value = event.date;
      startTimeInput.value = event.time.split(" - ")[0];
      endTimeInput.value = event.time.split(" - ")[1];
      locationInput.value = event.location.charAt(0).toUpperCase() + event.location.slice(1).toLowerCase();
      notesInput.value = event.notes;
  
      addTripModal.classList.add("visible");
      editIndex = id;
    };
  
    addTripForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("trip-name").value;
      const category = document.getElementById("trip-category").value;
      const date = document.getElementById("trip-date").value;
      const startTime = document.getElementById("trip-start-time").value;
      const endTime = document.getElementById("trip-end-time").value;
      const location = document.getElementById("trip-location").value;
      const notes = document.getElementById("trip-notes").value;
  
      const newEvent = {
        title,
        category,
        date,
        time: `${startTime} - ${endTime}`,
        location,
        notes,
      };
  
      let events = loadItinerary();
  
      if (editIndex !== null) {
        const eventIndex = events.findIndex((e) => e.id === editIndex);
        events[eventIndex] = { ...newEvent, id: editIndex };
        editIndex = null;
      } else {
        events.push({ ...newEvent, id: Date.now() });
      }
  
      saveItinerary(events);
      renderItinerary();
      addTripForm.reset();
      addTripModal.classList.remove("visible");
    });
  
    addTripCloseBtn.addEventListener("click", () => {
      addTripModal.classList.remove("visible");
      editIndex = null;
    });
  
    addTripBtn.addEventListener("click", () => {
      addTripForm.reset();
      addTripModal.classList.add("visible");
      editIndex = null;
    });
  
    mainCloseBtn.addEventListener("click", () => {
      mainModal.classList.remove("visible");
    });
  
    tripToParisItem.addEventListener("click", () => {
      renderItinerary();
      updateTripHeaderDates();
    });

    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", renderItinerary);
    });

    updateTripHeaderDates(); // Update header with new date range
  
    renderItinerary();
  });
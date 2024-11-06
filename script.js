// Movie list array
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

// DOM elements
const selectMovie = document.getElementById("selectMovie");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");
const seats = document.querySelectorAll("#seatCont .seat");

// Variables to track selected seats and total price
let selectedSeats = [];
let totalPrice = 0;

// Function to initialize the movie dropdown
function initializeMovieDropdown() {
  moviesList.forEach(movie => {
      const option = document.createElement("option");
      option.textContent = movie.movieName;
      option.value = movie.price;
      selectMovie.appendChild(option);
  });
}

// Event listener for movie selection
selectMovie.addEventListener("change", function () {
  const selectedMoviePrice = this.value;
  const selectedMovieName = this.options[this.selectedIndex].text;
  
  movieNameElement.textContent = selectedMovieName;
  moviePriceElement.textContent = `$ ${selectedMoviePrice}`;
  updateTotalPrice();
});

// Function to update the total price based on selected seats
function updateTotalPrice() {
  const moviePrice = parseInt(selectMovie.value);
  totalPrice = selectedSeats.length * moviePrice;
  totalPriceElement.textContent = `$ ${totalPrice}`;
}

// Event listener for seat selection
seats.forEach(seat => {
  seat.addEventListener("click", function () {
      if (!seat.classList.contains("occupied")) {
          seat.classList.toggle("selected");

          // Manage selected seats array
          const seatIndex = selectedSeats.indexOf(seat);
          if (seatIndex > -1) {
              selectedSeats.splice(seatIndex, 1); // Deselect seat
          } else {
              selectedSeats.push(seat); // Select seat
          }
          updateSelectedSeatsDisplay();
          updateTotalPrice();
      }
  });
});

// Function to update the selected seats display
function updateSelectedSeatsDisplay() {
  if (selectedSeats.length === 0) {
      selectedSeatsHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
  } else {
      selectedSeatsHolder.innerHTML = selectedSeats.map(seat => `Seat ${Array.from(seats).indexOf(seat) + 1}`).join(", ");
  }
}

// Event listener for the continue button
proceedBtn.addEventListener("click", function () {
  if (selectedSeats.length === 0) {
      alert("Oops no seat Selected.");
  } else {
      alert("Yayy! Your Seats have been booked.");
      selectedSeats.forEach(seat => {
          seat.classList.remove("selected");
          seat.classList.add("occupied");
      });
      resetBooking();
  }
});

// Event listener for the cancel button
cancelBtn.addEventListener("click", function () {
  selectedSeats.forEach(seat => {
      seat.classList.remove("selected");
  });
  resetBooking();
});

// Function to reset booking
function resetBooking() {
  selectedSeats = [];
  totalPrice = 0;
  totalPriceElement.textContent = "$ 0";
  updateSelectedSeatsDisplay();
}

// Initialize dropdown on page load
initializeMovieDropdown();

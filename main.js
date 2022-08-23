const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');

populateUI();

let ticket = +movie.value;
// set movie data
function setMovieData(movie,price){
     localStorage.setItem('movieIndex', movie);
     localStorage.setItem('moviePrice', price);

}
//update total and count
function updateSelectedCount(){
     const selectedSeats = document.querySelectorAll('.row .seat.selected');

     const seatIndex = [...selectedSeats].map(item => [...seat].indexOf(item));
    
     localStorage.setItem('selectedSeats',JSON.stringify(seatIndex))
     
     const seatCount = selectedSeats.length;
      count.innerHTML = seatCount;
      total.innerHTML = seatCount * ticket;

}
//get data from local storage and populate ui
function populateUI(){
     const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
     if(selectedSeats !== null && selectedSeats.length > 0){
          seat.forEach((item, index) => {
       if(selectedSeats.indexOf(index) > -1){
          item.classList.add('selected');
       }
          });
     }

     const movieIndex = localStorage.getItem('movieIndex');
     if (movieIndex !== null){
          movie.selectedIndex = movieIndex;
     }
}
// event listener for movie
movie.addEventListener('change', (e) => {
     ticket = +e.target.value;
     setMovieData(e.target.selectedIndex, e.target.value);
     updateSelectedCount();
})


// event listener for seat
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
     e.target.classList.toggle('selected');

     updateSelectedCount();
  }
   
}) 

updateSelectedCount();
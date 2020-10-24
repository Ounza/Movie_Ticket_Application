const container = document.querySelector('.container');
const seats = document.getElementsByClassName('pending');
const movie = document.querySelectorAll('.container .row');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
populateUI();
//SSave movie data to local storage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update Selected Count
function updateSelectedCount(){
    const selectedSeats = document.getElementsByClassName('selected');
    const selectedSeatsCount = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    count.innerText = selectedSeatsCount;
    total.innerText= selectedSeatsCount * ticketPrice;
}

//Populate the UI
function populateUI(){
    const seatsSelected=JSON.parse(localStorage.getItem('selectedSeats'));
    if (seatsSelected !== null && seatsSelected.length > 0) {
        [...seats].forEach(function(seat, index){
        if (seatsSelected.indexOf(index) > -1)
        seat.classList.add('selected');
        })
    } 
}
const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
if(selectedMovieIndex!== null){
    movieSelect.selectedIndex= selectedMovieIndex;
}

//Movie Select Event listener
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//Add event listener
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})
updateSelectedCount();
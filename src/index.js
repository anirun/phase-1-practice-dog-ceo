// API URIs
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"

// DOM nodes for event listeners
let dogBreedUL = document.getElementById('dog-breeds')
const breedDropdown = document.getElementById('breed-dropdown')
const dogImgContainer = document.getElementById('dog-image-container')

// allBreeds array declaration to make it easier to access
let allBreeds = []

// fetch image URLs and append to dogImgContainer
fetch(imgUrl)
    .then(response => response.json())
    .then(dogImgData => {
        dogImgData.message.forEach(imgUrl => {
            const imgElement = document.createElement("img")
            imgElement.src = imgUrl
            dogImgContainer.appendChild(imgElement)
        })
    })

// fetch breed names and append to ul
fetch(breedUrl)
    .then(response => response.json())
    .then(breedData => {
        allBreeds = Object.keys(breedData.message)
        allBreeds.forEach((dogBreed) => appendToList(dogBreed))
    })


// event listener to change li text color upon click
dogBreedUL.addEventListener("click", function(e) {
    if (e.target.className === "unselected") {
        e.target.className = "selected"
        e.target.style.color = "pink"
    } else {
        e.target.className = "unselected"
        e.target.style.color = "black"
    }
})

// event listener for dropdown
breedDropdown.addEventListener("change", e => {
    // grab input from form
    const letter = e.target.value
    // filter allBreeds
    const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(letter))
    dogBreedUL.innerHTML = ''
    filteredBreeds.map(breed => appendToList(breed))
    })

// function to append dog breeds to dogBreedUL    
function appendToList(item) {
    const li = document.createElement("li")
    li.innerText = item
    dogBreedUL.appendChild(li)
}
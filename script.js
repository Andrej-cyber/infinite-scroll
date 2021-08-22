const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true // NEW LINE ****

// Unsplash API
let initialCount  = 5;
const apiKey = 'L29RCATaGPpDpZGLVOdwNaYt8PCkXi-2aed2kzvhvjw';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&
count=${initialCount}`;

// NEW Block****
function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}
// NEW Block*****

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Craete <a> to link to Unsplash 
    const item = document.createElement('a');
  setAttributes(item, {
     href: photo.links.html,
     target: '_blank',
    });
    // Craete <img> for photo
    const img = document.createElement('img');
  setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
  });

  //Event Listener, check when each is finished loading
  img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) { // NEW LINE ****
      updateAPIURLWithNewCount(30) // NEW LINE ****
      isInitialLoad = false // NEW LINE ****
    } // NEW LINE ****
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
   getPhotos();
   console.log('load more');
   ready = false;
  }
});

// On Load
getPhotos();
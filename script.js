const accessKey = "MKHRrMh5fNCfdlJj6Mv7ydgE48GaJ1BQFtXcsPw_9O0";

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');
const noImageFound = document.createElement('p');

noImageFound.id = 'no-image-found';
noImageFound.style.display = 'none';
noImageFound.style.color = 'red';
noImageFound.style.marginTop = '10px';
noImageFound.style.fontWeight = 'bold';
noImageFound.textContent = 'No Image Found';

searchForm.appendChild(noImageFound);

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value.trim();
  const url =  `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (keyword === "") {
    searchResult.innerHTML = "";           
    noImageFound.style.display = 'none';    
    showMoreBtn.style.display = 'none';     
    alert("Please enter a keyword to search for images."); 
    return; 
    // Exit the function to avoid making an API call
  }

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  
const results = data.results;

if (results.length === 0 && page === 1) {
  noImageFound.style.display = 'block';
  showMoreBtn.style.display = 'none';
} else {
  results.map((result) => {
    const image = document.createElement('img');
    image.src = result.urls.small;

    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;

    imageLink.target = '_blank';

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
}
  if (results.length > 0) {
    showMoreBtn.style.display = 'block';
  }
  // console.log('data: ' ,data);
}
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener('click', () => {
  page++;
  searchImages();
});


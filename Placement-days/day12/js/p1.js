const container = document.getElementById('container');

const allItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

let currentIndex = 0;
const itemsPerPage = 10;
let loading = false;

function loadItems() {
  if (currentIndex >= allItems.length) return;

  const fragment = document.createDocumentFragment();
  const itemsToLoad = allItems.slice(currentIndex, currentIndex + itemsPerPage);

  itemsToLoad.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.description}</p>
    `;
    fragment.appendChild(itemDiv);
  });

  container.appendChild(fragment);
  currentIndex += itemsPerPage;
}

function showLoadingIndicator() {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'loading';
  loadingDiv.textContent = 'Loading...';
  container.appendChild(loadingDiv);
}

function hideLoadingIndicator() {
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    container.removeChild(loadingDiv);
  }
}

function handleScroll() {
  if (loading || currentIndex >= allItems.length) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop - clientHeight <= 100) {
    loading = true;
    showLoadingIndicator();

    setTimeout(() => {
      loadItems();
      hideLoadingIndicator();
      loading = false;
    }, 1000); 
  }
}

loadItems();

window.addEventListener('scroll', handleScroll);
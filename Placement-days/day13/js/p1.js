function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function apiCall(query) {
  console.log('API called with:', query);
}

const debouncedApi = debounce(apiCall, 500);

debouncedApi('a');
debouncedApi('ab');
debouncedApi('abc');
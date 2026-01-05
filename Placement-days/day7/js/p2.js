const API_URL = "https://jsonplaceholder.typicode.com/posts/1";

async function fetchWithRetry(url, options = {}, maxAttempts = 3, delay = 500) {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw new Error(
          `Request failed after ${maxAttempts} attempts: ${error.message}`
        );
      }

      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      attempt++;
    }
  }
}

fetchWithRetry(API_URL)
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((err) => {
    console.error("Final error:", err.message);
  });

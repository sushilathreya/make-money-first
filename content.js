// Inject CSS file into the page
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = chrome.runtime.getURL('styles.css');
document.head.appendChild(link);

let scrollCounter = 0; // Count the number of scroll events
const SCROLL_LIMIT = 200; // Customize the scroll limit as needed

// Create and inject the modal
function createModal() {
  const modal = document.createElement('div');
  modal.id = 'scrollModal';

  modal.innerHTML = `
    <div>
      <button id="closeModal">&times;</button>
      <img id="headerImage" alt="Motivational Image">
      <button id="ctaButton">Make money first loser</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Dynamically set the image source
  const imageElement = document.getElementById('headerImage');
  imageElement.src = chrome.runtime.getURL('dopamine.png');

  // Close modal
  document.getElementById('closeModal').addEventListener('click', () => {
    modal.remove();
    scrollCounter = 0; // Reset the counter
  });

  // CTA button action
  document.getElementById('ctaButton').addEventListener('click', () => {
    window.location.href = "https://docs.new/";
    modal.remove();
    scrollCounter = 0; // Reset the counter
  });
}

const supportedUrls = [
    "https://x.com/home",
    "https://www.linkedin.com/feed/",
    "https://www.instagram.com/"
  ];

// Event listener for scrolling
if (supportedUrls.some((url) => window.location.href.startsWith(url))){
  window.addEventListener('scroll', () => {
    scrollCounter++;

    if (scrollCounter >= SCROLL_LIMIT) {
      if (!document.getElementById('scrollModal')) {
        createModal();
      }
    }
  });
}

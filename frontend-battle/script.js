const flowerGrid = document.getElementById('flower-grid');
const folder = document.body.dataset.folder;  // e.g., 'Roses'
const bouquet = JSON.parse(localStorage.getItem("bouquet")) || {};

// Helper function to check if image loads successfully
function loadImageWithFallback(basePath, index, onLoad, onError) {
  const pngSrc = `${basePath}/${index}.png`;
  const jpgSrc = `${basePath}/${index}.jpg`;

  const img = new Image();
  img.onload = () => onLoad(pngSrc);
  img.onerror = () => {
    // Try jpg if png fails
    const fallbackImg = new Image();
    fallbackImg.onload = () => onLoad(jpgSrc);
    fallbackImg.onerror = () => onError();
    fallbackImg.src = jpgSrc;
  };
  img.src = pngSrc;
}

for (let i = 1; i <= 5; i++) {
  loadImageWithFallback(`assets/${folder}`, i,
    (src) => {
      const card = document.createElement('div');
      card.className = 'flower-card';

      const img = document.createElement('img');
      img.src = src;

      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.value = bouquet[src] || 0;

      input.oninput = () => {
        const val = parseInt(input.value);
        if (val > 0) {
          bouquet[src] = val;
          card.classList.add('selected');
        } else {
          delete bouquet[src];
          card.classList.remove('selected');
        }
        localStorage.setItem("bouquet", JSON.stringify(bouquet));
      };

      card.appendChild(img);
      card.appendChild(input);
      flowerGrid.appendChild(card);
    },
    () => {
      // Image doesn't exist, do nothing or log if needed
      console.warn(`Image ${folder}/${i} not found as png or jpg`);
    }
  );
}

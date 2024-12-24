// Handle tab switching and filtering
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        
        const category = tab.textContent.trim().split(' ')[0].toLowerCase();
        filterResults(category);
    });
});

// Filter results based on the selected tab
function filterResults(category) {
    const resultsGrid = document.getElementById('results-grid');
    const cards = resultsGrid.querySelectorAll('.card');

    cards.forEach(card => {
        const cardCategory = card.querySelector('.card-meta').textContent.toLowerCase();
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle date input validation
const dayInput = document.querySelectorAll('.date-input')[0];
const monthSelect = document.getElementById('monthSelect');

dayInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    if (value > 31) e.target.value = 31;
    if (value < 1) e.target.value = 1;
});

// Handle search form submission
async function handleSearch(event) {
    event.preventDefault();

    const day = dayInput.value;
    const month = monthSelect.value; // Get the numeric value from the dropdown
    const searchButton = document.getElementById('searchButton');

    // Show spinner
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    searchButton.appendChild(spinner);

    try {
        const response = await fetch('http://localhost:3000/api/get-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ month, day })
        });

        const data = await response.json();
        console.log('API Response:', data);
        renderResults(data.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    } finally {
        // Remove spinner
        searchButton.removeChild(spinner);
    }
}

// Render results in the results grid
function renderResults(data) {
    const resultsGrid = document.getElementById('results-grid');
    const resultsSection = document.getElementById('results'); // Get the results section
    resultsGrid.innerHTML = ''; // Clear previous results

    const categories = ['Events', 'Births', 'Deaths'];

    categories.forEach(category => {
        data[category].forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardContent = `
                <div class="main-card">
                    <img src="/assets/placeholder.webp" alt="${item.text}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${item.text}</h3>
                        <p class="card-meta">${category}</p><br>
                        <p class="card-source">Source: ${item.links[0][0]}</p>
                    </div>
                </div>
            `;

            card.innerHTML = cardContent;
            resultsGrid.appendChild(card);

            // Fetch and update the image asynchronously
            fetchImageUrl(item.links[0][2]).then(imageUrl => {
                const imgElement = card.querySelector('.card-image');
                if (imageUrl) {
                    imgElement.src = imageUrl;
                }
            }).catch(error => {
                console.error('Error fetching image:', error);
            });
        });
    });

    updateTabCounts(data);

    // Make the results section visible
    resultsSection.classList.add('visible');
}

// Function to fetch an image URL based on the article name
async function fetchImageUrl(articleName) {
    try {
        const response = await fetch(`http://localhost:3000/api/get-image?articleName=${encodeURIComponent(articleName)}`);
        const data = await response.json();
        return data.imageUrl || null; // Return null if no image found
    } catch (error) {
        console.error('Error fetching image:', error);
        return null; // Return null on error
    }
}

// Update tab counts
function updateTabCounts(data) {
    const categories = ['All', 'Events', 'Births', 'Deaths'];
    categories.forEach(category => {
        const count = category === 'All' ? 
            (data.Events.length || 0) + (data.Births.length || 0) + (data.Deaths.length || 0) : 
            (data[category].length || 0);
        const tabElement = document.querySelector(`.tab.${category.toLowerCase()}`);
        if (tabElement) {
            tabElement.querySelector('.count').textContent = count;
        }
    });
}
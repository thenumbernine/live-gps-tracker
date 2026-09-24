let map;
let marker;

// Replace with your actual Render application URL after you deploy it
const RENDER_API_URL = "https://onrender.com"; 

function initMap() {
    // 1. Initialize the map layer centered globally
    map = L.map('map').setView([0, 0], 2);

    // 2. Load the OpenStreetMap background graphics
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 3. Place an initial marker on the map
    marker = L.marker([0, 0]).addTo(map);

    // 4. Run the first execution and set a 10-second routine loop
    fetchLocation();
    setInterval(fetchLocation, 10000); 
}

async function fetchLocation() {
    try {
        const response = await fetch(RENDER_API_URL);
        const data = await response.json();
        
        if (data.lat && data.lng) {
            const pos = [data.lat, data.lng];
            
            // Move marker seamlessly and focus the camera frame
            marker.setLatLng(pos);
            map.panTo(pos);
        }
    } catch (err) {
        console.error("Error communicating with Render API:", err);
    }
}

// Ensure layout maps don't initialize until the window finishes painting
window.onload = initMap;

let map, marker;

// Get these from your Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = "https://supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; 
const DEVICE_ID = "truck_01"; // The device you want to map

function initMap() {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    marker = L.marker([0, 0]).addTo(map);

    fetchLocation();
    setInterval(fetchLocation, 10000); // Poll Supabase every 10 seconds
}

async function fetchLocation() {
    try {
        // Query Supabase directly using its built-in REST API!
        const response = await fetch(`${SUPABASE_URL}/rest/v1/locations?device_id=eq.${DEVICE_ID}&select=lat,lng`, {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        const data = await response.json();

        if (data && data.length > 0) {
            const pos = [data[0].lat, data[0].lng];
            marker.setLatLng(pos);
            map.panTo(pos);
        }
    } catch (err) {
        console.error("Error pulling data directly from Supabase:", err);
    }
}

window.onload = initMap;
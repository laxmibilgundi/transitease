
/* =========================================================
   TRANSITEASE
   Local Public Transportation Information
   and Route Assistance System
   ========================================================= */


/* =========================================================
   1. CITY CONFIGURATION
   ========================================================= */

// Bengaluru city center
const bengaluru = [12.9716, 77.5946];


/* =========================================================
   2. INITIALIZE MAP
   ========================================================= */

const map = L.map("map").setView(bengaluru, 12);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
}).addTo(map);

// City center marker
L.marker(bengaluru)
    .addTo(map)
    .bindPopup("<b>Bengaluru City Center</b>");

// Map layers
const transportLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);


/* =========================================================
   3. LOCATION SEARCH
   ========================================================= */

async function getLocation(place) {

    const query = encodeURIComponent(place + ", India");

    const url =
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${query}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location search service unavailable");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Location not found");
    }

    // Prefer Karnataka results when present
    const result = data.find(item =>
        item.display_name.toLowerCase().includes("karnataka")
    ) || data[0];

    return {
        name: result.display_name,
        lat: Number(result.lat),
        lon: Number(result.lon)
    };
}


/* =========================================================
   4. ROUTE SEARCH
   ========================================================= */

async function findRoute() {

    const source = document.getElementById("source").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const result = document.getElementById("route-result");

    // Check input
    if (source === "" || destination === "") {

        result.innerHTML = `
            <div class="result-card">
                <h3>⚠️ Missing Information</h3>
                <p>Please enter both starting location and destination.</p>
            </div>
        `;

        return;
    }

    // Loading message
    result.innerHTML = `
        <div class="result-card">
            <h3>🔍 Searching Locations...</h3>
            <p>Please wait while we find your locations.</p>
        </div>
    `;

    try {

        // Search locations
        const start = await getLocation(source);
        const end = await getLocation(destination);

        // Clear previous markers
        routeLayer.clearLayers();

        // Source marker
        L.marker([start.lat, start.lon])
            .addTo(routeLayer)
            .bindPopup(
                "<b>Starting Location</b><br>" +
                escapeHTML(start.name)
            );

        // Destination marker
        L.marker([end.lat, end.lon])
            .addTo(routeLayer)
            .bindPopup(
                "<b>Destination</b><br>" +
                escapeHTML(end.name)
            );

        // Straight-line visual connector
        const line = L.polyline(
            [
                [start.lat, start.lon],
                [end.lat, end.lon]
            ],
            {
                color: "#16a085",
                weight: 4,
                dashArray: "8, 8"
            }
        ).addTo(routeLayer);

        // Zoom to route
        map.fitBounds(line.getBounds(), {
            padding: [50, 50]
        });

        // Straight-line distance in kilometers
        const distance = map.distance(
            [start.lat, start.lon],
            [end.lat, end.lon]
        ) / 1000;

        // Public transport directions
        const transitLink =
            "https://www.google.com/maps/dir/?api=1" +
            "&origin=" + encodeURIComponent(start.name) +
            "&destination=" + encodeURIComponent(end.name) +
            "&travelmode=transit";

        // Show results
        result.innerHTML = `
            <div class="result-card">

                <h3>🚌 Journey Details</h3>

                <p>
                    <strong>From:</strong>
                    ${escapeHTML(start.name)}
                </p>

                <p>
                    <strong>To:</strong>
                    ${escapeHTML(end.name)}
                </p>

                <p>
                    <strong>Straight-line distance:</strong>
                    ${distance.toFixed(2)} km
                </p>

                <div class="route-note">
                    The map shows your starting point and destination.
                    The dotted line is a visual connector, not an actual
                    public transport route.
                </div>

                <a class="primary-btn"
                   href="${transitLink}"
                   target="_blank"
                   rel="noopener noreferrer">
                   View Public Transport Directions
                </a>

            </div>
        `;

    } catch (error) {

        // Error message
        result.innerHTML = `
            <div class="result-card">

                <h3>❌ Location Error</h3>

                <p>We couldn't find one of the locations.</p>

                <p>Please try entering a more specific location.</p>

            </div>
        `;

        console.error("Route search error:", error);
    }
}


/* =========================================================
   5. HTML SAFETY
   ========================================================= */

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, function(character) {

        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}


/* =========================================================
   6. DEMO TRANSPORT LOCATIONS
   ========================================================= */

// Sample Bengaluru locations used when live data is unavailable.
// These are demonstration locations, not verified live records.

const demoLocations = {

    bus: [
        {
            name: "Majestic Bus Station",
            lat: 12.9767,
            lon: 77.5713
        },
        {
            name: "Shivajinagar Bus Station",
            lat: 12.9858,
            lon: 77.6031
        },
        {
            name: "Shantinagar Bus Station",
            lat: 12.9581,
            lon: 77.6010
        },
        {
            name: "Banashankari Bus Station",
            lat: 12.9250,
            lon: 77.5651
        },
        {
            name: "KR Market Bus Stop",
            lat: 12.9634,
            lon: 77.5765
        }
    ],

    metro: [
        {
            name: "Majestic Metro Station",
            lat: 12.9766,
            lon: 77.5727
        },
        {
            name: "MG Road Metro Station",
            lat: 12.9756,
            lon: 77.6068
        },
        {
            name: "Cubbon Park Metro Station",
            lat: 12.9817,
            lon: 77.6053
        },
        {
            name: "Indiranagar Metro Station",
            lat: 12.9784,
            lon: 77.6408
        },
        {
            name: "Yeshwanthpur Metro Station",
            lat: 13.0285,
            lon: 77.5400
        }
    ],

    train: [
        {
            name: "KSR Bengaluru City Railway Station",
            lat: 12.9774,
            lon: 77.5690
        },
        {
            name: "Yeshwanthpur Railway Station",
            lat: 13.0235,
            lon: 77.5507
        },
        {
            name: "Bengaluru Cantonment Railway Station",
            lat: 12.9935,
            lon: 77.5980
        },
        {
            name: "Bengaluru East Railway Station",
            lat: 12.9902,
            lon: 77.6186
        },
        {
            name: "Kengeri Railway Station",
            lat: 12.9177,
            lon: 77.4838
        }
    ]

};


/* =========================================================
   7. TRANSPORT TITLES
   ========================================================= */

const transportTitles = {
    bus: "Bus Stops",
    metro: "Metro Stations",
    train: "Railway Stations"
};


/* =========================================================
   8. NEARBY TRANSPORT SEARCH
   ========================================================= */

async function showTransport(type) {

    const result = document.getElementById("transport-result");

    // Loading screen
    result.innerHTML = `
        <div class="result-card">
            <h3>🔍 Finding Nearby Transport...</h3>
            <p>Please wait while we load transport locations.</p>
        </div>
    `;

    const lat = bengaluru[0];
    const lon = bengaluru[1];

    let query = "";

    // Bus stop query
    if (type === "bus") {

        query = `
        [out:json][timeout:20];
        (
          node["highway"="bus_stop"](around:5000,${lat},${lon});
          node["amenity"="bus_station"](around:5000,${lat},${lon});
          way["amenity"="bus_station"](around:5000,${lat},${lon});
        );
        out center;
        `;

    }

    // Metro query
    else if (type === "metro") {

        query = `
        [out:json][timeout:20];
        (
          node["railway"="station"]["station"="subway"](around:10000,${lat},${lon});
          node["railway"="station"]["subway"="yes"](around:10000,${lat},${lon});
          node["railway"="subway_entrance"](around:10000,${lat},${lon});
        );
        out center;
        `;

    }

    // Railway query
    else if (type === "train") {

        query = `
        [out:json][timeout:20];
        (
          node["railway"="station"](around:10000,${lat},${lon});
          way["railway"="station"](around:10000,${lat},${lon});
        );
        out center;
        `;

    } else {

        result.innerHTML = `
            <div class="result-card">
                <h3>Invalid Transport Type</h3>
            </div>
        `;

        return;
    }


    // Overpass servers
    const servers = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.nchc.org.tw/api/interpreter"
    ];

    let data = null;
    let lastError = null;


    // Try servers one after another
    for (const server of servers) {

        let controller;
        let timeoutId;

        try {

            controller = new AbortController();

            timeoutId = setTimeout(() => {
                controller.abort();
            }, 12000);

            const response = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + encodeURIComponent(query),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error("Server returned " + response.status);
            }

            data = await response.json();

            // Successful request
            break;

        } catch (error) {

            lastError = error;
            console.warn("Transport API failed:", server, error);

        } finally {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

        }

    }


    // ============================================
    // 9. USE LIVE DATA OR DEMO DATA
    // ============================================

    let foundPlaces = [];
    let isDemo = false;

    if (data && data.elements && data.elements.length > 0) {

        foundPlaces = data.elements
            .map(place => {

                const placeLat = place.lat ?? place.center?.lat;
                const placeLon = place.lon ?? place.center?.lon;

                const name =
                    place.tags?.name ||
                    place.tags?.["name:en"] ||
                    place.tags?.ref ||
                    "Unnamed Transport Location";

                return {
                    name: name,
                    lat: placeLat,
                    lon: placeLon
                };

            })
            .filter(place =>
                place.lat != null && place.lon != null
            );

    }

    // If live data failed or returned no results
    if (foundPlaces.length === 0) {

        foundPlaces = demoLocations[type];
        isDemo = true;

    }


    // ============================================
    // 10. CLEAR OLD MARKERS
    // ============================================

    transportLayer.clearLayers();


    // ============================================
    // 11. ADD MARKERS TO MAP
    // ============================================

    foundPlaces.forEach(place => {

        L.marker([place.lat, place.lon])
            .addTo(transportLayer)
            .bindPopup(
                "<b>" + escapeHTML(place.name) + "</b>"
            );

    });


    // ============================================
    // 12. ZOOM MAP
    // ============================================

    if (foundPlaces.length > 0) {

        const bounds = L.latLngBounds(
            foundPlaces.map(place => [place.lat, place.lon])
        );

        map.fitBounds(bounds, {
            padding: [40, 40]
        });

    }


    // ============================================
    // 13. DISPLAY RESULTS
    // ============================================

    const title = transportTitles[type];

    result.innerHTML = `
        <div class="result-card">

            <h3>📍 ${title}</h3>

            <p>
                <strong>${foundPlaces.length}</strong>
                locations displayed on the map.
            </p>

            <div class="route-note">
                ${
                    isDemo
                    ? "Demo locations are displayed because live transport data was unavailable."
                    : "Locations retrieved from OpenStreetMap data."
                }
            </div>

            <ul>
                ${foundPlaces.map(place =>
                    `<li>${escapeHTML(place.name)}</li>`
                ).join("")}
            </ul>

        </div>
    `;

    if (isDemo) {
        console.log("Demo transport locations displayed.");
    } else {
        console.log("Live transport locations displayed.");
    }

}


/* =========================================================
   14. MAP RESIZE
   ========================================================= */

window.addEventListener("load", function() {

    setTimeout(function() {
        map.invalidateSize();
    }, 500);

});

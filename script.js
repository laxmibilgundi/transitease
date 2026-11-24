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

// User's current location (set when they click "Use my current location")
let userLocation = null;


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
const userLayer = L.layerGroup().addTo(map);


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

// Sample Bengaluru locations used only as a last resort when live
// data cannot be loaded. These are demonstration locations, not
// verified live records.

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
   8. USE MY CURRENT LOCATION
   ========================================================= */

function locateMe() {

    const result = document.getElementById("transport-result");

    // Browser support check
    if (!navigator.geolocation) {

        result.innerHTML = `
            <div class="result-card">
                <h3>❌ Not Supported</h3>
                <p>Your browser does not support location access.</p>
            </div>
        `;

        return;
    }

    // Loading message
    result.innerHTML = `
        <div class="result-card">
            <h3>📡 Finding Your Location...</h3>
            <p>Please allow location access when your browser asks.</p>
        </div>
    `;

    navigator.geolocation.getCurrentPosition(

        // Success
        function (position) {

            userLocation = [
                position.coords.latitude,
                position.coords.longitude
            ];

            userLayer.clearLayers();

            L.circleMarker(userLocation, {
                radius: 9,
                color: "#176b48",
                fillColor: "#176b48",
                fillOpacity: 0.9
            })
                .addTo(userLayer)
                .bindPopup("<b>You are here</b>")
                .openPopup();

            map.setView(userLocation, 15);

            result.innerHTML = `
                <div class="result-card">
                    <h3>✅ Location Found</h3>
                    <p>
                        Now tap Bus Stops, Metro Stations or Railway Stations
                        to see the ones closest to you.
                    </p>
                </div>
            `;
        },

        // Error
        function () {

            result.innerHTML = `
                <div class="result-card">
                    <h3>❌ Location Blocked</h3>
                    <p>
                        Please allow location access in your browser
                        and try again.
                    </p>
                </div>
            `;
        },

        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
}


/* =========================================================
   9. NEARBY TRANSPORT SEARCH (Overpass / OpenStreetMap)
   ========================================================= */

const OVERPASS_SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter"
];

// Small radius first (fast), widen only if too few results
const SEARCH_RADII = {
    bus:   [1000, 2500, 5000],
    metro: [3000, 8000, 15000],
    train: [5000, 12000, 25000]
};

function buildQuery(type, radius, lat, lon) {

    const around = `(around:${radius},${lat},${lon})`;

    const filters = {
        bus: [
            `["highway"="bus_stop"]`,
            `["amenity"="bus_station"]`
        ],
        metro: [
            `["railway"="station"]["station"="subway"]`,
            `["railway"="station"]["network"~"Namma|Bangalore Metro|Bengaluru Metro",i]`,
            `["public_transport"="station"]["subway"="yes"]`
        ],
        train: [
            `["railway"="station"]["station"!="subway"]["subway"!="yes"]["network"!~"Metro",i]`,
            `["railway"="halt"]`
        ]
    }[type];

    return `[out:json][timeout:25];(` +
        filters.map(f => `nwr${f}${around};`).join("") +
        `);out center 200;`;
}

// Ask all mirrors at the same time and use whichever answers first
async function fetchOverpass(query, timeoutMs = 25000) {

    const controllers = OVERPASS_SERVERS.map(() => new AbortController());

    const timer = setTimeout(
        () => controllers.forEach(c => c.abort()),
        timeoutMs
    );

    try {

        return await Promise.any(
            OVERPASS_SERVERS.map(async (server, i) => {

                const response = await fetch(server, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + encodeURIComponent(query),
                    signal: controllers[i].signal
                });

                if (!response.ok) {
                    throw new Error(server + " returned " + response.status);
                }

                const json = await response.json();

                if (!json || !Array.isArray(json.elements)) {
                    throw new Error(server + " returned invalid data");
                }

                // Overloaded servers can reply 200 with an empty list + remark
                if (json.elements.length === 0 && json.remark) {
                    throw new Error(server + ": " + json.remark);
                }

                // Winner found: cancel the other requests
                controllers.forEach((c, j) => {
                    if (j !== i) c.abort();
                });

                return json;
            })
        );

    } catch (error) {

        console.warn("All Overpass servers failed:", error.errors || error);
        throw error;

    } finally {

        clearTimeout(timer);

    }
}

function parsePlaces(data, center) {

    const byName = new Map();

    data.elements.forEach(place => {

        const lat = place.lat ?? place.center?.lat;
        const lon = place.lon ?? place.center?.lon;
        const name = place.tags?.name || place.tags?.["name:en"];

        if (lat == null || lon == null || !name) return;

        const distance = Math.round(map.distance(center, [lat, lon]));
        const key = name.trim().toLowerCase();

        // Many stops share a name (both sides of a road): keep the closest
        if (!byName.has(key) || byName.get(key).distance > distance) {
            byName.set(key, { name: name.trim(), lat, lon, distance });
        }
    });

    return [...byName.values()].sort((a, b) => a.distance - b.distance);
}

async function getNearbyPlaces(type, lat, lon) {

    // Cache successful results for 10 minutes
    const cacheKey = `te:${type}:${lat.toFixed(3)}:${lon.toFixed(3)}`;

    try {
        const cached = JSON.parse(sessionStorage.getItem(cacheKey));
        if (cached && Date.now() - cached.time < 600000) {
            return cached.value;
        }
    } catch (e) {
        // ignore cache problems
    }

    const radii = SEARCH_RADII[type];
    let places = [];
    let radiusUsed = radii[0];

    for (const radius of radii) {

        const data = await fetchOverpass(buildQuery(type, radius, lat, lon));

        places = parsePlaces(data, [lat, lon]);
        radiusUsed = radius;

        if (places.length >= 3) break;
    }

    const value = { places: places.slice(0, 15), radius: radiusUsed };

    if (value.places.length > 0) {
        try {
            sessionStorage.setItem(
                cacheKey,
                JSON.stringify({ time: Date.now(), value })
            );
        } catch (e) {
            // ignore
        }
    }

    return value;
}

function formatDistance(meters) {
    return meters < 1000
        ? meters + " m"
        : (meters / 1000).toFixed(1) + " km";
}

async function showTransport(type) {

    const result = document.getElementById("transport-result");

    if (!transportTitles[type]) {

        result.innerHTML = `
            <div class="result-card">
                <h3>Invalid Transport Type</h3>
            </div>
        `;

        return;
    }

    // Loading screen
    result.innerHTML = `
        <div class="result-card">
            <h3>🔍 Finding Nearby Transport...</h3>
            <p>Searching OpenStreetMap data. This can take a few seconds.</p>
        </div>
    `;

    // Use the user's location if available, otherwise city center
    const center = userLocation || bengaluru;

    let places = [];
    let radiusUsed = null;
    let isDemo = false;

    try {

        const found = await getNearbyPlaces(type, center[0], center[1]);
        places = found.places;
        radiusUsed = found.radius;

    } catch (error) {

        console.warn("Live transport lookup failed:", error);

    }

    // Last resort only: demo data
    if (places.length === 0) {

        isDemo = true;

        places = demoLocations[type]
            .map(p => ({
                ...p,
                distance: Math.round(map.distance(center, [p.lat, p.lon]))
            }))
            .sort((a, b) => a.distance - b.distance);
    }

    // Map markers
    transportLayer.clearLayers();

    places.forEach(place => {

        L.marker([place.lat, place.lon])
            .addTo(transportLayer)
            .bindPopup(
                "<b>" + escapeHTML(place.name) + "</b><br>" +
                formatDistance(place.distance) + " away"
            );

    });

    // Zoom to results (and the search center)
    const bounds = L.latLngBounds(places.map(p => [p.lat, p.lon]));
    bounds.extend(center);

    map.fitBounds(bounds, {
        padding: [40, 40]
    });

    // Results card
    const note = isDemo
        ? "Live data could not be loaded, so sample locations are shown."
        : `Showing the closest ${places.length} within ${formatDistance(radiusUsed)} of ` +
          (userLocation ? "your location" : "the city centre") +
          ", from OpenStreetMap data.";

    result.innerHTML = `
        <div class="result-card">

            <h3>📍 ${transportTitles[type]}</h3>

            <div class="route-note">${note}</div>

            <ul>
                ${places.map(p =>
                    `<li>${escapeHTML(p.name)} <span style="color:#778179">· ${formatDistance(p.distance)}</span></li>`
                ).join("")}
            </ul>

            ${isDemo
                ? `<button class="search-button" onclick="showTransport('${type}')">Retry</button>`
                : ""}

        </div>
    `;

    if (isDemo) {
        console.log("Demo transport locations displayed.");
    } else {
        console.log("Live transport locations displayed.");
    }
}


/* =========================================================
   10. MAP RESIZE
   ========================================================= */

window.addEventListener("load", function() {

    setTimeout(function() {
        map.invalidateSize();
    }, 500);

});

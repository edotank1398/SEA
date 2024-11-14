// Inizializza la mappa
var map = L.map('map').setView([10.762622, 106.660172], 5); // Centra la mappa su Vietnam

// Aggiunge il layer della mappa con i paesi circostanti
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Icona personalizzata con numeri per l'ordine delle tappe
function createNumberedIcon(number) {
    return L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4CAF50;color:white;width:25px;height:25px;text-align:center;border-radius:50%;font-weight:bold;line-height:25px;'>" + number + "</div>",
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

// Aggiungi marker numerati per ogni tappa con popup attività e trasporti
function createMarker(coordinates, number, activities) {
    var marker = L.marker(coordinates, {icon: createNumberedIcon(number)}).addTo(map);
    var activityPopup = "<strong>Attività:</strong> " + activities;
    marker.bindPopup(activityPopup);
}

createMarker([10.762622, 106.660172], 1, "War museum, Bui Vien street, Cafe apartments");
createMarker([16.0544, 108.2022], 2, "Marble mountains, Ba Na hills (golden bridge), Friday night market, My Khe beach");
createMarker([15.8800584, 108.3380469], 3, "Tailored clothes, Old town, Lantern boats at night, Central markets, Night markets, Cycle in rice fields, Coconut forest basket boats, An Bang beach");
createMarker([21.028511, 105.804817], 4, "Train street, Note cafe, Ngoc Son temple, Markets, Old quarter at night, Hoan Kiem lake, Beer street, Women's museum, Egg coffee, Bread factory");
createMarker([20.910051, 107.183902], 5, "Hang Sung Sot cave, Me Cung cave");
createMarker([18.787747, 98.993128], 6, "Trekking tour, Elephant sanctuary, Cooking class, Night market, Grand Canyon waterpark");
createMarker([8.0863, 98.9063], 7, "Day trip to Phi Phi, Night market, Tiger temple, Maya bay/Pileh lagoon, Fire shows");
createMarker([10.0952, 99.8393], 8, "Fish bowls, Cabaret show, Hikes/Views, John-Suwan viewpoint, Beaches: Mango bay, Tanote bay, Freedom beach (sharks), Sairee beach, Shark bay (turtles)");
createMarker([9.5120, 100.0137], 9, "Sunset Lipa Noi beach, Namuang waterfalls, Lamai viewpoint, Lamai beach, Overlap stones, Pig island");
createMarker([13.7563, 100.5018], 10, "Lumpini park, Boat tour, Khao San road, Wat Arun, Wat Pho, China town, Boat noodles, Ong Ang canal, Rooftop bar, BTS sky train, Siam square, Floating markets, Mahanakhon sky bar");
createMarker([14.5995, 120.9842], 11, "Accommodation stay");
createMarker([12.9214, 123.6714], 12, "Whale shark interaction");
createMarker([11.9952, 120.2007], 13, "Island hopping tours");
createMarker([11.1875, 119.3952], 14, "Big Lagoon, Secret Lagoon, Small Lagoon tours");
createMarker([9.7392, 118.7352], 15, "Underground river, beach activities");
createMarker([-8.4095, 115.1889], 16, "Mt Batur hike, Cretya/Tegallalang rice terrace, Luwak coffee plantation, Pura Tirta temple, Jewellery class, Yoga class, Cycling tour, Waterfalls: Tibumana, Kanto Lampo");
createMarker([-8.3496, 116.0451], 17, "Turtle beach, Sunset on sunset beach, Cycle around island, Horse ride, Tequila sunrise bar, Movie night, Day trip to Gili Meno (Underwater statues, Swim with turtles), Day trip to Nusa Penida (Crystal bay, Manta Bay, Gamat bay snorkelling, Angels billabong)");

// Aggiungi linea tratteggiata per collegare le tappe
var latlngs = [
    [10.762622, 106.660172], [16.0544, 108.2022], [15.8800584, 108.3380469],
    [21.028511, 105.804817], [20.910051, 107.183902], [18.787747, 98.993128],
    [8.0863, 98.9063], [10.0952, 99.8393], [9.5120, 100.0137],
    [13.7563, 100.5018], [14.5995, 120.9842], [12.9214, 123.6714],
    [11.9952, 120.2007], [11.1875, 119.3952], [9.7392, 118.7352],
    [-8.4095, 115.1889], [-8.3496, 116.0451]
];

var transportInfo = [
    "<a href='https://mail.google.com/mail/u/0/#inbox/FMfcgzQXJkPpVLZjQxqGTLxRpnlwcVbb'>Flight (HCM -> DAN)</a> Total $174.4 (paid)",
    "Bus roughly $10 each - will have to store bags for a bit of the day before check in at 2pm",
    "Bus to Da Nang Airport, Flight to Hanoi",
    "Bus to Ha Long Bay",
    "Cruise to Ha Long Bay",
    "Flight AirAsia (Hanoi -> Chiang Mai)",
    "Flight (Chiang Mai -> Krabi)",
    "Bus+Ferry (Krabi -> Koh Tao)",
    "Ferry (Koh Tao -> Ko Samui)",
    "Bus to Bangkok",
    "Flight to Manila",
    "Boat to Coron",
    "Bus to El Nido",
    "Bus to Puerto Princessa",
    "Flight to Bali",
    "Boat to Gili T",
    "Flight to Sydney"
];

var polylines = [];
for (var i = 0; i < latlngs.length - 1; i++) {
    var polyline = L.polyline([latlngs[i], latlngs[i + 1]], {
        color: 'gray',
        weight: 5,
        dashArray: '8, 8',
        opacity: 1
    }).addTo(map);

    polyline.on('mouseover', (function(index) {
        return function(e) {
            e.target.setStyle({color: 'orange'});
        };
    })(i));

    polyline.on('mouseout', (function(index) {
        return function(e) {
            e.target.setStyle({color: 'gray'});
        };
    })(i));

    polyline.on('click', (function(index) {
        return function(e) {
            var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent("<strong>Trasporto:</strong> " + transportInfo[index])
                .openOn(map);
        }
    })(i));

    polylines.push(polyline);
}

// Funzione per zoomare su una specifica linea tratteggiata e evidenziarla
function highlightPolyline(index) {
    var bounds = polylines[index].getBounds();
    map.fitBounds(bounds.pad(0.5));
    polylines[index].setStyle({color: 'orange'});
    setTimeout(function() {
        polylines[index].setStyle({color: 'gray'});
    }, 2000);
}

// Carica il file GeoJSON localmente
fetch('custom.geo.json')
    .then(response => response.json())
    .then(data => {
        console.log("GeoJSON caricato con successo", data);

        // Aggiungi i paesi dal file custom.geo.json
        L.geoJSON(data, {
            style: function (feature) {
                var countryColors = {
                    'Vietnam': '#ff0008',       // Verde per il Vietnam
                    'Thailand': '#FF4500',      // Giallo per la Thailandia
                    'Philippines': '#25d402',   // Blu per le Filippine
                    'Indonesia': '#00acf7'      // Arancione per Bali, Indonesia
                };
                return {
                    color: countryColors[feature.properties.name] || '#ff0000',
                    weight: 1,
                    opacity: 1
                };
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Errore nel caricamento del GeoJSON:', error);
    });

// Funzione per zoomare sulla posizione
function zoomToLocation(coordinates, zoomLevel) {
    map.setView(coordinates, zoomLevel);
}

// Funzione per mostrare o nascondere la lista
function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.02059;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {

        return Math.pow(2, zoom);
    },
    zoom: function(sc) {

        return Math.log(sc) / 0.6931471805599453;
    },
	distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
	transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

var SateliteStyle = L.tileLayer('mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 8,noWrap: true,continuousWorld: false,id: 'SateliteStyle map',}),
	AtlasStyle	= L.tileLayer('mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,id: 'styleAtlas map',}),
	GridStyle	= L.tileLayer('mapStyles/styleGrid/{z}/{x}/{y}.png', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,id: 'styleGrid map',});

var ExampleGroup = L.layerGroup();

var Icons = {
	"Borne Incendie" :ExampleGroup,
};

var mymap = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle, ExampleGroup],
    center: [0, 0],
    zoom: 3,
});

var layersControl = L.control.layers({ "Satelite": SateliteStyle,"Atlas": AtlasStyle,"Grid":GridStyle}, Icons).addTo(mymap);


function customIcon(icon){
	return L.icon({
		iconUrl: `blips/${icon}.png`,
		iconSize:     [15, 15],
		iconAnchor:   [10, 10], 
		popupAnchor:  [0, -7]
	});
}

function updateMarkerPosition(latlng) {
    marker.setLatLng(latlng);
}

mymap.on('mousemove', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Display coordinates in a div (you might need to create this div in your HTML)
    document.getElementById('mouse-coordinates').innerText = 'Lat: ' + lat.toFixed(2) + ', Lng: ' + lng.toFixed(2);
});

// Fonction pour changer la couleur du fond en fonction du calque actif
function updateBackgroundColor(layerId) {
    const mapContainer = document.getElementById('map'); // Assurez-vous que l'élément a l'ID "map"
    
    // Définir une couleur pour chaque calque
    const layerColors = {
        "SateliteStyle map": "#153E6A", // Couleur noire pour le style satellite
        "styleAtlas map": "#0FA8D2",   // Couleur gris clair pour le style atlas
        "styleGrid map": "#8F8F8F"     // Couleur blanche pour le style grille
    };

    // Appliquer la couleur correspondante ou un défaut si non défini
    mapContainer.style.backgroundColor = layerColors[layerId] || "#000000";
}

// Mettre à jour la couleur du fond lorsque le calque change
mymap.on('baselayerchange', function (event) {
    updateBackgroundColor(event.layer.options.id);
});

// Initialiser avec la couleur du calque par défaut (SateliteStyle)
updateBackgroundColor(SateliteStyle.options.id);

let tempMarker = null; // Variable to store the temporary marker

// Function to add a temporary marker on click
mymap.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Remove the previous temporary marker if it exists
    if (tempMarker !== null) {
        mymap.removeLayer(tempMarker);
    }

    // Create a new temporary marker
    tempMarker = L.marker([lat, lng])
        .addTo(mymap)
        .bindPopup("Coordinates: " + lat.toFixed(2) + ", " + lng.toFixed(2))
        .on('popupclose', function(event) { // Add popupclose event listener
            mymap.removeLayer(tempMarker); // Remove the marker when the popup is closed
            tempMarker = null; // Reset tempMarker
        });

    // Open the popup immediately
    tempMarker.openPopup();
});

//L.marker([Y,X], {icon: customIcon(1)}).addTo(Icons["Example"]).bindPopup("I am here.");
L.marker(["3740.00","1928.00"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3740.00, 1928.00");
L.marker(["3742.99","1970.79"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3742.99, 1970.79");
L.marker(["3791.53","2015.36"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3791.53, 2015.36");
L.marker(["3729.77","1885.77"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3729.77, 1885.77");
L.marker(["3741.76","1863.64"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3741.76, 1863.64");
L.marker(["3716.68","1818.68"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3716.68, 1818.68");
L.marker(["3702.86","1797.86"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3702.86, 1797.86");
L.marker(["3688.22","1805.65"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3688.22, 1805.65");
L.marker(["3646.58","1734.02"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3646.58, 1734.02");
L.marker(["3841.02","1982.26"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3841.02, 1982.26");
L.marker(["3770.62","1819.68"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3770.62, 1819.68");
L.marker(["3730.99","1770.58"], {icon: customIcon(2)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3730.99, 1770.58");
L.marker(["3742.99","1970.79"], {icon: customIcon(3)}).addTo(Icons["Borne Incendie"]).bindPopup(" GPS: 3742.99, 1970.79");
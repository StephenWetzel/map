//Initialize the map
var map = L.map('divMap').setView([44.1126, -73.923], 12);

//Create the map	
L.tileLayer('http://tile.cloudmade.com/f19d6045b0ac4f68bc75b707ac14e3dd/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Odin'
}).addTo(map);


//Code to add images of scanned maps as overlay:
//they are layers already, but adding them to this layer lets them be turned off
var layerScans = new L.LayerGroup(); 
var layerUsgs = new L.LayerGroup(); 

var imageBoundsMarcy = [[44.187769661, -74.083110226], [44.071878201, -73.821816444]];
var imageBoundsSouth = [[44.16605162, -73.928969307], [44.05045995529445, -73.705480129]];
var imageBoundsMarcyUsgs = [[44.125, -74.0], [44.0, -73.75]];

var layerMarcy = L.imageOverlay('maps/marcy.png', imageBoundsMarcy, {zIndex:-10});
var layerSouth = L.imageOverlay('maps/south.png', imageBoundsSouth);
var layerMarcyUsgs = L.imageOverlay('maps/marcyusgs.png', imageBoundsMarcyUsgs);

layerScans.addLayer(layerMarcy,true);
layerScans.addLayer(layerSouth,true);
layerUsgs.addLayer(layerMarcyUsgs,true);
//I can't figure out how to make these not cover the routes if selected after load
//If you want to use them enable them on by default in that section below


//layerScans.bringToBack();
//layerSouth.bringToBack();
//layerMarcyUsgs.bringToBack();
//layerSouth.setOpacity(0.8);



//Create and initilize layers
//There are two kinds of layers.
//Baser layers use radio buttons (only one can be selected)
//overlays use check boxes (any number can be selected)

var layerDefault=""; //a way to get the plain leaflet layer back, probaly produces errors but works

//add all base layers here:
var baseLayers = {
	"None": layerDefault,
	"OpenStreetMap (trails)": L.tileLayer.provider('OpenStreetMap.Mapnik'),
	"OpenStreetMap German Style (trails)": L.tileLayer.provider('OpenStreetMap.DE'),
	"Thunderforest OpenCycleMap (contours)": L.tileLayer.provider('Thunderforest.OpenCycleMap'),
	"MapQuest Aerial (sat)": L.tileLayer.provider('MapQuestOpen.Aerial'),
	"Stamen Terrain (terrain)": L.tileLayer.provider('Stamen.Terrain'),
	"Esri WorldImagery (sat)": L.tileLayer.provider('Esri.WorldImagery'),
	"Scanned": layerScans,
	"USGS": layerUsgs,

};

//create overlay layers as layergroups so we can add markers to them:
var layerListSummits = new L.LayerGroup();
var layerSummits = new L.LayerGroup();
var layerTrailheads = new L.LayerGroup();
var layerLienTos = new L.LayerGroup();
var layerTents = new L.LayerGroup();
var layerViewpoints = new L.LayerGroup();
var layerTrails = new L.LayerGroup();
var layerJcts = new L.LayerGroup();

//Add overlay layers to map, these will be on by default:
layerListSummits.addTo(map);
layerSummits.addTo(map);
layerTrailheads.addTo(map);
//layerLienTos.addTo(map);
//layerTents.addTo(map);
//layerViewpoints.addTo(map);
layerTrails.addTo(map);
layerJcts.addTo(map);
//layerScans.addTo(map);
//layerUsgs.addTo(map);

//list all overlay layers here:
var overlayMaps = {
	"List Summits": layerListSummits,
	"Other Summits": layerSummits,
	"Trailheads": layerTrailheads,
	"Lien-Tos": layerLienTos,
	"Tent Sites": layerTents,
	"Viewpoints": layerViewpoints,
	"Trails": layerTrails,
	"Jcts": layerJcts,
	
	
};

//create actual layer control box
L.control.layers(baseLayers , overlayMaps).addTo(map); //the layer control box




//Create the icon class for markers
//Might make new class for highlighted icons so color can extend further

var MainIcon = L.Icon.extend({
	options: {
	//shadowUrl: 'leaf-shadow.png',

	//these are x,y pairs: [0,0] is upper left, [16,32] is center bottom (assuming 32x32 icon size)
	iconSize:	 [32, 32], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	//Changed this to be bottom center:
	iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
	}
});

//Set URL for individual markers
var	iconListSummit = new MainIcon({iconUrl: 'icons/46.png'}),
		iconSummit = new MainIcon({iconUrl: 'icons/peak.png'}),
		iconTent = new MainIcon({iconUrl: 'icons/tent2.png'}), //this icon should have some outline to stand out on green
		iconLeanto = new MainIcon({iconUrl: 'icons/leanto5.png'}),
		iconTrailhead = new MainIcon({iconUrl: 'icons/parkingsign1.png'}),
		iconJct = new MainIcon({iconUrl: 'icons/jct.png'}),
		
		iconListSummitRed = new MainIcon({iconUrl: 'icons/46red.png'}),
		iconSummitRed = new MainIcon({iconUrl: 'icons/peakred.png'}),
		iconTentRed = new MainIcon({iconUrl: 'icons/tent2red.png'}),
		iconLeantoRed = new MainIcon({iconUrl: 'icons/leanto5red.png'}),
		iconTrailheadRed = new MainIcon({iconUrl: 'icons/parkingsign1red.png'}),
		iconJctRed = new MainIcon({iconUrl: 'icons/jctred.png'});




var popuptext;


//Add items from POI arrays
//Instantiuated in poi.js

//Add markers of various types:
var markerListSummits = [];
for (i = 0; i <= lstListSummits.length-1; i++) {//add list summits
	popuptext = 
		lstListSummits[i][3] + "<br>" + 
		lstListSummits[i][4].toString() + " ft <br>" +
		lstListSummits[i][0].toString() + ", " + lstListSummits[i][1].toString() + "<br>";
		
	markerListSummits[i] = L.marker([lstListSummits[i][0], lstListSummits[i][1]], {
		id: i, //id is used when marker is clicked
		icon: iconListSummit, 
		title: lstListSummits[i][3]
	}).bindPopup(popuptext);
	layerListSummits.addLayer(markerListSummits[i]);	
	
	markerListSummits[i].on('click', function (e) {
		clickMarker(e, "ListSummit"); //the function that actually does stuff on click
	});
}

var markerSummits = [];
for (i = 0; i <= lstSummits.length-1; i++) {//add regular summits
	popuptext = 
		lstSummits[i][3] + "<br>" + 
		lstSummits[i][4].toString() + " ft <br>" +
		lstSummits[i][0].toString() + ", " + lstSummits[i][1].toString() + "<br>";
	
	markerSummits[i] = L.marker([lstSummits[i][0], lstSummits[i][1]], {
		id: i,
		icon: iconSummit,
		title: lstSummits[i][3],
		opacity: 0.7
	}).bindPopup(popuptext);
	layerSummits.addLayer(markerSummits[i]);		
	
	markerSummits[i].on('click', function (e) {
		clickMarker(e, "Summit");
	});
}

var markerTrailheads = [];
for (i = 0; i <= lstTrailheads.length-1; i++) {//add trailheads
	popuptext = 
		lstTrailheads[i][3] + "<br>" + 
		lstTrailheads[i][4].toString() + " ft <br>" +
		lstTrailheads[i][0].toString() + ", " + lstTrailheads[i][1].toString() + "<br>";
	
	markerTrailheads[i] = L.marker([lstTrailheads[i][0], lstTrailheads[i][1]], {
		id: i,
		icon: iconTrailhead,
		title: lstTrailheads[i][3]
	}).bindPopup(popuptext);
	layerTrailheads.addLayer(markerTrailheads[i]);		
	
	markerTrailheads[i].on('click', function (e) {
		clickMarker(e, "Trailhead");
	});	
}

var markerTents = [];
for (i = 0; i <= lstTents.length-1; i++) {//add tenting sites
	popuptext = 
		lstTents[i][3] + "<br>" + 
		lstTents[i][4].toString() + " ft <br>" +
		lstTents[i][0].toString() + ", " + lstTents[i][1].toString() + "<br>";
	
	markerTents[i] = L.marker([lstTents[i][0], lstTents[i][1]], {
		id: i,
		icon: iconTent,
		title: lstTents[i][3]
	}).bindPopup(popuptext);
	layerTents.addLayer(markerTents[i]);		
	
	markerTents[i].on('click', function (e) {
		clickMarker(e, "Tent");
	});	
}

var markerLeantos = [];
for (i = 0; i <= lstLeantos.length-1; i++) {//add leantos
	popuptext = 
		lstLeantos[i][3] + "<br>" + 
		lstLeantos[i][4].toString() + " ft <br>" +
		lstLeantos[i][0].toString() + ", " + lstLeantos[i][1].toString() + "<br>";
	
	markerLeantos[i] = L.marker([lstLeantos[i][0], lstLeantos[i][1]], {
		id: i,
		icon: iconLeanto,
		title: lstLeantos[i][3]
	}).bindPopup(popuptext);
	layerLienTos.addLayer(markerLeantos[i]);	
	
	markerLeantos[i].on('click', function (e) {
		clickMarker(e, "Leanto");
	});		
}

var markerJcts = [];
for (i = 0; i <= lstJcts.length-1; i++) {//add junctions
	popuptext = 
		lstJcts[i][3] + "<br>" + 
		lstJcts[i][4].toString() + " ft <br>" +
		lstJcts[i][0].toString() + ", " + lstJcts[i][1].toString() + "<br>";
	
	markerJcts[i] = L.marker([lstJcts[i][0], lstJcts[i][1]], {
		id: i,
		icon: iconJct,
		title: lstJcts[i][3]
	}).bindPopup(popuptext);
	layerJcts.addLayer(markerJcts[i]);	
	
	markerJcts[i].on('click', function (e) {
		clickMarker(e, "Jct");
	});		
}


L.control.scale().addTo(map); //the distance scale

map.on('mousemove', function(e) { //puts the lat long in the footer, helps while testing
	var temp = e.latlng.lat + "; " + e.latlng.lng;
	document.getElementById('divFooter').innerHTML=temp;
})

map.on('click', function(e) { //click for lat long in sidebar
	var temp = e.latlng.lat + ", " + e.latlng.lng;
	
	document.getElementById('divRightBody').innerHTML += "<br>"+temp;
})




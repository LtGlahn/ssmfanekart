﻿

var mindato = function( dateObj) { 

	var monthNames = [
			"jan", "feb", "mar",
			"apr", "mai", "juni", "juli",
			"aug", "sep", "okt",
			"nov", "des"
		];

		
	var datostreng = dateObj.getDate() + ". " 
						+ monthNames[dateObj.getMonth()] + " " 
						+  dateObj.getFullYear();

	var helTime = ('0'+dateObj.getHours()).slice(-2);
	var minutt = ('0'+dateObj.getMinutes()).slice(-2);
	var sekund = ('0'+dateObj.getSeconds()).slice(-2);

	var klokkestreng = helTime + ':' + minutt + ':' + sekund; 

	return { dato: datostreng, klokke: klokkestreng }; 

}



var map = new L.map('map').setView([63.43, 10.44], 14);

L.control.zoom( { position : 'bottomleft'} ).addTo(map) 

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', 
	subdomains: 'abcd',
}).addTo(map);




function onLocationFound(e) {
	var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map)
		.bindPopup("Du er her!");

	L.circle(e.latlng, radius).addTo(map)
		.bindPopup("Usikkerhet");
}

function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

/*
map.locate({setView: true, maxZoom: 13}); 
*/

realtime = L.realtime({
        url: 'https://jansimple.pythonanywhere.com/getfile/SSMfane.geojson',
        // url: 'https://jansimple.pythonanywhere.com/getfile/jan.geojson',
        crossOrigin: true,
        type: 'json'
    },
	{
        interval: 10 * 1000, 
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				'icon': L.icon({
					iconUrl: 'img/1431044506_circle_red36x36.png',
					iconSize:     [36, 36], // size of the icon
					iconAnchor: [18, 18], 
					popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
				})
			});
		}
	}).addTo(map); // KOMMENTER INN



realtimeLinje = L.realtime({
        url: 'https://jansimple.pythonanywhere.com/getfile/SSMfane_kurve.geojson',
        // url: 'https://jansimple.pythonanywhere.com/getfile/jan_kurve.geojson',
        crossOrigin: true,
        type: 'json'
    },
	{
        interval: 10 * 1000
    }).addTo(map); // KOMMENTER INN

var firstTimeLinje = true; 


	
realtimeLinje.on('update', function(e) {

	if (firstTimeLinje) {
	   popupContent = function(fId) {
				return 'Spor etter SSM fana'; 
			},
		bindFeaturePopup = function(fId) {
			realtimeLinje.getLayer(fId).bindPopup(popupContent(fId));
		},
		updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
        };

		Object.keys(e.enter).forEach(bindFeaturePopup);
		Object.keys(e.update).forEach(updateFeaturePopup);
	}
	
	firstTimeLinje = false; 

});




var marsjgeo = {
	"type": "FeatureCollection",
	"name": "marsrute1mai2023",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
	{ "type": "Feature", "properties": {  "name": "Marsjrute 1. Mai", 
		"description": "Marsrute 1. mai" }, "geometry": { "type": "LineString", "coordinates": [ [ 10.43108, 63.43697, 0.0 ], [ 10.43113, 63.4368, 0.0 ], [ 10.43102, 63.43671, 0.0 ], [ 10.43096, 63.43645, 0.0 ], [ 10.43094, 63.43637, 0.0 ], [ 10.43091, 63.4363, 0.0 ], [ 10.43087, 63.43622, 0.0 ], [ 10.43078, 63.43609, 0.0 ], [ 10.43071, 63.43604, 0.0 ], [ 10.4306, 63.43597, 0.0 ], [ 10.43039, 63.43587, 0.0 ], [ 10.43029, 63.43592, 0.0 ], [ 10.43022, 63.43594, 0.0 ], [ 10.4301, 63.43598, 0.0 ], [ 10.42998, 63.43602, 0.0 ], [ 10.42978, 63.43605, 0.0 ], [ 10.42956, 63.43605, 0.0 ], [ 10.42944, 63.43604, 0.0 ], [ 10.42919, 63.43603, 0.0 ], [ 10.42898, 63.43602, 0.0 ], [ 10.42854, 63.436, 0.0 ], [ 10.42797, 63.43596, 0.0 ], [ 10.42778, 63.43595, 0.0 ], [ 10.42759, 63.43594, 0.0 ], [ 10.42746, 63.43594, 0.0 ], [ 10.42731, 63.43593, 0.0 ], [ 10.42715, 63.43592, 0.0 ], [ 10.4269, 63.43591, 0.0 ], [ 10.4267, 63.4359, 0.0 ], [ 10.42646, 63.43589, 0.0 ], [ 10.42624, 63.43587, 0.0 ], [ 10.42601, 63.43586, 0.0 ], [ 10.42579, 63.43585, 0.0 ], [ 10.42561, 63.43584, 0.0 ], [ 10.42546, 63.43583, 0.0 ], [ 10.42545, 63.43579, 0.0 ], [ 10.42545, 63.43575, 0.0 ], [ 10.42533, 63.43568, 0.0 ], [ 10.42516, 63.43565, 0.0 ], [ 10.42498, 63.43563, 0.0 ], [ 10.42476, 63.4356, 0.0 ], [ 10.42452, 63.43556, 0.0 ], [ 10.42427, 63.43553, 0.0 ], [ 10.42418, 63.43552, 0.0 ], [ 10.424, 63.43551, 0.0 ], [ 10.42399, 63.43557, 0.0 ], [ 10.42396, 63.43562, 0.0 ], [ 10.4239, 63.43566, 0.0 ], [ 10.42368, 63.43575, 0.0 ], [ 10.42354, 63.43581, 0.0 ], [ 10.42358, 63.43583, 0.0 ], [ 10.42388, 63.43594, 0.0 ], [ 10.42394, 63.43598, 0.0 ], [ 10.42395, 63.43603, 0.0 ], [ 10.42391, 63.43613, 0.0 ], [ 10.42389, 63.43618, 0.0 ], [ 10.42379, 63.43627, 0.0 ], [ 10.4237, 63.43635, 0.0 ], [ 10.4237, 63.43636, 0.0 ], [ 10.42363, 63.43642, 0.0 ], [ 10.42358, 63.43647, 0.0 ], [ 10.42357, 63.43649, 0.0 ], [ 10.42356, 63.43655, 0.0 ], [ 10.42359, 63.43663, 0.0 ], [ 10.42368, 63.43671, 0.0 ], [ 10.4238, 63.43685, 0.0 ], [ 10.42389, 63.43688, 0.0 ], [ 10.42405, 63.43694, 0.0 ], [ 10.42425, 63.43702, 0.0 ], [ 10.42441, 63.43708, 0.0 ], [ 10.42451, 63.43712, 0.0 ], [ 10.42465, 63.43718, 0.0 ], [ 10.42475, 63.43726, 0.0 ], [ 10.42497, 63.43734, 0.0 ], [ 10.42519, 63.43743, 0.0 ], [ 10.42525, 63.43746, 0.0 ], [ 10.42533, 63.4375, 0.0 ], [ 10.42541, 63.43753, 0.0 ], [ 10.4255, 63.43757, 0.0 ], [ 10.42562, 63.43762, 0.0 ], [ 10.42569, 63.43765, 0.0 ], [ 10.42577, 63.43768, 0.0 ], [ 10.42585, 63.43771, 0.0 ], [ 10.42688, 63.43815, 0.0 ], [ 10.42696, 63.43819, 0.0 ], [ 10.42699, 63.43821, 0.0 ], [ 10.42705, 63.43823, 0.0 ], [ 10.42712, 63.43826, 0.0 ], [ 10.42722, 63.4383, 0.0 ], [ 10.42734, 63.43836, 0.0 ], [ 10.42832, 63.43878, 0.0 ], [ 10.42844, 63.43873, 0.0 ], [ 10.42862, 63.43864, 0.0 ], [ 10.42873, 63.43858, 0.0 ], [ 10.42884, 63.43853, 0.0 ], [ 10.42897, 63.43846, 0.0 ], [ 10.42909, 63.43841, 0.0 ], [ 10.4292, 63.43836, 0.0 ], [ 10.42938, 63.43829, 0.0 ], [ 10.4295, 63.43833, 0.0 ], [ 10.42979, 63.43846, 0.0 ], [ 10.42991, 63.43852, 0.0 ], [ 10.43009, 63.43859, 0.0 ], [ 10.4302, 63.43865, 0.0 ], [ 10.43029, 63.43869, 0.0 ], [ 10.43031, 63.43871, 0.0 ], [ 10.43034, 63.43873, 0.0 ], [ 10.43039, 63.43877, 0.0 ], [ 10.43043, 63.4388, 0.0 ], [ 10.43052, 63.43892, 0.0 ], [ 10.43063, 63.4389, 0.0 ], [ 10.43076, 63.43887, 0.0 ], [ 10.43094, 63.43891, 0.0 ], [ 10.43099, 63.43893, 0.0 ], [ 10.43103, 63.43896, 0.0 ], [ 10.43117, 63.43907, 0.0 ], [ 10.4312, 63.4391, 0.0 ], [ 10.43124, 63.43913, 0.0 ], [ 10.43129, 63.43916, 0.0 ], [ 10.43136, 63.4392, 0.0 ], [ 10.43162, 63.43931, 0.0 ], [ 10.43204, 63.4395, 0.0 ], [ 10.43219, 63.43956, 0.0 ], [ 10.43229, 63.43961, 0.0 ], [ 10.43246, 63.43969, 0.0 ], [ 10.43286, 63.43985, 0.0 ], [ 10.433, 63.43987, 0.0 ], [ 10.43315, 63.43986, 0.0 ], [ 10.43321, 63.43985, 0.0 ], [ 10.43328, 63.43983, 0.0 ], [ 10.43333, 63.43981, 0.0 ], [ 10.43336, 63.43979, 0.0 ], [ 10.43339, 63.43977, 0.0 ], [ 10.43341, 63.43975, 0.0 ], [ 10.43367, 63.43947, 0.0 ], [ 10.43379, 63.43935, 0.0 ], [ 10.4339, 63.43924, 0.0 ], [ 10.43399, 63.43913, 0.0 ], [ 10.43409, 63.43902, 0.0 ], [ 10.43422, 63.43889, 0.0 ], [ 10.4343, 63.4388, 0.0 ], [ 10.43437, 63.43872, 0.0 ], [ 10.43448, 63.4386, 0.0 ], [ 10.43463, 63.43844, 0.0 ], [ 10.43477, 63.4383, 0.0 ], [ 10.43492, 63.43813, 0.0 ], [ 10.43504, 63.438, 0.0 ], [ 10.43509, 63.43796, 0.0 ], [ 10.43516, 63.43788, 0.0 ], [ 10.4353, 63.43774, 0.0 ], [ 10.43535, 63.43768, 0.0 ], [ 10.43543, 63.43759, 0.0 ], [ 10.43556, 63.43744, 0.0 ], [ 10.4357, 63.4373, 0.0 ], [ 10.43576, 63.43723, 0.0 ], [ 10.43577, 63.43722, 0.0 ], [ 10.43583, 63.43716, 0.0 ], [ 10.43589, 63.43707, 0.0 ], [ 10.43599, 63.43708, 0.0 ], [ 10.43615, 63.43708, 0.0 ], [ 10.43633, 63.43709, 0.0 ], [ 10.43666, 63.43711, 0.0 ], [ 10.43674, 63.43712, 0.0 ], [ 10.43691, 63.43714, 0.0 ], [ 10.43714, 63.43717, 0.0 ], [ 10.43726, 63.43719, 0.0 ], [ 10.43739, 63.43722, 0.0 ], [ 10.43753, 63.43724, 0.0 ], [ 10.43758, 63.43718, 0.0 ], [ 10.43759, 63.43716, 0.0 ], [ 10.43763, 63.43712, 0.0 ], [ 10.43765, 63.4371, 0.0 ], [ 10.43777, 63.43709, 0.0 ], [ 10.43785, 63.4371, 0.0 ], [ 10.43805, 63.43711, 0.0 ], [ 10.43809, 63.43711, 0.0 ], [ 10.4384, 63.43713, 0.0 ], [ 10.43869, 63.43715, 0.0 ], [ 10.43893, 63.43715, 0.0 ], [ 10.43917, 63.43715, 0.0 ], [ 10.43925, 63.43715, 0.0 ], [ 10.43927, 63.43715, 0.0 ], [ 10.43946, 63.43714, 0.0 ], [ 10.43957, 63.43714, 0.0 ], [ 10.43973, 63.43712, 0.0 ], [ 10.43998, 63.43709, 0.0 ], [ 10.44012, 63.43708, 0.0 ], [ 10.44022, 63.43707, 0.0 ], [ 10.4404, 63.43703, 0.0 ], [ 10.44054, 63.437, 0.0 ], [ 10.44064, 63.43697, 0.0 ], [ 10.44074, 63.43694, 0.0 ], [ 10.44081, 63.43692, 0.0 ], [ 10.44109, 63.43687, 0.0 ], [ 10.44147, 63.43681, 0.0 ], [ 10.44154, 63.4368, 0.0 ], [ 10.44162, 63.43679, 0.0 ], [ 10.44168, 63.43678, 0.0 ], [ 10.44175, 63.43677, 0.0 ], [ 10.44181, 63.43676, 0.0 ], [ 10.44207, 63.43673, 0.0 ], [ 10.44323, 63.43656, 0.0 ], [ 10.44332, 63.43655, 0.0 ], [ 10.44344, 63.43654, 0.0 ], [ 10.44355, 63.43653, 0.0 ], [ 10.44367, 63.43652, 0.0 ], [ 10.44378, 63.43651, 0.0 ], [ 10.4439, 63.4365, 0.0 ], [ 10.44404, 63.43649, 0.0 ], [ 10.44413, 63.43648, 0.0 ], [ 10.44424, 63.43647, 0.0 ], [ 10.44432, 63.43646, 0.0 ], [ 10.44442, 63.43646, 0.0 ], [ 10.44449, 63.43645, 0.0 ], [ 10.44456, 63.43645, 0.0 ], [ 10.44471, 63.43643, 0.0 ], [ 10.44487, 63.43642, 0.0 ], [ 10.445, 63.43641, 0.0 ], [ 10.44514, 63.43639, 0.0 ], [ 10.44553, 63.43635, 0.0 ], [ 10.44597, 63.43631, 0.0 ], [ 10.44635, 63.43628, 0.0 ], [ 10.44653, 63.43626, 0.0 ], [ 10.44672, 63.43624, 0.0 ], [ 10.44698, 63.43621, 0.0 ], [ 10.44717, 63.43619, 0.0 ], [ 10.44733, 63.43618, 0.0 ], [ 10.44759, 63.43616, 0.0 ], [ 10.44781, 63.43613, 0.0 ], [ 10.44808, 63.4361, 0.0 ], [ 10.44838, 63.43608, 0.0 ], [ 10.44851, 63.43608, 0.0 ], [ 10.44849, 63.436, 0.0 ], [ 10.44848, 63.43598, 0.0 ], [ 10.44843, 63.43587, 0.0 ], [ 10.44838, 63.43574, 0.0 ], [ 10.4483, 63.43554, 0.0 ], [ 10.44824, 63.43537, 0.0 ], [ 10.44817, 63.4352, 0.0 ], [ 10.44815, 63.43516, 0.0 ], [ 10.44811, 63.43503, 0.0 ], [ 10.44802, 63.43478, 0.0 ], [ 10.44795, 63.43461, 0.0 ], [ 10.44788, 63.43441, 0.0 ], [ 10.44781, 63.43422, 0.0 ], [ 10.44773, 63.434, 0.0 ], [ 10.44768, 63.43389, 0.0 ], [ 10.4476, 63.43377, 0.0 ], [ 10.44749, 63.43366, 0.0 ], [ 10.44733, 63.43356, 0.0 ], [ 10.44729, 63.43353, 0.0 ], [ 10.44719, 63.43347, 0.0 ], [ 10.44703, 63.4334, 0.0 ], [ 10.44684, 63.43332, 0.0 ], [ 10.44664, 63.43326, 0.0 ], [ 10.44662, 63.43325, 0.0 ], [ 10.44643, 63.43317, 0.0 ], [ 10.44658, 63.4331, 0.0 ], [ 10.44671, 63.43303, 0.0 ], [ 10.44689, 63.43293, 0.0 ], [ 10.44703, 63.43285, 0.0 ], [ 10.44712, 63.43281, 0.0 ], [ 10.44726, 63.43286, 0.0 ], [ 10.44733, 63.43289, 0.0 ], [ 10.44745, 63.43293, 0.0 ], [ 10.44767, 63.433, 0.0 ], [ 10.44788, 63.43307, 0.0 ], [ 10.44806, 63.43313, 0.0 ], [ 10.44825, 63.43319, 0.0 ], [ 10.44846, 63.43326, 0.0 ], [ 10.44851, 63.43328, 0.0 ], [ 10.44864, 63.43334, 0.0 ], [ 10.44869, 63.43327, 0.0 ], [ 10.44873, 63.43324, 0.0 ], [ 10.44881, 63.43317, 0.0 ], [ 10.44891, 63.43309, 0.0 ], [ 10.44895, 63.43305, 0.0 ], [ 10.44909, 63.43295, 0.0 ], [ 10.44933, 63.4328, 0.0 ], [ 10.44953, 63.43268, 0.0 ], [ 10.44987, 63.43251, 0.0 ], [ 10.44997, 63.43247, 0.0 ], [ 10.45007, 63.43243, 0.0 ], [ 10.45016, 63.43252, 0.0 ], [ 10.45032, 63.43268, 0.0 ], [ 10.45043, 63.43278, 0.0 ], [ 10.45047, 63.43284, 0.0 ], [ 10.45056, 63.43293, 0.0 ], [ 10.45052, 63.43303, 0.0 ], [ 10.45051, 63.43306, 0.0 ], [ 10.45048, 63.43312, 0.0 ], [ 10.45043, 63.43321, 0.0 ], [ 10.45038, 63.43331, 0.0 ], [ 10.45034, 63.43338, 0.0 ], [ 10.45031, 63.43345, 0.0 ], [ 10.45025, 63.43354, 0.0 ], [ 10.45023, 63.4336, 0.0 ], [ 10.45019, 63.43364, 0.0 ], [ 10.45014, 63.43369, 0.0 ], [ 10.45026, 63.43372, 0.0 ], [ 10.4503, 63.43373, 0.0 ], [ 10.4504, 63.43376, 0.0 ], [ 10.45056, 63.4338, 0.0 ], [ 10.4506, 63.4338, 0.0 ], [ 10.45075, 63.43383, 0.0 ], [ 10.45089, 63.43386, 0.0 ], [ 10.45105, 63.4339, 0.0 ], [ 10.45109, 63.43391, 0.0 ], [ 10.4512, 63.43393, 0.0 ], [ 10.45127, 63.43395, 0.0 ], [ 10.45147, 63.43401, 0.0 ], [ 10.45165, 63.43407, 0.0 ], [ 10.45182, 63.43413, 0.0 ], [ 10.45212, 63.43421, 0.0 ], [ 10.45235, 63.43427, 0.0 ], [ 10.45246, 63.43431, 0.0 ], [ 10.45266, 63.43437, 0.0 ], [ 10.45283, 63.43442, 0.0 ], [ 10.453, 63.43444, 0.0 ], [ 10.4531, 63.43446, 0.0 ], [ 10.45318, 63.43448, 0.0 ], [ 10.45333, 63.43453, 0.0 ], [ 10.45357, 63.4346, 0.0 ], [ 10.45469, 63.43396, 0.0 ], [ 10.45479, 63.43393, 0.0 ], [ 10.45475, 63.43387, 0.0 ], [ 10.45461, 63.4337, 0.0 ] ] } }
	]
}
	


// marsjering =  L.geoJson(marsjgeo, {
// 	style: function(feature) {
// 	 return {
// 		color: "#ff0000"
// 	};
// 	}, 
// 		onEachFeature: function (feature, layer) {
// 			layer.bindPopup(feature.properties.description);
// 		}
// 		}).addTo(map);
			
/* DISSE TRENGER VI

viktigePunkt = L.geoJson(punkt, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup('<b>' + feature.properties.name + '</b><br>' +  feature.properties.description);
			}, 
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 8,
					fillColor: "#ff7800",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8,
				});
			}
		}).addTo(map);			
			

var mylabels = L.geoJson(punkt, {
	onEachFeature: function (feature, layer) {
		layer.bindPopup('<b>' + feature.properties.name + '</b><br>' +  feature.properties.description);
	}, 
    pointToLayer: function(feature, ll) {
        return L.marker(ll, {
            icon: L.divIcon({
                className: 'mylabel',
                html: '<b>' + feature.properties.name + '</b>'
            })
        });
    }
}).addTo(map);



// 17. mai meny 

var layerControl = L.control.layers(null, { 
			"Oppmøtested" : viktigePunkt, 
//			"Henteområde" : henteomr, 
//			"Marsjruter morgen":  marsjering_fm, 
//			"Marsjruter ettermiddag":  marsjering_em, 
			"Navn oppmøtesteder": mylabels,
			"SSM fane": realtime, 
			"Spor etter SSM fane": realtimeLinje
			},  {position: 'bottomright'} ); 
map.addControl(layerControl);  

*/
 
// 1. mai meny

var layerControl = L.control.layers(null, {  
			"SSM fane": realtime, 
			"Spor etter SSM fane": realtimeLinje 
//			"Planlagt rute" : marsjering
			},  {position: 'bottomright'} ); 
map.addControl(layerControl); 

var firstTime = true; 

realtime.on('update', function(e) {
	
        popupContent = function(fId) {
            var feature = e.features[fId]; 
			var timestamp = new Date( Date.parse( feature.properties.time)); 
			var timePretty = mindato( timestamp ); 
			document.querySelector('#vegreferanse').innerHTML = "SSM fane " + timePretty['klokke'];
            return '<img src="img/ssmlogo36x55.jpg"><br>' + 
			feature.properties.id + ' var her<br>' + 
					'<b>' + timePretty['klokke'] + "</b><br>" + timePretty['dato'];
        },
        bindFeaturePopup = function(fId) {
            realtime.getLayer(fId).bindPopup(popupContent(fId)).openPopup();
        },
        updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
        };

    Object.keys(e.enter).forEach(bindFeaturePopup);
    Object.keys(e.update).forEach(updateFeaturePopup);

	if (firstTime) {
		map.fitBounds(realtime.getBounds(), {maxZoom: 14});
	}
	
firstTime = false; 
	
	
});

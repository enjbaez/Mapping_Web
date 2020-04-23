var API_KEY = "pk.eyJ1IjoicmljaGFwcmFrYXNoIiwiYSI6ImNqdWZxNjI5czBoMGQ0M3A0b2lqemwwYmYifQ.gONukZr7Er-PKhLb57SvYQ"
var greymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var map = L.map("map",
 {center: [50.0, -96.8],
  zoom:5
})

greymap.addTo(map)

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
  function styleinfo(feature){
    return {
        radius: get_radius(feature.properties.mag) ,
        fillColor: get_color(feature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
  }
  function get_color(magnatude){
    switch(true){
      case magnatude > 5:
        return "red"; 
      case magnatude > 4:
        return "orange";
      case magnatude > 3:
        return "yellow"; 
      case magnatude > 2:
        return "green"; 
      case magnatude > 1:
        return "blue"; 
      default:
        return "white";
    }
  }


  function get_radius(magnatude){
    return magnatude * 4;
  }
  console.log(data); 
  L.geoJson(data, {
     pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleinfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    } 
  }).addTo(map)

  // create legend
  
})




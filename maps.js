const MAPS_JS_KEY = 'AIzaSyDrJ5Ox3gfxhih4LF2OTUknFwGitEsEBZI'; // When running locally, replace with own key, as this is domain-controlled
// see https://developers.google.com/maps/documentation/javascript/, "GET A KEY"

(setMapsScriptSrc = () => {
    document.getElementById('maps-api').src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_JS_KEY}&callback=initMap`;
})();

initMap = () => {
    var center = { lat: 0, lng: 0 };
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: center
    });
    
     var oms = new OverlappingMarkerSpiderfier(map, {
                    markersWontMove: true,
                    markersWontHide: true,
                    basicFormatEvents: true
                  });

    COORDINATES.forEach(coord => {
        marker = new google.maps.Marker({
            position: coord.location,
            map: map
        });

        var marker, i;
       

        google.maps.event.addListener(marker, 'spider_click', (function(marker, i) {
            return function() {
                infowindow.setContent(`
                    <div class="main-info">
                        <span>${coord.redditAddress}</span><br/>
                        <a href="${coord.link}" title="Visit /u/${coord.user}'s Comment" target="_blank">/u/${coord.user}</a>
                    </div>
                    <div class="secondary-info">
                        <span class="title">Returned From Google Geocoding:</span>
                        <p>${coord.formattedAddress}</p>
                        <p>Lat: ${coord.location.lat}, Long: ${coord.location.lng}</p>
                    </div>
                `);
                infowindow.open(map, marker);
            }        
        })(marker, i))
        oms.addMarker(marker);
    });

    document.getElementById('last-updated').innerText = UPDATED_DATE;
    document.getElementById('mapped-points').innerText = COORDINATES.length;
}

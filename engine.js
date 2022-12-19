var types = ['General', 'Sight', 'Observation deck', 'Food', 'Shop'];
var typ = ['islands#blueDotIcon', 'islands#blueLeisureIcon', 'islands#blueObservationIcon', 'islands#blueFoodIcon', 'islands#blueShoppingIcon'];

ymaps.ready(init);




var myMap;

function init () {
  var myMap = new ymaps.Map("map", {
          center: [55.73, 37.75],
          zoom: 9
      }, {
          searchControlProvider: 'yandex#search'
      }),
      kmlButton = $('.load-kml');

      myMap.behaviors.disable('dblClickZoom');

      kmlButton.click(function (e) {
        var a = document.getElementById("linkInput").value;
        if (a != ''){
          ymaps.geoXml.load(a)
              .then(onGeoXmlLoad);
          e.target.disabled = true;
        }
        else{
          alert('The "Link" field is empty')
        }
      });

      yellowCollection = new ymaps.GeoObjectCollection(null, {
          preset: 'islands#Icon',
      });


      myMap.events.add('click', function (e) {
          var coords = e.get('coords');
          var col = document.getElementById("colorpick").value;
          var type1 = document.getElementById("select_type").value;
          var discript = document.getElementById("discription").value;
          var num = types.findIndex(i => i == type1);
          var type = typ[num];
          var myPlacemark = new ymaps.Placemark(coords, {
            balloonContent: discript
        }, {
            preset: type,
            iconColor: col
        });
        yellowCollection.add(myPlacemark);
        myMap.geoObjects.add(yellowCollection);
      });

      yellowCollection.events.add('contextmenu', function(e) {
          var thisPlacemark = e.get('target');
        yellowCollection.remove(thisPlacemark);
      });

      function onGeoXmlLoad(res) {
        myMap.geoObjects.add(res.geoObjects);
        if (res.mapState) {
            res.mapState.applyToMap(myMap);
        }
        else {
            myMap.setBounds(res.geoObjects.getBounds());
        }
    }
}

---
title: "^Wayfare &mdash; We believe in the world's best future"
---

# We're Wayfare.<br>And we think that you're pretty amazing.

We are a 6,000 sq/ft coworking and community playground in Costa Mesa, California seated between the John Wayne Airport and the thriving SOBECA district, outfitted with all of the coffee and awesome necessary for you to fix the broken world.

These are pictures of our space when we moved in. We have furniture, A/V equipment, lighting, and artwork on order. In the meantime, we have some awesome temporary desks and chairs.

<div class="fotorama" data-allowfullscreen="true"
                      data-transition="crossfade"
                      data-loop="true"
                      data-autoplay="true"
                      data-keyboard="true"
                      data-arrows="true"
                      data-click="true"
                      data-swipe="true"
                      data-trackpad="true">
  <img src="{{ 'space/interior-1.jpg' | asset_path }}">
  <img src="{{ 'space/interior-2.jpg' | asset_path }}">
  <img src="{{ 'space/interior-3.jpg' | asset_path }}">
  <img src="{{ 'space/interior-4.jpg' | asset_path }}">
  <img src="{{ 'space/interior-5.jpg' | asset_path }}">
  <img src="{{ 'space/interior-6.jpg' | asset_path }}">
  <img src="{{ 'space/interior-7.jpg' | asset_path }}">
  <img src="{{ 'space/interior-8.jpg' | asset_path }}">
  <img src="{{ 'space/interior-9.jpg' | asset_path }}">
  <img src="{{ 'space/interior-10.jpg' | asset_path }}">
  <img src="{{ 'space/interior-11.jpg' | asset_path }}">
  <img src="{{ 'space/interior-12.jpg' | asset_path }}">
</div>

# You should stop by...we'd like to meet you.

<div id="map" style="width: 100%; height: 300px; margin-bottom: 40px; "></div>
<script type="text/javascript">
  $(function() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoid2F5ZmFyZSIsImEiOiJQVG5NQS0wIn0.fgKjbGJFALHxSY9AQTztEw';
    var map = L.mapbox.map('map', 'wayfare.jikcn876');
    map.featureLayer.on('ready', function(e) {
       map.featureLayer.eachLayer(function(layer) {
        layer.openPopup();
       });
     });
  });
</script>

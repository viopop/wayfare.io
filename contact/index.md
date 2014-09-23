---
title: "Hi. What's up?"
---

# Send us a message.

<div ng-controller="ContactFormController as contactCtrl">
  <form name="form"
        ng-show="!contactCtrl.submitSuccess"
        ng-submit="contactCtrl.submit()">
    <fieldset>
      <label>
        <span>Your Name</span>
        <input name="name"
               ng-model="contactCtrl.contactInfo.name"
               type="text" required>
      </label>
      <label>
        <span>Your Email Address</span>
        <input name="email"
               ng-model="contactCtrl.contactInfo.email"
               type="email" required>
      </label>
      <label>
        <span>Message <small>(at least 10 characters)</small></span>
        <textarea name="message"
                  ng-model="contactCtrl.contactInfo.message"
                  ng-minlength="10" required></textarea>
      </label>
      <button ng-disabled="form.$invalid"
              ng-click="contactCtrl.submit()">Send it</button>
    </fieldset>
  </form>
  <div ng-show="contactCtrl.submitSuccess">
    <h2>Thanks! We sent the message.</h2>
  </div>
</div>

<br>

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

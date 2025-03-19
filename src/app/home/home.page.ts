import { Component } from '@angular/core';
import {CleverTap} from '@awesome-cordova-plugins/clevertap'
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  message = '';

  constructor() {
    CleverTap.enableDeviceNetworkInfoReporting(true);
    // ✅ Request permission using Promises (No async/await)
    Geolocation.requestPermissions()
      .then((permStatus) => {
        if (permStatus.location === 'granted') {
          return Geolocation.getCurrentPosition();
        } else {
          console.log("Location permission denied");
          return null;
        }
      })
      .then((position) => {
        if (position) {
          console.log("Device Location:", position.coords.latitude, position.coords.longitude);
          
          CleverTap.getLocation();
          // ✅ Set location in CleverTap
          CleverTap.setLocation(position.coords.latitude, position.coords.longitude);
        }
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });

    // CleverTap.getLocation();
    // CleverTap.setLocation(location.lat, location.lon);
    // console.log("Location: ", location);
    // if (location) {
    //   console.log("Location: ", location.lat, location.lon);
    // }
    CleverTap.setDebugLevel(3);
  }

  onClick() {
    this.message = 'Button clicked!';
    CleverTap.recordEventWithName("foo");
    CleverTap.registerPush();
}
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CleverTap } from '@awesome-cordova-plugins/clevertap';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  message = '';
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // User Form Validation
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      identity: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    // CleverTap Initialization
    CleverTap.notifyDeviceReady();
    CleverTap.enableDeviceNetworkInfoReporting(true);
    CleverTap.setDebugLevel(3);
    CleverTap.initializeInbox();
    // CleverTap.registerPush();

    // Request Location Permission
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
          CleverTap.setLocation(position.coords.latitude, position.coords.longitude);
        }
      })
      .catch((error) => console.error("Error getting location:", error));

    // Push Primer
    let localInApp = {
      inAppType: 'half-interstitial',
      titleText: 'Get Notified',
      messageText: 'Please enable notifications on your device.',
      positiveBtnText: 'Allow',
      negativeBtnText: 'Cancel',
      fallbackToSettings: true,
    };
    CleverTap.promptPushPrimer(localInApp);
  }

  // Submit Form
  onSubmit() {
    if (this.userForm.valid) {
      console.log("User Data:", this.userForm.value);
      alert("Form Submitted Successfully!");
    } else {
      alert("Please enter valid details.");
    }
  }

  // Custom Event
  recordEvent() {
    CleverTap.recordEventWithName("CustomEvent");
    console.log("Custom event recorded!");
  }

  // OnUserLogin
  onUserLogin() {
    const userData = {
      "Identity": "123456",
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Phone": "+911234567890",
      "Gender": "M",
      "DOB": new Date("1995-05-20"),
    };
    CleverTap.onUserLogin(userData);
    console.log("User logged in:", userData);
  }

  // Profile Push
  pushProfile() {
    const profileData = {
      "Name": "John Doe Updated",
      "Email": "john.doe.updated@example.com",
      "Phone": "+911234567890",
      "City": "Mumbai",
    };
    CleverTap.profileSet(profileData);
    console.log("Profile updated:", profileData);
  }

  //In-App
  inApp() {
    CleverTap.recordEventWithName("InApp");
    console.log("InApp event recorded!");
  }
  // Show App Inbox
showAppInbox() {
  const styleConfig = {
    navBarColor: '#6200EE',
    navBarTitleColor: '#FFFFFF',
    inboxBackgroundColor: '#F9F9F9',
    firstTabTitle: 'Messages',
    tabs: ['Messages', 'Offers']
  };

  CleverTap.showInbox(styleConfig);
  console.log("App Inbox launched");
}
}

document.addEventListener('onCleverTapInboxDidInitialize', () => {
  console.log("📩 CleverTap Inbox Initialized");
});

document.addEventListener('onCleverTapInboxMessagesDidUpdate', () => {
  console.log("📩 CleverTap Inbox Messages Updated");
});



// showAppInbox() {
//   CleverTap.showInbox({
//     tabs: ['Offers', 'Promotions'], // Tab names
//     navBarTitle: 'My App Inbox',
//     navBarTitleColor: '#FFFFFF', // White title
//     navBarColor: '#000000', // Black navbar
//     inboxBackgroundColor: '#F0F0F0', // Light gray background
//     backButtonColor: '#FF0000', // Red back button
//     unselectedTabColor: '#808080', // Gray tabs
//     selectedTabColor: '#0000FF', // Blue selected tab
//     selectedTabIndicatorColor: '#FF0000', // Red underline
//     noMessageText: 'No new messages',
//     noMessageTextColor: '#FF0000',
//   });
//   console.log("Inbox opened");
// }

//   openInbox() {
//     this.cleverTap.showInbox();
//     console.log("Inbox opened");
//   }
// }

//OG CODE
// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import {CleverTap} from '@awesome-cordova-plugins/clevertap'
// import { Geolocation } from '@capacitor/geolocation';


// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: false,
// })
// export class HomePage {
//   message = '';
//   userForm: FormGroup;
//   constructor(private fb: FormBuilder) {
// // userfrom validation
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       identity: ['', [Validators.required]], // Accepts 6-12 digit identity numbers
//       email: ['', [Validators.required, Validators.email]],
//     });
    
  
//     CleverTap.notifyDeviceReady();
//     // CleverTap.registerPush();
//     CleverTap.enableDeviceNetworkInfoReporting(true);
//     // ✅ Request permission using Promises (No async/await)
//     Geolocation.requestPermissions()
//       .then((permStatus) => {
//         if (permStatus.location === 'granted') {
//           return Geolocation.getCurrentPosition();
//         } else {
//           console.log("Location permission denied");
//           return null;
//         }
//       })
//       .then((position) => {
//         if (position) {
//           console.log("Device Location:", position.coords.latitude, position.coords.longitude);
          
//           CleverTap.getLocation();
//           // ✅ Set location in CleverTap
//           CleverTap.setLocation(position.coords.latitude, position.coords.longitude);
//         }
//       })
//       .catch((error) => {
//         console.error("Error getting location:", error);
//       });
//       let localInApp = {
//         inAppType: 'half-interstitial',
//         titleText: 'Get Notified',
//         messageText:
//           'Please enable notifications on your device to use Push Notifications.',
//         followDeviceOrientation: true,
//         positiveBtnText: 'Allow',
//         negativeBtnText: 'Cancel',
//         // Optional parameters:
//         backgroundColor: '#FFFFFF',
//         btnBorderColor: '#0000FF',
//         titleTextColor: '#0000FF',
//         messageTextColor: '#000000',
//         btnTextColor: '#FFFFFF',
//         btnBackgroundColor: '#0000FF',
//         btnBorderRadius: '2',
//         fallbackToSettings: true, //Setting this parameter to true will open an in-App to redirect you to Mobile's OS settings page.
//       };

// CleverTap.promptPushPrimer(localInApp);

//     // CleverTap.getLocation();
//     // CleverTap.setLocation(location.lat, location.lon);
//     // console.log("Location: ", location);
//     // if (location) {
//     //   console.log("Location: ", location.lat, location.lon);
//     // }
//     CleverTap.setDebugLevel(3);
//   }
//   //Submit button
//   onSubmit() {
//     if (this.userForm.valid) {
//       console.log("User Data:", this.userForm.value);
//       alert("Form Submitted Successfully!");
//     } else {
//       alert("Please enter valid details.");
//     }
//   }
//   onClick() {
//     this.message = 'Button clicked!';
//     CleverTap.recordEventWithName("foo");
//     CleverTap.registerPush();
// }
// }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { CleverTap } from '@awesome-cordova-plugins/clevertap';
// import { Geolocation } from '@capacitor/geolocation';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
//   standalone: false,
// })
// export class HomePage {
//   message = '';
//   userForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     // User form validation
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       identity: ['', [Validators.required, Validators.pattern('^[0-9]{6,12}$')]], // Accepts 6-12 digit identity numbers
//       email: ['', [Validators.required, Validators.email]],
//     });

//     // Initialize CleverTap
//     CleverTap.notifyDeviceReady();
//     CleverTap.enableDeviceNetworkInfoReporting(true);
//     CleverTap.setDebugLevel(3);

//     // Request location permissions and get location
//     this.requestLocationPermission();

//     // Configure and prompt CleverTap push primer
//     const localInApp = {
//       inAppType: 'half-interstitial',
//       titleText: 'Get Notified',
//       messageText: 'Please enable notifications on your device to use Push Notifications.',
//       followDeviceOrientation: true,
//       positiveBtnText: 'Allow',
//       negativeBtnText: 'Cancel',
//       backgroundColor: '#FFFFFF',
//       btnBorderColor: '#0000FF',
//       titleTextColor: '#0000FF',
//       messageTextColor: '#000000',
//       btnTextColor: '#FFFFFF',
//       btnBackgroundColor: '#0000FF',
//       btnBorderRadius: '2',
//       fallbackToSettings: true, // Redirect to OS settings if needed
//     };
//     CleverTap.promptPushPrimer(localInApp);
//   }

//   // Request location permissions and fetch location
//   private requestLocationPermission() {
//     Geolocation.requestPermissions()
//       .then((permStatus) => {
//         console.log('Permission Status:', permStatus);
//         if (permStatus.location === 'granted') {
//           return Geolocation.getCurrentPosition();
//         } else {
//           console.log('Location permission denied');
//           return null;
//         }
//       })
//       .then((position) => {
//         if (position) {
//           console.log('Device Location:', position.coords.latitude, position.coords.longitude);
//           CleverTap.setLocation(position.coords.latitude, position.coords.longitude);
//         } else {
//           console.log('Position is null');
//         }
//       })
//       .catch((error) => {
//         console.error('Error getting location:', error);
//       });
//   }

//   // Submit button handler
//   onSubmit() {
//     if (this.userForm.valid) {
//       console.log('User Data:', this.userForm.value);
//       alert('Form Submitted Successfully!');
//     } else {
//       alert('Please enter valid details.');
//     }
//   }

//   // Button click handler
//   onClick() {
//     this.message = 'Button clicked!';
//     CleverTap.recordEventWithName('foo');
//     CleverTap.registerPush();
//   }
// }
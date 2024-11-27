// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyClOSgSLKeT_a8kh0lSzONY-AbI9X0Z2kc",
    authDomain: "tellevoap-4a40e.firebaseapp.com",
    projectId: "tellevoap-4a40e",
    storageBucket: "tellevoap-4a40e.firebasestorage.app",
    messagingSenderId: "87768225791",
    appId: "1:87768225791:web:81314e896e570ddbd179ca"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

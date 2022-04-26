import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "./Map.module.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
const { REACT_APP_API_KEY } = process.env;
var directions;
const Map = ({ location, zoomLevel }) => (
  <div>
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_API_KEY }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
      {/* <div >
          
          <h1>Coordinates</h1>
          <button onClick={getLocation}>Get Location</button>
        </div> */}
    </div>
  </div>
);
const LocationPin = ({ text }) => (
  <div className={styles.pin}>
    <Icon icon={locationIcon} className={styles.icon} />
    <p className={styles.text}>{text}</p>
  </div>
);

// const origin = { lat: 40.756795, lng: -73.954298 };
// const destination = { lat: 41.756795, lng: -78.954298 };

// directionsService.route(
//   {
//     origin: origin,
//     destination: destination,
//     travelMode: google.maps.TravelMode.DRIVING
//   },
//   (result, status) => {
//     if (status === google.maps.DirectionsStatus.OK) {
//       this.setState({
//         directions: result
//       });
//     } else {
//       console.error(`error fetching directions ${result}`);
//     }
//   }
// );
export default Map;

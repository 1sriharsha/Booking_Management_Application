import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "./Map.module.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
const { REACT_APP_API_KEY } = process.env;

const Map = ({ facilityLocation, zoomLevel }) => (
  <div>
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_API_KEY }}
        defaultCenter={facilityLocation}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={facilityLocation.lat}
          lng={facilityLocation.lng}
          text={facilityLocation.street}
        />
      </GoogleMapReact>
    </div>
  </div>
);
const LocationPin = ({ text }) => (
  <div className={styles.pin}>
    <Icon icon={locationIcon} className={styles.icon} />
    <p className={styles.text}>{text}</p>
  </div>
);

export default Map;

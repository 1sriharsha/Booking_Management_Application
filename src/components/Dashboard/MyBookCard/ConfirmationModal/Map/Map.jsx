import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
const { REACT_APP_API_KEY } = process.env;

  const Map = ({ location, zoomLevel }) => (
    <div className="map">
      <h2 className="map-h2"></h2>
  
      <div className="google-map">
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
      </div>
    </div>
  )
  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

  export default Map
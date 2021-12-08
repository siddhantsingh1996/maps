import React, { useState, useEffect } from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import {
  Dialog,
  DialogContent,
  Button,
  InputBase,
  Box,
  makeStyles,
} from "@material-ui/core";
import { CallReceived, Room } from "@material-ui/icons";

import AutoComplete from "../autocomplete/AutoComplete";

const AnyReactComponent = ({ imgString }) => (
  <>
    <img src="./pointer.svg" alt="pointer" />
  </>
);

export default function Google({ open, setOpen, setLocation }) {
  const bounds = {
    nw: {
      lat: 50.01038826014866,
      lng: -118.6525866875,
    },
    se: {
      lat: 32.698335045970396,
      lng: -92.0217273125,
    },
  };

  const size = {
    width: 937, // Map width in pixels
    height: 552, // Map height in pixels
  };

  const { center, zoom } = fitBounds(bounds, size);

  const [value, setValue] = useState(null);

  const [position, setPosition] = useState({
    lat: center.lat, //28.7041,
    lng: center.lng, //77.1025,
    draggable: true,
    label: "Search...",
  });

  const handleClose = () => {
    setOpen(false);
    if (position.label !== "Search...") {
      setLocation(position.label);
      console.log("position", position.label);
    } else {
      setLocation("");
    }
  };

  const defaultProps = {
    center: {
      lat: position.lat /*10.99835602*/,
      lng: position.lng /*77.01502627*/,
    },
    zoom: 14,
  };

  

  
  
  const getGeoLocation = (add) => {
    geocodeByAddress(add)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setPosition((prev) => ({
          draggable: prev.draggable,
          lat: latLng.lat,
          lng: latLng.lng,
          label: value === null ?"Search...":value.label ,
        }));
        // update center state
        // setValue(prev=>prev.mapCenter=latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const reverseGeoCode = (cordinates) => {
    geocodeByLatLng(cordinates)
      .then((results) => {
       
        setValue({
          "label":results[0].formatted_address,
          "value": {
              "description": results[0].formatted_address,
              "matched_substrings": [
                  {
                      "length": 9,
                      "offset": 0
                  }
              ],
              "place_id": results[0].place_id,
              "reference": results[0].place_id,
             
              
              "types": [
                  "locality",
                  "political",
                  "geocode"
              ]
          }
        })


        setPosition((prev) => ({
          draggable: true,
          lat: prev.lat,
          lng: prev.lng,
          label: results[0].formatted_address,
        }));
      
       // getGeoLocation(results[0].formatted_address);
        console.log("result", results);
        //console.log("json",JSON.stringify(results))
      })
      .catch((error) => console.error(error));
  };

 

  const onDragEnd = (map) => {
    console.log("map",map);
    setPosition((prev) => ({
      draggable: false,
      lat: map.getBounds().getCenter().lat(),
      lng: map.getBounds().getCenter().lng(),
    }));
    reverseGeoCode({ lat: position.lat, lng: position.lng });
  };

  useEffect(() => {
    console.log("value",value);
    if (value !== null && position.draggable) {
      getGeoLocation(value.label);
    }
  }, [value]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ position: "relative", zIndex: "0" }}
      >
        <img
          src="./pointer.svg"
          style={{ zIndex: "2", position: "absolute", top: "276px", left: "50%" }}
          alt="pin"
        />
        <DialogContent /*style={{ height: "90vh", width: "90%" }}*/>
          {/*<AutoComplete/>*/}
          <div style={{ display: "flex" }}>
            <GooglePlacesAutocomplete
              input="Enter Location"
              minLength={2}
              autoFocus={false}
              returnKeyType={"default"}
              fetchDetails={true}
              apiKey="AIzaSyA3T6LdYPdZHJVfsiE4ebRsQaXM3xGwLMc"
              //value={value}

              selectProps={{
                value,
                onChange: setValue,
              }}
             
              style={{ zIndex: "1" }}

              /*onSelect={()=>handleSelect}*/
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                width: "126px",
                backgroundColor: "#E5A52F",
                color: "#fff",
                zIndex: "1",
                marginLeft: "46px",
              }}
              onClick={handleClose}
            >
              {" "}
              Done
            </div>
          </div>

          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA3T6LdYPdZHJVfsiE4ebRsQaXM3xGwLMc",
            }}
            defaultCenter={center}
            defaultZoom={defaultProps.zoom}
            onDragEnd={(map) => onDragEnd(map)}
            style={{ width: "937px", height: "552px" }}
            center={{ lat: position.lat, lng: position.lng }}
            options={{
              fullscreenControl: false,
              disableDefaultUI: true,
            }}

            //draggable={position.draggable}
           // onMouseMove={console.log("draggable")}
            //onMouseUp={console.log("mouse up")}
            //onMouseDown={console.log("mouse down")}
            //onChildClick={() => console.log("child click")}
            //onClick={onClickOnMap}
            //onCenterChanged={(e)=>getCenter(e)}
          >
            {/*<AnyReactComponent lat={position.lat} lng={position.lng} />*/}
          </GoogleMapReact>
        </DialogContent>
      </Dialog>
    </>
  );
}

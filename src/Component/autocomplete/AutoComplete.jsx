import React, { useState,useContext,useEffect } from "react";
import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng,geocodeByLatLng,geocodeByPlaceId} from "react-google-places-autocomplete";
import {
  Button,
  InputBase,
  Box,
 
} from "@material-ui/core";



export default function AutoComplete() {
  /*const [value, setValue] = useState({
          address:'',
          activeMarker:{},
          selectedPlace:{},
          mapCenter: {
            lat: 49.2827291,
            lng: -123.1207375
          }
  });*/

  const [value, setValue] = useState(null);


  /*const handleChange = (add) => {
      console.log("Add",add);
    setValue(prev=>prev.address=add)
  }

  const handleSelect = (add) => {
    console.log("Add",add);
    setValue(prev=>prev.address=add);
    geocodeByAddress(add)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        setValue(prev=>prev.mapCenter=latLng);
      })
      .catch(error => console.error('Error', error));
  }*/

  const getGeoLocation = (add) => {
     geocodeByAddress(add)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
        console.log('Success', latLng);
        return  JSON.stringify(latLng)
      // update center state
     // setValue(prev=>prev.mapCenter=latLng);
    })
    .catch(error => console.error('Error', error));
  }

  const reverseGeoCode = () => {
     geocodeByLatLng({ lat: 28.7041, lng: 77.1025 })
    .then(results => {
      console.log("json",JSON.stringify(results))
    })
    .catch(error => console.error(error));
  }

  const getGeoCodeByID = () => {
    geocodeByPlaceId('ChIJRcbZaklDXz4RYlEphFBu5r0')
    .then(results => {
      console.log("json",JSON.stringify(results))
    })
    .catch(error => console.error(error));
  }

  return (
    
    <div>
      {/*<Box style={{ display: "flex" }}>
        <InputBase
          placeholder="Search For location ..."
          inputProps={{ "aria-label": "search" }}
          style={{
            border: "2px solid #000",
            width: "50%",
            marginLeft: "27%",
            marginTop: "2%",
          }}
          onChange={()=>console.log("here it is changing")}
        />
        <Button
          variant="contained"
          style={{ height: "30px", marginTop: "14px" }}
        >
          Search
        </Button>
        </Box>*/}
    <GooglePlacesAutocomplete
        apiKey="AIzaSyA3T6LdYPdZHJVfsiE4ebRsQaXM3xGwLMc"
        //value={value}
        onChange={()=>console.log("changing")}
        selectProps={{
          value,
          onChange: setValue,
        }}
        /*onSelect={()=>handleSelect}*/
     />
 
    </div>
  );
}

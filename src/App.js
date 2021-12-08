import React, { useState } from "react";
import "./App.css";
import { Button, makeStyles } from "@material-ui/core";
import Google from "./Component/googleMaps/Google";

function App() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');

  const openLoginDialog = () => {
    setOpen(true);
  };

  const  truncate = (input) => {
    if (input.length > 5) {
       return input.substring(0, 12) + '...';
    }
    return input;
 };

  return (
    // Important! Always set the container height explicitly
    <div className="App">
      {/* <Button style={{backgroundColor:'#E5A52F',color:'#fff',height:'42px',width:'276px'}}  onClick={()=>openLoginDialog()}>Map</Button>*/}
      <div
        style={{
          backgroundColor: "#E5A52F",
          color: "#fff",
          height: "42px",
          width: "276px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointer:"cursor"
        }}
        onClick={()=>openLoginDialog()}
      >
        {location === ''?
        <>
        <span>Map Location</span>
        <img src="./forward.svg" style={{
           marginLeft: '55px'
        }} 
        alt="forward"/>
        </>:
        <span>{truncate(location)}</span>}

      </div>
      <Google open={open} setOpen={setOpen} setLocation={setLocation} />
    </div>
  );
}

export default App;

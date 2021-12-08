import React, { useState, createContext } from "react";

export const dataContext = createContext();


export const DataProvider = (props) => {
    const [data, setData] = useState({
          lable:'New Delhi',
          lat:28.7041,
          lng:77.1025,
          placeID:''
    });
  
    return (
      <dataContext.Provider value={[data, setData]}>
        {props.children}
      </dataContext.Provider>
    );
  };

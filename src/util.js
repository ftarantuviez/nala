import React from 'react'
import {Circle, Popup} from 'react-leaflet'


export const showDataOnMap = (data) => (
  data.map(country => (
    
        <Circle
            center={[country.paisData.coord.lat, country.paisData.coord.lon]}
            fillOpacity={0.4}
            color='#7dd71d'
            fillColor='#7dd71d'
            id={country.paisData.sys.id}
            radius={600}
        > 
            <Popup>
                <div className="info-container">
                    <div className="info-name">{country.nombre}</div>
                    <div className="info-name">{country.paisData.name}</div>
                </div>  
            </Popup>
        </Circle>
    ))
)



export const excelDateToJSDate = (seriall) => {
    let serial = seriall + 1
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    var date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let answer = ''

    if(month < 10){
        answer = `${day}/0${month}/${year}`
    }else{
        answer = `${day}/${month}/${year}`
    }
 
    return answer
 }

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
import React from 'react'
import {Circle, Popup} from 'react-leaflet'


export const showDataOnMap = (data) => (
  data.map(country => (
        <Circle
            center={[country.countryData.latitude, country.countryData.longitude]}
            fillOpacity={0.4}
            color='#7dd71d'
            fillColor='#7dd71d'
            id={country.id}
            radius={120000}
        > 
            <Popup>
                <div className="info-container">
                <div className="info-flag" style={{backgroundImage: `url(${country.image})`}}></div>
                    <div className="info-name">{country.name}</div>
                    <div className="info-cases">Pais: {country.countryData.name}</div>
                    <div className="info-cases">Sueldo: {country.countryData.sueldo}</div>
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

/* TO PROOBE REAL .XLSX FORMAT */
export const validateFormat = (array) =>{
    const filt = array.filter(a => (a['Mes'] && a['Nombre'] && a['ID'] && a['Fecha de ingreso'] && a['Sueldo bruto'] && a['División']) && a['Area'] && a['Subarea'] && a['ID Lider'] && a['Nivel Jerárquico'] && a['Pais'] && a['Foto'])

    if(filt.length === array.length) return true
    else return false
}
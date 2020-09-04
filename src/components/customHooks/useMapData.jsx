import React, {useState, useEffect} from 'react'
import {showDataOnMap} from '../../util'

const API_KEY = '1650a6d758f7faf28488e5c529dcf0c4'

function useMapData(allEmployes){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        let employes = []
        const fetchData = (name, salary, country) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    employes.push({nombre: name, salario: salary, paisData: data})
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    alert('Something went wrong :(')
                    setLoading(false)
                })
        }

        allEmployes.map(e => {
            fetchData(e['Nombre '], e['Sueldo bruto'], e["Pais"])
        })

        setData(employes)
        
    }, [allEmployes])
    
    return {data, loading}
}



export default useMapData
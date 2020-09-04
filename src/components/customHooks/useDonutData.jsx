import React, {useState, useEffect} from 'react'
import {getRandomColor} from '../../util'

/********** TO GET AND FILTER DONUT DATA*****************/  

function useDonutData(allEmployes) {
    const [labelsDonut, setLabelsDonut] = useState([])
    const [colorsDonut, setColorsDonut] = useState([])
    const [salariesDonut, setSalariesDonut] = useState([])

    useEffect(() => {
        let labels = []
        allEmployes.map(e => {
            if(!labels.find(ev => ev === e['Area'])){
                labels.push(e['Area'])
                setLabelsDonut(labels)
            } 
        })
    }, [allEmployes])

    useEffect(() => {
        let total = 0
        let salaries = []
        let colors = []
        labelsDonut.map(e => {
            allEmployes.map(ev => {
                if(ev['Area'] === e){
                    total += ev['Sueldo bruto']
                }
            })
            salaries.push(total)
            colors.push(getRandomColor())
        })

        setSalariesDonut(salaries)
        setColorsDonut(colors)

    }, [labelsDonut])


    return {
        labels: labelsDonut,
        datasets: [{
            data: salariesDonut,
            backgroundColor: colorsDonut,
            hoverBackgroundColor: colorsDonut
        }]
    }
}


export default useDonutData
import React, {useEffect, useState} from 'react'
import {excelDateToJSDate} from '../../util'


function useLastChartData(data, allEmployes){
    let ans = []
    const [dates, setDates] = useState([])
    const [salaries, setSalaries] = useState([])

    useEffect(() => {
        data.map(e => {
            if(ans.indexOf(excelDateToJSDate(e['Mes'])) === -1){
                ans.push(excelDateToJSDate(e['Mes']))
            }
        })
        setDates(ans.sort())
        console.log(ans.sort())
    }, [data])
    
    useEffect(() => {
        let ans2 = []
        dates.map(date => {
            let total = 0
            data.map(e =>{
                if(date === excelDateToJSDate(e['Mes'])){
                    total += e['Sueldo bruto']
                }
            })
            ans2.push(total)
        })
        setSalaries(ans2)

    }, [dates])

    return {salaries, dates}
}


export default useLastChartData
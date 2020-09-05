import React, {useState, useEffect} from 'react'
import { excelDateToJSDate } from '../../util'


/* SET DATA OF FIRST CHART --- COMPARE ALL SALARIES OF ALL MONTHS OF ALL EMPLOYEES */
function useFirstChartData(data, allEmployes){
    let ans = []
    let ans2 = []
    const [employes, setEmployes] = useState([])
    const [answer, setAnswer] = useState([])

    useEffect(() => {
         allEmployes.map((e) => {
           ans.push(data.filter(ev => e['ID'] === ev['ID']))
           setEmployes(ans)
         })
    }, [data, allEmployes])

    useEffect(() => {
      employes.map(e => {
        ans2.push({nombre: e[0]['Nombre'], id: e[0]['ID'], salario: e.map(ev => ev['Sueldo bruto']), mes: e.map(ev => excelDateToJSDate(ev['Mes']))})
        setAnswer(ans2)
    })
    }, [employes])


    return answer
}


export default useFirstChartData
import React, {useState, useEffect} from 'react';
import { useStyles } from './styles';
import {Bar} from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography} from '@material-ui/core';
import {db} from '../../firebase'
import {excelDateToJSDate} from '../../util'

export default function Profile({id, uid, sheetId}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [infoEmployee, setInfoEmployee] = useState([])
  const [loading, setLoading] = useState(true)

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
      if(uid){
        db.collection('users').doc(uid).collection('sheets').doc(sheetId)
        .collection('data').orderBy('Mes', 'desc').where('ID', '==', id)
        .get()
        .then(e => {
          setInfoEmployee(e.docs.map(doc => ({data: doc.data(), sueldo: doc.data()['Sueldo bruto'],fechaIngreso: excelDateToJSDate(doc.data()['Fecha de ingreso']).toString(), mes: excelDateToJSDate(doc.data()['Mes']).toString() })))
          setLoading(false)
        })
        .catch(e => {
          alert('Something went wrong :(')
          console.log(e)
          setLoading(false)
        })
      }

  }, [uid, id, sheetId])

  console.log(infoEmployee.map(e => e.sueldo).reverse())
  return (
      <>
    <Paper className={classes.rootTabs}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Informacion personal" />
        <Tab label="Salario" />
      </Tabs>
    </Paper>

    <Card className={classes.rootCard}>
      {
        loading
        ? <CircularProgress />
        : value === 0
            ? (
                <>
                    <Avatar className={classes.avatar} alt={infoEmployee.length > 0 ? infoEmployee[0].data['Nombre'] : ''} src={infoEmployee.length > 0 ? infoEmployee[0].data['Foto'] : ''} />
                    <Typography className={classes.persInfo}><strong>Nombre: </strong>{infoEmployee.length > 0 ? infoEmployee[0].data['Nombre'] : ''} </Typography>
                    <Typography className={classes.persInfo}><strong>Cargo: </strong>{infoEmployee.length > 0 ? infoEmployee[0].data['Nivel Jerárquico'] : ''}</Typography>
                    <Typography className={classes.persInfo}><strong>Salario actual: </strong>$ {infoEmployee.length > 0 ? infoEmployee[0].sueldo : ''} </Typography>
                    <Typography className={classes.persInfo}><strong>Area: </strong>{infoEmployee.length > 0 ? infoEmployee[0].data['Area'] : ''} </Typography>
                    <Typography className={classes.persInfo}><strong>Pais: </strong>{infoEmployee.length > 0 ? infoEmployee[0].data['Pais'] : ''} </Typography>
                    <Typography className={classes.persInfo}><strong>Fecha de ingreso: </strong>{infoEmployee.length > 0 ? infoEmployee[0].fechaIngreso : ''} </Typography>
                </>
            ) : (
                <Bar
                    data={{
                      labels: infoEmployee.map(e => e.mes).reverse(),
                      datasets: [{
                        label: 'Salario Por Mes',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: infoEmployee.map(e => e.sueldo).reverse()
                      }]
                    }}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            )
      }
    </Card>
    </>
  );
}

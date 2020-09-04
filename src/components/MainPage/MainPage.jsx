import React, { useEffect, useState } from 'react'

import {Paper, Grid, List, ListItem, IconButton, ListItemAvatar, Avatar, Typography,ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import {useStyles} from './styles'
import {Doughnut, Bar, Line} from 'react-chartjs-2'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import PersonIcon from '@material-ui/icons/Person';
import {showDataOnMap, getRandomColor} from '../../util'
import {Link} from 'react-router-dom'


import useDonutData from '../customHooks/useDonutData'
import useMapData from '../customHooks/useMapData'
import useFirstChartData from '../customHooks/useFirstChartData'
import useLastChartData from '../customHooks/useLastChartData'



/* DONUT CONFIGURATION */
const optionsDonut = {
    legend: { 
         labels: { 
             fontColor: 'white'
        },
    }
}
/* DONUT CONFIGURATION */


function MainPage({data, allEmployes}) {
    const classes = useStyles()
    const donutData = useDonutData(allEmployes)
    const mapData = useMapData(allEmployes)

    const firstChartData = useFirstChartData(data, allEmployes)
    const [dataChart, setDataChart] = useState([])
    const [labelsChart, setLabelsChart] = useState([])

    const lastChartData = useLastChartData(data, allEmployes)
    

    useEffect(() => {
        let resData = []
        let resLabels = []
        firstChartData.map(employe => {
            resData.push({
                label: employe.nombre,
                fill: false,
                borderColor: getRandomColor(),
                data: employe.salario.sort(),
            })
            resLabels.push(employe.mes.sort())
        })

        setDataChart(resData)
        setLabelsChart(resLabels)

    }, [firstChartData])


    return (
            <Grid container className={classes.container} spacing={3}>

                {/* FIRST CHART --- ALL SALARIES */}
                <Grid item xs={12} >
                <div style={{width: '100%', height: '100%'}}>
                <Paper className={classes.paper}>
                        <Bar
                            data={{
                                labels: lastChartData.dates,
                                datasets: [
                                  {
                                    label: 'Sueldo por mes',
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: lastChartData.salaries
                                  }
                                ]
                              }}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                            />
                    </Paper>
                </div>
                </Grid>
                {/* FIRST CHART --- ALL SALARIES */}


                {/* MAP */}
                <Grid item xs={12} md={8}>
                    <Paper className={`${classes.paper} map`}>
                        {
                            mapData.loading
                            ? 'Loading'
                            : mapData.data.length > 0 && (
                                <LeafletMap center={{lat: 34.80746, lng: -40.4796}} zoom={2}>
                                    <TileLayer 
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap </a>'
                                    />
                                    {setTimeout(() => showDataOnMap(mapData.data), 2000)}
                                    {!mapData.loading && showDataOnMap(mapData.data)}
                                </LeafletMap>
                            )
                        }    
                    </Paper>
                </Grid>
                {/* MAP */}


                {/* LIST OF ALL PERSONS */}
                <Grid item xs={12} md={4} style={{position: 'relative'}}>
                    <Paper className={classes.paperList}> 
                         <Typography variant="h6" className={classes.title}>
                            Personas 
                         </Typography>
                        <List dense className={classes.listEmployes}>
                            {allEmployes.map((value) => {
                                return (
                                <Link to={`/trabajador/${value['ID']}`} key={value['ID']}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                        <Avatar
                                            alt={value['Nombre ']}
                                            src={value['Foto']}
                                        />
                                        </ListItemAvatar>
                                        <ListItemText primary={value['Nombre ']} />
                                        <ListItemSecondaryAction>
                                            <PersonIcon />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Link>
                                );
                            })}
                            </List>
                    </Paper>
                </Grid>
                {/* LIST OF ALL PERSONS */}


                {/* CHART DONNUT --- SALARIES PER AREA */}
                <Grid item xs={12} md={8}>
                <div style={{width: '100%', height: '100%'}}>
                    <Paper className={classes.paperDonut}>
                        <Typography variant="h5" className={classes.titleDonut}>
                            Total salarios por area
                        </Typography>
                        <Doughnut data={donutData}
                                  options={optionsDonut}
                        />
                    </Paper>
                </div>
                </Grid>
                {/* CHART DONNUT --- SALARIES PER AREA */}


                {/* FINAL CHART --- ALL SALARIES */}
                <Grid item xs={12}>
                    <Paper className={classes.paperFirstChart}>
                        <div style={{width: '100%', height: '100%'}}>
                            <Line data={{
                                    labels: labelsChart[0],
                                    datasets: dataChart
                                }}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Salarios por mes'
                                    },
                                    maintainAspectRatio: false 
                            }}
                             />

                        </div>
                    </Paper>
                </Grid>
                {/* FINAL CHART --- ALL SALARIES */}


            </Grid>
    )
}

export default MainPage

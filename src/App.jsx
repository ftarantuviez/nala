import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import XLSX from 'xlsx'
import 'leaflet/dist/leaflet.css'

import NavBar from './components/NavBar/NavBar'
import MainPage from './components/MainPage/MainPage'
import Profile from './components/EmployeProfile/Profile'
import Tree from './components/Tree/Tree'
import {Layout} from './components/Layout/Layout'

import {Button,Backdrop, CircularProgress, Typography} from '@material-ui/core'
import {auth, db} from './firebase'

function App() {
  const [data, setData] = useState([])
  const [isUser, setIsUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [sheetId, setSheetId] = useState('')
  const [openList, setOpenList] = useState(window.innerWidth > 900 ? true : false)
  
  const all = []
  const [allEmployes, setAllEmployes] = useState([])

  /* Listening auth change */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        setIsUser(authUser)
      }
      else setIsUser(null)
    })
    setLoading(false)
    return () => unsubscribe()

  }, [isUser])


  /* Bringing all employees from DB */

  useEffect(() => {
    const dataSorted = data.sort(function (a, b) {
      return a['Mes'] - b['Mes'];
    })

    dataSorted.reverse().forEach(employee => {
      const employeeAlreadyUse = all.find(e => e['ID'] === employee['ID'])
      if(!employeeAlreadyUse){
        all.push(employee)
        setAllEmployes(all)
      }
    })
  }, [data])
  
  

  const handleInputChange = (event) => {
    setLoading(true)
    let selectedFile = event.target.files[0]
    if(selectedFile){
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event)=>{
       let data = event.target.result;
       let workbook = XLSX.read(data,{type:"binary"});
       workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            setData(rowObject);

            db.collection('users').doc(isUser.uid).collection('sheets').add({name: selectedFile.name})
            .then(e => {
                setSheetId(e.id)
                rowObject.forEach(doc => {
                  db.collection('users').doc(isUser.uid).collection('sheets').doc(e.id)
                  .collection('data').add(doc)
                  .then(() => {
                    setLoading(false)
                  })
                })
            })
            .catch(e => {
              alert('Something went wrong :(', e.message)
              console.log(e)
              setLoading(false)
            })
          });
        }
    }
}

  const handleClick = (idSheet, add) => {
    if(add){
      setData([])
    } else {
      setLoading(true)
      setSheetId(idSheet)
      db.collection('users').doc(isUser.uid).collection('sheets')
      .doc(idSheet).collection('data')
      .onSnapshot(snapshot => {
        setData(snapshot.docs.map(doc => doc.data()))
        setLoading(false)
      })
    }
  }

  const handleDelete = (idSheet) => {
    setLoading(true)
    db.collection('users').doc(isUser.uid).collection('sheets')
    .doc(idSheet).delete()
    .then(() => {
      setLoading(false)
    })
    .catch((e) => {
      setLoading(false)
      alert('Something went wrong :(')
      console.log(e)

    })
  }
  
  return (
    <div className="app">
      {
        isUser 
        ? (
          <>
            <Router>
              <NavBar isUser={isUser} setOpenList={setOpenList} openList={openList} />
              <Layout openList={openList} setOpenList={setOpenList} uid={isUser.uid} handleClick={handleClick} handleDelete={handleDelete}>
                {
                  data.length > 0
                  ? (
                    <Switch>
                      <Route exact path="/">
                          <MainPage data={data} allEmployes={allEmployes}/>
                      </Route>
                      <Route exact path="/organigram">
                          <Tree allEmployes={allEmployes} setLoading={setLoading} />
                      </Route>
                      {
                        allEmployes.map(employee => (
                          <Route exact path={`/trabajador/${employee['ID']}`} key={employee['ID']}>
                            <Profile id={employee['ID']} uid={isUser.uid} sheetId={sheetId} />
                          </Route>
                        ))
                      }
                      <Route>
                        <h1>404</h1>
                      </Route>
                    </Switch>

                  ) : (
                    <div className='inputFileContainer' style={{marginTop: 'calc(50vh - 104px)', textAlign: 'center'}}> 
                        <input
                          accept=""
                          className='inputFile'
                          id="contained-button-file"
                          multiple
                          onChange={handleInputChange}
                          type="file"
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" color="primary" component="span">
                              Upload excel
                          </Button>
                        </label>
                    </div>
                  )
                }
              </Layout>
            </Router>
          </>
        )
      : (
        <>
          <NavBar isUser={isUser} />
          <Typography component='h1' style={{marginTop: '50vh', marginLeft: '50vw'}}>
            Inicia sesion para poder cargar plantillas
          </Typography>
        </>
      )
      }


      <Backdrop style={{zIndex: '10000', color: 'white'}} open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}


export default App;

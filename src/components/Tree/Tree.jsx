import React, { useEffect, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';


function Tree({allEmployes, setLoading}){
  const divRef = React.createRef();
  const [nodes, setNodes] = useState([])
     
  useEffect(() => {
    OrgChart.templates.mila.defs = '<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path fill="#aeaeae" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#039BE5" /></marker>';
    OrgChart.templates.mila.link = '<path marker-start="url(#dotBlue)" marker-end="url(#arrow)"   stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />';
    OrgChart.templates.mila.link_field_0 = '<text text-anchor="middle" fill="#039BE5" width="290" x="0" y="0" style="font-size:12px;">{val}</text>';

    const chart = new OrgChart(divRef.current , {
      template: "mila",
      nodeBinding: {
          field_0: "Name",
          field_1: "Title",
          img_0: "img"
      },
      linkBinding: {
          link_field_0: "Salary"
      },
      nodes: nodes    
  });

    setLoading(false)
  }, [nodes])

  useEffect(() => {
    setLoading(true)
    let res = []
    allEmployes.map(e => {
      res.push({id: e['ID'], pid: e['ID Lider'], Name: e['Nombre'], Salario: e['Sueldo bruto'], Title: e['Nivel Jerárquico'], img: e['Foto']})
    })

    setNodes(res)

  }, [allEmployes])
  
    return (
         <div id="tree" ref={divRef}></div>
    );
}


export default Tree
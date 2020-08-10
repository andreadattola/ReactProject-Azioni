import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line,Tooltip,Legend,ReferenceLine } from 'recharts';
function Grafico({ datiStock }) {
    console.log(datiStock);
    return (
        <div className="grafico">
            <LineChart width={600} height={300} data={datiStock} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {/* <Line type="monotone" dataKey="datetime" stroke="#8884d8" /> */}
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                <XAxis dataKey="datetime" />
                <YAxis  domain={[
                    dataMin => ((dataMin - dataMin*10/100).toFixed(2)),
                    dataMax => ((dataMax + dataMax*10/100).toFixed(2))
                ]} />
                <CartesianGrid strokeDasharray="3 3" />
                 <Tooltip />
                 <Legend/>
                <ReferenceLine y ={2500} label='' stroke = 'red'/>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default Grafico;

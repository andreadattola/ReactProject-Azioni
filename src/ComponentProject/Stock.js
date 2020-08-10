import React, { useState, useEffect, useRef } from 'react'
import Grafico from './Grafico'
import './css/stock.css'


export default function Stock({ indice, datiEle, eliminoStock, currentPrice }) {
    const [dataTrade, setDataTrade] = useState('XXXX-XX-XX 16:00:00');
    const [prezzoDifferenza, setPrezzoDifferenza] = useState()
    const [prezzoOpen, setPrezzoOpen] = useState();
    const [checkedValue, setCheckedValue] = useState(false)
    const [showGrafico, setShowGrafico] = useState(false);
    const [datiGrafico, setDatiGrafico] = useState([{ datetime: '16:00:00', price: datiEle.price }])
    var intervalRef = useRef();
    const getNewPrice = (str) => {
        const apiUrl = 'https://api.marketstack.com/v1/intraday/latest?access_key=bcada3514e78f58617b39dc201d49b0a&symbols=' + str + '&interval=15min&limit=1';
        let res = fetch(apiUrl).then(ele => ele.json());
        res.then((ele) => {
            const { data } = ele;
            const timeprice = Object.entries(data)[0];
            console.log('timeprice 1 ', (timeprice))
            setDataTrade(timeprice[1].date);
            setPrezzoOpen(timeprice[1].open);
            setDatiGrafico([...datiGrafico,
               timeprice[1].date?
                {datetime:timeprice[1].date.substring(11,19) , price:timeprice[1].last} :
                 {datetime:0 , price:0 }]);
           /*  setDatiGrafico(grafic) */

        })
    }
    useEffect(() => {
        getNewPrice(datiEle.symbol)
        console.log('useeffect che chiama get newprice')
        setPrezzoDifferenza(datiEle.price)
    },[])


    const diff = (prezzoDifferenza - datiEle.price).toFixed(2);
    const diffPercent = (datiEle.price) ?
        (diff / datiEle.price * 100).toFixed(1) : '-';

    const eliminoAzione = () => {
        eliminoStock(datiEle.id)
    }
    const startTimer = () => {
        console.log('start time, + checked value? ', checkedValue)
        const idTimer = setInterval(() => {
            console.log('dentro start time', checkedValue)
            getNewPrice(datiEle.symbol)
        }, 1500)
        intervalRef.current = idTimer;
    }
    const toggleRealTime = () => {
        setCheckedValue(!checkedValue);
    }
    const deleteTimer = () => {
        console.log('delete time, + checked value? ', checkedValue)
        clearInterval(intervalRef.current);
    }
    useEffect(() => {
        !checkedValue && deleteTimer();
        checkedValue && startTimer();
        console.log('useEffect checked value')
    }, [checkedValue])
    const showComponentGrafico = () => {
        setShowGrafico(!showGrafico);
    }
    return (

        <div className="col-md-6 stock mb-2">
            <div className="bodystock m-1 p-3 ">
                <div className="row">

                    <div className="col-sm">
                        <h5>{datiEle.symbol}</h5>
                        <p>Nasdaq</p>
                    </div>
                    <div className="col-sm">
                        <h5 className="h2-quotazione">{datiEle? datiEle.price : 'wait for price'}</h5>
                        <p>{dataTrade ? dataTrade.substring(0, 10) : 'not pervenuta'}</p>
                        <p>{dataTrade ? dataTrade.substring(11) : 'not pervenuta'}</p>

                    </div>
                    <div className="col-sm">
                        <h2>{diff}</h2>
                        <p>{diffPercent}  %</p>
                    </div>
                    <div className="col-sm">
                        <h2 onClick={showComponentGrafico} > <i className="fas fa-chart-line  fa-2x"></i></h2>
                    </div>
                    <label className="bs-switch">
                        <input checked={checkedValue} onChange={toggleRealTime} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                    <div onClick={eliminoAzione} className="delete-div">
                        <span className="delete"></span>
                    </div>
                </div>
            </div>
            <div className="bodyGrafico">
                <div className="row">
                    <div className="col">
                        {  showGrafico?  <Grafico  datiStock={datiGrafico} ></Grafico> :'' }
                    </div>
                </div>
            </div>
        </div>
    )
}
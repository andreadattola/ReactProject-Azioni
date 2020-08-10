import React, { useState, useEffect } from 'react'
import Cerca from './ComponentProject/Cerca'
import NomeStock from './ComponentProject/NomeStock'
import Stock from './ComponentProject/Stock'
import './App.css'
export default function App2() {
    const [counter, setCounter] = useState(0)
    const [valoreCerca, setValoreCerca] = useState();
    const [simboloAzione, setSimboloAzione] = useState([]);
    const [fetch2, setFetch2] = useState([])
    const [caricamento, setCaricamento] = useState(false);
    const [messaggioErrore, SetMessaggioErrore] = useState('Non è stato possibile richiamare i dati a causa ');
    const [errore, setErrore] = useState(false);
    const [nessunaCorrsipondenza, setNessunaCorrsipondenza] = useState(true);
    const [preferiti, setPreferiti] = useState([]);
    const [contaPreferiti, setContaPreferiti] = useState(0);
    const [numero, setNumero] = useState(-1)


    const getDati = async (str) => {
        setFetch2([]);
        setCaricamento(true);
        setErrore(false);
        setNessunaCorrsipondenza(false);
        setSimboloAzione([]);
        const apiUrl2 = 'https://www.worldtradingdata.com/api/v1/stock_search?search_term=' + str + '&search_by=symbol,name&limit=50&page=1&api_token=OCQiyioLhQrVqG464JmXB8A2MTNBrYbIUsNtLolLj3EDsvhSWNRl96Lt86ov';
        const apiUrl = 'http://api.marketstack.com/v1/tickers?access_key=bcada3514e78f58617b39dc201d49b0a&search=' + str + '&limit=5 '
        let x = await fetch(apiUrl).then(ele => ele.json())
        x.data.length < 1 && setCaricamento(false);
        const data = x.data
        x.data.map((ele, i) => {
            prelevaPrezzo(ele.symbol)
            //sarebbe const data = ele.data
            setSimboloAzione(prev => data);
            setNessunaCorrsipondenza(true)
            setCaricamento(false)
        })

        /*             .catch((error) => {
                        console.log('fetch failed', error)
                        setCaricamento(false);
                        setErrore(true);
                        SetMessaggioErrore(messaggioErrore + (error))
                    }) */
        setNumero(numero => numero + 1)
    }

    useEffect(() => {
        (counter > 0) && getDati(valoreCerca)
        setCounter(x => counter + 1);

    }, [valoreCerca])



    const salvaValoreCerca = (e) => {

        setValoreCerca(x => e)
    }
    const prelevaPrezzo = (str) => {
        
        let arrVl = [];
        const apiPrezzo = 'https://api.marketstack.com/v1/intraday?access_key=bcada3514e78f58617b39dc201d49b0a&symbols=' + str + '';
        let y = fetch(apiPrezzo).then(ele => ele.json())
        y.then((ele) => {

            (ele.data.length != 0) ?
                arrVl['prezzo'] = ele.data[0].last :
                arrVl['prezzo'] = 'undef';
            arrVl['simbolo'] = str;
            setFetch2(fetch2 => fetch2.concat({ simbolo: arrVl['simbolo'], prezzo: arrVl['prezzo'] }))

        })
    }
    const onAddPreferiti = (azione) => {
        var controllore = false;
        const newstock = simboloAzione[azione];
        fetch2.map((ele, i) => {
            (newstock.symbol == ele.simbolo) ? newstock['price'] = fetch2[i].prezzo : console.log('another')
        })
        //newstock['price'] = fetch2[azione]
        newstock['id'] = contaPreferiti;
        let preferiti2 = preferiti;
        preferiti2.map((ele, i) => {
            if (ele.symbol == newstock.symbol) {
                return controllore = true
            }
        })
        !controllore && setPreferiti(preferiti => [...preferiti2, newstock], { cont: contaPreferiti })
        setContaPreferiti(X => contaPreferiti + 1)

    }
    const eliminoStock = (id) => {
        const elePreferiti = preferiti.filter(ele => {
            return ele.id !== id
        });
        setPreferiti(elePreferiti);
    }
    return (
        <div className='App container-fluid text-center'>
            <Cerca valueCerca={salvaValoreCerca}></Cerca>
            <div className="container mt-3">
                {(errore) && <p>{messaggioErrore} </p>}

                {((simboloAzione.length == 0) && (!caricamento)) ? <p>Nessuna corrispondenza</p> : ''}
                {!caricamento &&


                    <div className="row">
                        {simboloAzione.map((ele, i) => {
                            return <NomeStock nome={ele.nome}
                                simbolo={ele.symbol}
                                indice={i}
                                onAddPreferiti={onAddPreferiti}
                            >
                            </NomeStock>
                        })}
                    </div>
                }
                {caricamento && <p className="loading">Loading condition</p>}
                <div className="row">

                    { simboloAzione.length !== fetch2.length ? <p className="loading"> Loading Price wait </p> :
                    preferiti.map((ele, i) => {
                        return <Stock indice={i}
                            datiEle={ele}
                            eliminoStock={eliminoStock}
                        ></Stock>

                    })}
                </div>
            </div>
        </div>)

}

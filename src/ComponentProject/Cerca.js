
import React, { useState } from 'react'

function Cerca({ valueCerca }) {
    const [cerca, setCerca] = useState('')
    const aggiornaCerca = (e) => {
        console.log(e.target.value)
        var valueCerca = e.target.value
        setCerca(x => valueCerca)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        valueCerca(cerca)
        setCerca(x => '')
    }
    const levaFocus = (e) => {
        e.target.blur();
    }
    return (/*  */
        <div className="row my-3">
            <div className="col-4">
                <form className="form-inline" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="cerca.."
                            onChange={aggiornaCerca}
                            value={cerca}
                            name='cerca'
                            className='form-control mb-4 mr-sm-2' />
                    </div>
                    <button type='submit'
                        onFocus={levaFocus}
                        className='btn btn-outline-warning mb-4 mr-sm-2'>
                        Search</button>
                </form>
            </div>
        </div>

    )
}

export default Cerca

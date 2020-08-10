import React from 'react'
import './css/nomestock.css'

function NomeStock({ simbolo, nome, indice, onAddPreferiti }) {
    const addPreferiti = (e) => {
        onAddPreferiti(e.target.id)
    }
    return (
        <div id={indice} onClick={addPreferiti} className="nomestock">
            <i id={indice} className="fas fa-plus-circle"></i>
            {simbolo}-{nome}

        </div>
    )
}

export default NomeStock

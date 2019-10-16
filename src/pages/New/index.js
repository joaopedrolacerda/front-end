import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'
export default function New({ history }) {
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrices] = useState('')
    const [thumbnail, setThumbnail] = useState(null);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])
    async function handlSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handlSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="select img" />
            </label>
            <label htmlFor="company"> EMPRESA *</label>
            <input
                id="company"
                placeholder="sua empresa Incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="company"> Tecnologias *<span>(separadas por virgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam ?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="company"> VALOR DA DIÁRIA *<span>(em branco para gratuito)</span></label>
            <input
                id="price"
                placeholder="valor cobrado por dia ?"
                value={price}
                onChange={event => setPrices(event.target.value)}
            />
            <button type="submit" className="btn"> CADASTRAR</button>
        </form>
    )
}
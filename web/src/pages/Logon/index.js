import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

function Logon() {
    const history = useHistory();
    const [id, setId] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        api.post('sessions', { id }).then((response) => {
            if (response.data.name != null){
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile');   
            }
        }).catch((_) => {
            alert('Falha no login.\nPor favor, tente novamente.');
        });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua Id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size="16" color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;
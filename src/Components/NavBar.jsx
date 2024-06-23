import React, { Fragment, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Movies from './Movies';
import Series from './Series';
import Popular from './Popular';
import Terror from './Terror';
import Pricing from './Pricing';
import '../Styles/NavBarStyle.css';

export const Container = React.createContext();

function NavBar() {
    const [toggle, setToggle] = useState(true);
    const [inputValue, setInputValue] = useState('');
    
return (
    <Container.Provider value={{ toggle, inputValue }}>
        <Fragment>
            <nav className={toggle ? 'nav-dark' : 'nav-light'}>
                <div className='nav-options'>
                    <h1 id={toggle ? 'heading-dark' : 'heading-light'}>WISHPELIS</h1>
                    <NavLink to="/" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9800' }; }}>
                        <span id={toggle ? 'link-dark' : 'link-light'}>Movies</span>
                    </NavLink>
                    <NavLink to="/Series" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9800' }; }}>
                        <span id={toggle ? 'link-dark' : 'link-light'}>Series</span>
                    </NavLink>
                    <NavLink to="/Popular" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9800' }; }}>
                        <span id={toggle ? 'link-dark' : 'link-light'}>Popular</span>
                    </NavLink>
                    <NavLink to="/Terror" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9800' }; }}>
                        <span id={toggle ? 'link-dark' : 'link-light'}>Terror</span>
                    </NavLink>
                    <NavLink to="/Pricing" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9800' }; }}>
                        <span id={toggle ? 'link-dark' : 'link-light'}>Pricing</span>
                    </NavLink>
                </div>
                <div className='input-group'>
                    <div className="group">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className={`search-icon ${toggle ? 'search-icon-dark' : 'search-icon-light'}`}>
                            <g>
                                <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                ></path>
                            </g>
                        </svg>
                        <input 
                            id="query"
                            className={`input ${toggle ? 'input-dark' : 'input-light'}`}
                            type="search"
                            placeholder="Search..."
                            name="searchbar"
                            onChange={(e) => setInputValue(e.target.value)} 
                        />
                    </div>
                    <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
                        <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
                    </div>
                </div>
            </nav>
            
            <Routes>
                <Route path='/' element={<Movies />} />
                <Route path='Series' element={<Series />} />
                <Route path='Popular' element={<Popular />} />
                <Route path='Terror' element={<Terror />} />
                <Route path='Pricing' element={<Pricing />} />
            </Routes>
        </Fragment>
    </Container.Provider>
)
}

export default NavBar;
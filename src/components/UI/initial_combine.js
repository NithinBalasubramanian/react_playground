import React from 'react'
import Navbar from './navbar';
import Medianav from './medianav';
import About from './about';
import Tolearn from './tolearn';

function Initial_combine() {
    return (
        <div>
            <Navbar />
            <Medianav />
            <About />
            <Tolearn />
        </div>
    )
}

export default Initial_combine;

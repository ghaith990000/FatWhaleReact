import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Root() {
    return (
        <div>
            
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
};

  
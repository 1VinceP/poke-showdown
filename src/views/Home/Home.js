import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div>
            <Link to='/teams'><button>To Team Page</button></Link>
            <Link to='/game'><button>To Game</button></Link>
        </div>
    )
}
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Teams from './views/Team/Teams';
import Game from './views/Game/Game';

export default (
    <Switch>

        <Route exact path='/' component={Home} />
        <Route path='/teams' component={Teams} />
        <Route path='/game' component={Game} />

    </Switch>
)
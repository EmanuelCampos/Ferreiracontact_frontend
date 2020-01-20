import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from './Pages/Main'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </BrowserRouter>
  )
}


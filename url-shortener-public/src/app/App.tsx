import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";
import MainPage from '../pages/main';
import ShortcutRedirect from '../pages/shortCutRedirect'

export default class App extends React.Component<any> {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exec path="/:shortcut" component={ShortcutRedirect} />
      </Switch>
    </BrowserRouter>;
  }
}
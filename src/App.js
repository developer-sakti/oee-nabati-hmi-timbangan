import React, { useReducer, useEffect } from 'react';
import Header from './components/header';
import Column from './components/column';
import Content from './components/content';
import { Context, Reducer, Store } from './context/reducers';
import moment from 'moment-timezone';
import api from './helpers/api';

const App = () => {
  const [store, dispatch] = useReducer(Reducer, Store);

  const auth = () => {
    api.API_MAIN.post('auth/login', {
      "username": "operator",
      "password": "operator",
      "roleId": 2
    }).then(res => {
      localStorage.setItem('token', res.data.accessToken)
    
      getMachines();
      getLines();
      getCategories(res.data.accessToken);
      getShift();
      getHistory(res.data.accessToken);
    }).catch(err => {
      console.error(err)
    });
  }

  const getHistory = (token) => {
    api.API_MAIN.get(`badstock/timbangan/history?date=${moment().format('YYYY-MM-DD')}`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(res => dispatch({ type: 'set_histories', value: res.data }))
      .catch(err => console.error(err));
  }

  const getMachines = () => {
    api.API_MAIN.get('machine')
      .then(res => dispatch({ type: 'set_machines', value: res.data }))
      .catch(err => console.error(err));
  };

  const getShift = () => {
    api.API_MAIN.get('initial-shift')
      .then(res => dispatch({ type: 'set_shifts', value: res.data }))
      .catch(err => console.error(err))
  }

  const getLines = () => {
    api.API_MAIN.get('line')
      .then(res => dispatch({ type: 'set_lines', value: res.data }))
      .catch(err => console.error(err))
  };

  const getCategories = (token) => {
    api.API_MAIN.get('badstock-category', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(res => dispatch({ type: 'set_categories', value: res.data }))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    let time = setInterval(() => dispatch({ type: 'set_time', value: moment().format(`HH:mm:ss`) }), 1000);
    let connection = setInterval(() => {
      api.API_MAIN.get('line')
        .then(() => dispatch({ type: 'set_connection', value: true }))
        .catch(() => dispatch({ type: 'set_connection', value: false }))
      getHistory(localStorage.getItem('token'));
    }, 5000);

    if (!localStorage.getItem('token')) {
      auth();
    } else {
      getMachines();
      getLines();
      getCategories(localStorage.getItem('token'));
      getShift();
      getHistory(localStorage.getItem('token'));
    }

    return () => {
      clearInterval(time);
      clearInterval(connection);
      time = connection = null;
    };
  }, [])

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Header/>
      <Column/>
      <Content/>
    </Context.Provider>
  );
}

export default App;

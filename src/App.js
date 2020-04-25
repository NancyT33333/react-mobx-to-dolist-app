import React, {Component} from 'react';

import TodosList from "./components/TodosList";
import TodosCreate from './components/TodosCreate';
 
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
 
import todosService from "./stores/TodosStore";
const todos = new todosService();
 
export default class App extends Component {
    render() {
        return (
          // Инициализируем контейнер компонентов
          <Router>
            <Switch>
                {/*
                * Описываем route (путь) компонента создания TODOs
                *
                * path - путь по которому отображается компонент
                *     this.basePath - базовый путь к модулю внутри платформы
                * component - компонент экрана
                *     в компонент передается сервис todos и базовый путь
                *
                */}
                 <Route
                    path="/create"
                    component={
                        () => <TodosCreate  todos={todos} />
                       
                         
                           
                        
                    }
                />
                {/* Описываем route компонента списка TODOs */}
                <Route
                    path={`/`}
                    component={
                        () => <TodosList todos={todos} />
                       
                        
                    }/>
               
            </Switch>
            </Router>
        );
    }
}
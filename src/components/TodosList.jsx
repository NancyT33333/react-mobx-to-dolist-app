import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
// Подключение компонентов библиотеки навигации
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Подключение компонента элемента списка
import TodosListItem from './TodosListItem';
 

import AddIcon from '@material-ui/icons/Add';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  IconButton,
  LinearProgress,
  List,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  cardActions: {
      justifyContent: 'flex-end',
      padding: 16,
  },
  done: {
      textDecoration: 'line-through',
  },
});

@withStyles(styles)
@observer
export default class TodosList  extends Component {
  
  static propTypes = {
    classes: PropTypes.object.isRequired,
  
    todos: PropTypes.object.isRequired,
};


  componentDidMount() {
    // Получаем mobx сервис
    const { todos } = this.props;

    // Сообщаем сервису о необходимости получить список элементов
    todos.getList();
  }

  changeTodoStatus = (id, isDone) => {
    const { todos } = this.props;

    // Обновляем состояние элемента
    todos.changeStatus(id, isDone);
};

    removeTodo = (id) => {
        const { todos } = this.props;

        // Обновляем состояние элемента
        todos.remove(id);
    }; 

  render() {
    const { classes, todos: { isFetching, items } } = this.props;
 
    return (
      <Container maxWidth="sm">
          <Card>
              <CardHeader title={`Задачи: ${Object.keys(items).length}`} /> 
             
              <CardContent>
                  {
                    //   Если список элементов загружается выводим анимацию загрузки
                    //   В противном случае выводим список элементов
                      isFetching ? <LinearProgress />
                          : (
                              <List>
                                  {Object.values(items).map((item) => (
                                      <TodosListItem
                                          key={item.id}
                                          item={item}
                                          onStatusChange={this.changeTodoStatus}
                                          onRemove={this.removeTodo}
                                      />
                                  ))}
                              </List>
                          )
                  }
              </CardContent>
              {/* Добавляеми ссылку на форму создания элемента */}
              <CardActions className={classes.cardActions}>
                  <Link to={`/create`}>
                      <IconButton>
                          <AddIcon />
                      </IconButton>
                  </Link>
              </CardActions>
          </Card>
      </Container>
  );

  }

}


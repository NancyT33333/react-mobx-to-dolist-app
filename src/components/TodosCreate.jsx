import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Подключение компонентов библиотеки навигации
import { Redirect } from 'react-router';
// Подключение компонентов mobx для отслеживания состояния данных
import { observer } from 'mobx-react';
import {
    Card,
    CardContent, CardHeader,
    Container,
    IconButton,
    TextField,
    withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
 
const styles = () => ({
    cardContent: {
        display: 'flex',
    },
    inputField: {
        flex: 1,
    },
});
 
@withStyles(styles)
@observer
export default class TodosList extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
      
        todos: PropTypes.object.isRequired,
    };
 
    constructor(props) {
        super(props);
 
        this.state = {
            newTodoName: '',
            isError: false,
            isDone: false,
        };
 
        this.inputRef = React.createRef();
    }
 
    componentDidMount() {
        setTimeout(() => {
            this.inputRef.current.focus();
        }, 199);
    }
 
    changeNewTodoName = (value) => {
        this.setState({ newTodoName: value, isError: false });
    };
 
    addTodo = () => {
        // Получаем mobx сервис
        const { todos } = this.props;
        const { newTodoName } = this.state;
 
        if (!newTodoName) {
            this.setState({ isError: true });
 
            return;
        }
 
        // Добавляем новый элемент
        todos.add(newTodoName);
        this.changeNewTodoName('');
        this.setState({ isDone: true });
    };
 
    render() {
        const { baseRoute, classes } = this.props;
        const { isDone, isError, newTodoName } = this.state;
 
        // При успешном выполнении добавления элемента переводим на экран списка
        if (isDone) {
            return (
                <Redirect to={"/"} />
            );
        }
 
        return (
            <Container maxWidth="sm">
                <Card>
                    <CardHeader title="Добавить задачу" />
                    <CardContent className={classes.cardContent}>
                        <TextField
                            label="Описание"
                            placeholder="Кратко опишите задачу"
                            className={classes.inputField}
                            error={isError}
                            value={newTodoName}
                            inputRef={this.inputRef}
                            InputProps={{
                                onKeyPress: (event) => {
                                    if (event.nativeEvent.keyCode === 13) {
                                        this.addTodo();
                                    }
                                },
                            }}
                            onChange={(event) => this.changeNewTodoName(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <IconButton onClick={this.addTodo}>
                            <AddIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}
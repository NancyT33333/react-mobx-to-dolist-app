// Подключение декораторов из библиотеки mobx
import { action, observable, set } from 'mobx';
 
// Подключение агента работы с данными
import todos from '../agents/TodosAgent';
 
export default class TodosStore {
    // Переменная содержащая текущее состояние данных
    @observable items = {};
 
    // Переменная содержащая статус загрузки данных их API
    @observable isFetching = false;
 
    /*
     * Декоратор @observable сообщает что за данными в переменной
     * можно следить используя декоратор @observe
     */
 
    // Метод получения данных из store
    @action
    getList() {
        // Если в данный момент происходит загрузка данных, метод прерывает выполнение
        if (this.isFetching) {
            return;
        }
 
        // Сообщаем о начале загрузки данных
        this.isFetching = true;
 
        // Получаем данные из агента
        todos.get().then(action((response) => {
            // Обновляем текущее состояние данных
            this.items = response.data;
        })).catch(action((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
        })).finally(action(() => {
            // Сообщаем об окончании загрузки
            this.isFetching = false;
        }));
    }
 
    /*
     * Декоратор @action необходим для запуска жизненного цикла
     * переменной декорированного @observable
     */
 
    // Метод добавления данных в store
    @action
    add(text) {
        // Создаем новый элемент
        const item = {
            id: Date.now(),
            text,
            isDone: false,
        };
 
        // Передаем новый элемент в агент
        todos.add(item).then(action(() => {
            // Обновляем текущее состояние данных
            set(this.items, item.id, item);
        })).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err);
        });
    }
 
    // Метод изменение состояния элемента по идентификатору
    @action
    changeStatus(id, isDone) {
        const has = Object.hasOwnProperty;
 
        if (!has.call(this.items, id)) {
            return;
        }
 
        const item = this.items[id];
 
        item.isDone = isDone;
 
        // Передаем данные об изменении состояния элемента в агент
        todos.changeStatus(item).then(action(() => {
            // Обновляем текущее состояние данных
            set(this.items, item.id, item);
        })).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err);
        });
    }
 
    // Метод удаления элемента
    @action
    remove(id) {
        // Передаем в агент идентификатор элемента для удаления
        todos.remove(id).then(action(() => {
            // replacement of mobx remove functionality
            const items = { ...this.items };
            delete items[id];
            // Обновляем текущее состояние данных
            this.items = items;
        })).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err);
        });
    }
}
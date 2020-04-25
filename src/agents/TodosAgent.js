import axios from 'axios';
 
// Базовый контекст API
const TODOS_SERVER_CONTEXT = 'http://localhost:8010/proxy';
 
// Создание базового агента с указанным контекстом
const rest = axios.create({
    baseURL: TODOS_SERVER_CONTEXT
    
  
});
 
export default {
    // Метод получения списка элементов
    get: () => rest.get('/todos'),
 
    // Метод создания элемента
    add: (item) => rest.post('/todo', item),
 
    // Метод обновления элемента
    changeStatus: (item) => rest.put(`/todo/${item.id}`, item),
 
    // Метод удаления элемента
    remove: (id) => rest.delete(`/todo/${id}`),
};
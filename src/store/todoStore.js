import { create } from 'zustand';

const useTodoStore = create((set) => ({
    todos: [],
    loading: false,
    error: null,
    // Hàm để lấy dữ liệu từ API
    fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            set({ todos: data.slice(0, 10), loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addTodo: (newTodo) => {
        set((state) => ({
            todos: [...state.todos, newTodo],
        }));
    },

    removeTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },
}));

export default useTodoStore;

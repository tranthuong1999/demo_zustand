// store/rootStore.js
import todoStore from './todoStore';
import counterStore from './countStore';

class RootStore {
    constructor() {
        this.todoStore = todoStore;
        this.counterStore = counterStore;
    }
}

const rootStore = new RootStore();
export default rootStore;

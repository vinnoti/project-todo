import axios from "axios";

export default {
    state: {
        todoList: [],
        todoDetail: '',
        isLoading: false,
        isError: false,
        errorMessage: '',
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading
        },
        getErrorStatus(state) {
            return state.isError
        },
        getErrorMessage(state) {
            return state.errorMessage
        },
        getTodoList(state) {
            return state.todoList
        },
        getTodoDetail(state) {
            return state.todoDetail
        }
    },
    mutations: {
        loading(state, payload){
            state.isLoading = payload
        },
        errorStatus(state, payload){
            state.isError = payload
        },
        errorMessage(state, payload){
            state.errorMessage = payload
        },
        setTodoList(state, payload) {
            state.todoList = payload
        },
        addTodoList(state, payload) {
            state.todoList.push(payload)
        },
        update_todo: (state, payload) => {
            const index = state.todoList.findIndex(todoList => todoList.id === payload.id);
            if (index !== -1) {
                state.todoList.splice(index, 1, payload);
            }
        },
        deleteTodoList(state, payload) {
            const index = state.todoList.findIndex(todoList => todoList.id === payload);
            state.todoList.remove(index);
        },
        setTodoDetail(state, payload) {
            state.todoDetail = payload
        },
    },
    actions: {
        GET_LIST_TODO:  async (context) => {
            let { data } = await axios.get('todo/list')
            context.commit("setTodoList", data.result)
        },
        GET_DETAIL_TODO:  async (context,params) => {
            let { data } = await axios.get('todo/detail?id='+params)
            context.commit("setTodoDetail", data.result)
        },
        CREATE_TODO: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .post('todo/create', payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            commit('loading', false);
                            commit('addTodoList', data.result)
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        commit('errorStatus', !error.response.data.success)
                        commit('errorMessage', error.response.data.errorMessage)
                        reject(error);
                    });
            });
        },
        UPDATE_TODO: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .patch('todo/update?id='+payload.id, payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            commit('loading', false);
                            commit('update_todo', payload)
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        commit('errorStatus', !error.response.data.success)
                        commit('errorMessage', error.response.data.errorMessage)
                        reject(error);
                    });
            });
        },
        DELETE_TODO: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .delete('todo/delete?id='+payload)
                    .then(({data}) => {
                        console.log(data.success)
                        console.log(data.result)
                        if (data.success === true) {
                            commit('loading', false);
                            commit('deleteTodoList', data.result)
                            // resolve(data.result);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        commit('errorStatus', !error.response.data.success)
                        commit('errorMessage', error.response.data.errorMessage)
                        reject(error)
                    })
            })
        },
    }
}
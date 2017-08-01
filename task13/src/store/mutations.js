import setLocalStorage from "./plugin.js"
import Vue from 'vue'

export const state = {
    option: {
        select: 'onething',
        btnName: 'Add',
        btnClass: 'add',
        cancelShow: false,
        controlBar: false
    },
    todoData: JSON.parse(window.localStorage.todoData || '[]')
}

export const mutations = {
    changeOptions(state, option) {
        if (option.hasOwnProperty('select')) {
            state.option.select = option.select
        }
        if (option.hasOwnProperty('btnName')) {
            state.option.btnName = option.btnName
        }
        if (option.hasOwnProperty('btnClass')) {
            state.option.btnClass = option.btnClass
        }
        if (option.hasOwnProperty('setCancel')) {
            state.option.cancelShow = option.setCancel
        }
        if (option.hasOwnProperty('setBar')) {
            state.option.controlBar = option.setBar
        }
    },
    addItem(state, payload) {
        if (payload.prior !== '-1' && payload.status !== '-1' && payload.content !== '') {
            state.todoData.push(payload)
            setLocalStorage(state.todoData)
        }
    },
    editItem(state, payload) {
        if (payload.todoData.content !== '') {
            Vue.set(state.todoData, payload.index, payload.todoData)
            setLocalStorage(state.todoData)
        }
    },
    deleteItem(state, payload) {
        state.todoData.splice(payload.index, 1)
        setLocalStorage(state.todoData)
    }
}
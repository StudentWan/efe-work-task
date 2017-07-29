export const state = {
  option: {
    select: 'onething',
    btnName: 'Add',
    btnClass: 'add',
    cancelShow: false
  }
}

export const mutations = {
  changeOptions(state, option) {
    if(option.hasOwnProperty('select')) {
      state.option.select = option.select
    }
    if(option.hasOwnProperty('btnName')) {
      state.option.btnName = option.btnName
    }
    if(option.hasOwnProperty('btnClass')) {
      state.option.btnClass = option.btnClass
    }
    if(option.hasOwnProperty('setCancel')) {
      state.option.cancelShow = option.setCancel
    }
  }
}
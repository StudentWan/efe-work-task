import san from 'san'

import App from './components/App.san'
import Onething from './components/Onething.san'
import All from './components/All.san'
import Edit from './components/Edit.san'

import {router} from 'san-router'
import './action.js'

import 'font-awesome-webpack'
import './static/scss/layout.scss'

// attach root component
const app = new App()
app.attach(document.body)

// router
router.add({
    rule: '/', handler(e) {
        app.data.set('path', 0)
    }
})
router.add({
    rule: '/all', handler(e) {
        app.data.set('path', 1)
    }
})
router.add({
    rule: '/edit/:id', handler(e) {
        app.data.set('path', 2)
        app.data.set('isChooseOn', false)
        if (e.path === '/edit/change') {
            app.data.set('index', e.query.index)
        }
    }
})
router.start()






import san from 'san'

import App from './components/App.san'
import Onething from './components/Onething.san'
import All from './components/All.san'

import {router} from 'san-router'

import 'font-awesome-webpack'
import './static/scss/layout.scss'

// attach root component
const app = new App()
app.attach(document.body)


// router
router.add({rule: '/', Component: Onething, target: '#main'});
router.add({rule: '/all', Component: All, target: '#main'})
router.start()




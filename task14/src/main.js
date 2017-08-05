import san from 'san'

import Hello from './components/Hello.san'

import {router} from 'san-router'

import 'font-awesome-webpack'

router.add({rule: '/', Component: Hello, target: '#app'});

// start
router.start()

<template>
    <div class="main">
        <v-touch @tap="chooseDisplay">
            <ul class="prior">
                <li class="prior-opt" tag="0">
                    <i class="high fa fa-circle" aria-hidden="true"></i>
                    <span>高优</span>
                </li>
                <li class="prior-opt" tag="1">
                    <i class="medium fa fa-circle" aria-hidden="true"></i>
                    <span>中优</span>
                </li>
                <li class="prior-opt" tag="2">
                    <i class="low fa fa-circle" aria-hidden="true"></i>
                    <span>低优</span>
                </li>
            </ul>
            <ul class="status">
                <li class="status-opt" tag="0">
                    <i class="fa fa-play" aria-hidden="true"></i>
                    <span>进行中</span>
                </li>
                <li class="status-opt" tag="1">
                    <i class="fa fa-pause" aria-hidden="true"></i>
                    <span>待办</span>
                </li>
                <li class="status-opt" tag="2">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    <span>已完成</span>
                </li>
            </ul>
        </v-touch>
        <div class="list">
            <template v-for="(item, index) in todoData" v-if="contains(item.prior, item.status)">
                <v-touch class="item" @panleft="showRight(index)" @panright="showLeft(index)" :key="index" ref="touch">
                    <i class="fa" :class="{high: item.prior === '0', medium: item.prior === '1', low: item.prior === '2', 'fa-play': item.status === '0', 'fa-pause': item.status === '1', 'fa-stop': item.status === '2'}" aria-hidden="true"></i>
                    <p class="content">
                        {{ item.content }}
                    </p>
                    <right-bar v-if="checkBar[index].isRightOn" @enable-pan="doEdit(index)" :index="index"></right-bar>
                    <left-bar v-if="checkBar[index].isLeftOn" @enable-pan="doEdit(index)" :index="index"></left-bar>
                </v-touch>
            </template>
        </div>
    </div>
</template>

<script>
import RightBar from './partial/rightbar.vue'
import LeftBar from './partial/leftbar.vue'
import BUS from '../bus.js'

export default {
    data: function () {
        return {
            checkBarArr: [],
            priorChosen: {
                '0': false,
                '1': false,
                '2': false
            },
            statusChosen: {
                '0': false,
                '1': false,
                '2': false
            }
        }
    },
    computed: {
        todoData() {
            return this.$store.state.todoData
        },
        checkBar() {
            for (let i = 0, lens = this.todoData.length; i < lens; i++) {
                this.checkBarArr.splice(i, 1, { isRightOn: false, isLeftOn: false })
            }
            return this.checkBarArr
        }
    },
    created() {
        this.$store.commit('changeOptions', {
            select: 'all',
            btnName: 'Add',
            btnClass: 'add',
            setCancel: false,
            setBar: false
        })
    },
    mounted() {
        BUS.$on('enable-pan', () => {
            for (let i = 0, lens = this.todoData.length; i < lens; i++) {
                this.checkBar[i].isLeftOn = false
                this.checkBar[i].isRightOn = false
            }
            this.enablePan(this.todoData)
            this.$store.commit('changeOptions', { setCancel: false, setBar: false })
        })
    },
    destroyed() {
        BUS.$off('enable-pan')
    },
    methods: {
        showRight(i) {
            this.checkBar[i].isRightOn = true
            this.$store.commit('changeOptions', { setCancel: true, setBar: true })
            this.disablePan(this.todoData)
        },
        showLeft(i) {
            this.checkBar[i].isLeftOn = true
            this.$store.commit('changeOptions', { setCancel: true, setBar: true })
            this.disablePan(this.todoData)
        },
        doEdit(i) {
            this.enablePan(this.todoData)
            this.checkBar[i].isLeftOn = false
            this.checkBar[i].isRightOn = false
        },
        disablePan(checkBar) {
            for (let i = 0, lens = checkBar.length; i < lens; i++) {
                this.$refs.touch[i].disable('pan')
            }
        },
        enablePan(checkBar) {
            for (let i = 0, lens = checkBar.length; i < lens; i++) {
                this.$refs.touch[i].enable('pan')
            }
        },
        chooseDisplay(e) {
            let target
            if (e.target.classList.contains('prior-opt') || e.target.classList.contains('status-opt')) {
                target = e.target
            }
            if (e.target.parentNode.classList.contains('prior-opt') || e.target.parentNode.classList.contains('status-opt')) {
                target = e.target.parentNode
            }
            if (target) {
                target.classList.toggle('sel')
                let tag = target.getAttribute('tag')
                if (target.classList.contains('prior-opt')) {
                    if (target.classList.contains('sel')) {
                        this.priorChosen[tag] = true
                    } else {
                        this.priorChosen[tag] = false
                    }
                }
                if (target.classList.contains('status-opt')) {
                    if (target.classList.contains('sel')) {
                        this.statusChosen[tag] = true
                    } else {
                        this.statusChosen[tag] = false
                    }
                }
            }
        },
        contains(prior, status) {
            if (this.priorChosen[prior] || this.statusChosen[status]) {
                return true
            }

            let noPrior = true
            let noStatus = true
            for (let i = 0, lens = Object.keys(this.priorChosen).length; i < lens; i++) {
                if (this.priorChosen[i]) {
                    noPrior = false
                    break
                }
            }
            for (let i = 0, lens = Object.keys(this.statusChosen).length; i < lens; i++) {
                if (this.statusChosen[i]) {
                    noStatus = false
                    break
                }
            }
            if (noPrior && noStatus) {
                return true
            }

            return false
        }
    },
    components: {
        RightBar,
        LeftBar
    }
}
</script>

<style lang="scss" scoped>
@import '../static/common';

@include main;
@include banner($name: prior, $color: #fbebeb);
@include banner($name: status, $color: #f0feed);
.sel {
    background: #2aabd2;
}
</style>

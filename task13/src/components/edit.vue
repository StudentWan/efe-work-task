<template>
    <div class="main">
        <v-touch @tap="choosePrior">
            <ul class="prior">
                <li class="prior-opt" tag="0" :class="{sel: todoData.prior === '0'}">
                    <i class="high fa fa-circle" aria-hidden="true"></i>
                    <span>高优</span>
                </li>
                <li class="prior-opt" tag="1" :class="{sel: todoData.prior === '1'}">
                    <i class="medium fa fa-circle" aria-hidden="true"></i>
                    <span>中优</span>
                </li>
                <li class="prior-opt" tag="2" :class="{sel: todoData.prior === '2'}">
                    <i class="low fa fa-circle" aria-hidden="true"></i>
                    <span>低优</span>
                </li>
            </ul>
        </v-touch>
        <v-touch @tap="chooseStatus">
            <ul class="status">
                <li class="status-opt" tag="0" :class="{sel: todoData.status === '0'}">
                    <i class="fa fa-play" aria-hidden="true"></i>
                    <span>进行中</span>
                </li>
                <li class="status-opt" tag="1" :class="{sel: todoData.status === '1'}">
                    <i class="fa fa-pause" aria-hidden="true"></i>
                    <span>待办</span>
                </li>
                <li class="status-opt" tag="2" :class="{sel: todoData.status === '2'}">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    <span>已完成</span>
                </li>
            </ul>
        </v-touch>
        <div class="input">
            <textarea name="content" id="content" cols="50" rows="10" v-model="todoData.content"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                todoData: {
                    prior: '-1',
                    status: '-1',
                    content: ''
                },
                index: this.$route.query.index
            }
        },
        computed: {
        },
        created() {
            if(this.index) {
                let temp = this.$store.state.todoData[this.index]
                this.todoData.prior = temp.prior
                this.todoData.status = temp.status
                this.todoData.content = temp.content
            }
            this.$store.commit('changeOptions', {
                select: '',
                btnName: 'Done',
                btnClass: 'done',
                setCancel: true,
                setBar: false
            })
        },
        destroyed() {
            let pattern = this.$route.params.pattern
            if (pattern === 'added') {
                this.$store.commit('addItem', this.todoData)
            } else {
                this.$store.commit('editItem', {todoData: this.todoData, index: this.index})
            }
        },
        methods: {
            choosePrior(e) {
                let target
                if (e.target.className === 'prior-opt') {
                    target = e.target
                }
                if (e.target.parentNode.className === 'prior-opt') {
                    target = e.target.parentNode
                }
                if (target) {
                    let tag = target.getAttribute('tag')
                    this.todoData.prior = tag
                }
            },
            chooseStatus(e) {
                let target
                if (e.target.className === 'status-opt') {
                    target = e.target
                }
                if (e.target.parentNode.className === 'status-opt') {
                    target = e.target.parentNode
                }
                if (target) {
                    let tag = target.getAttribute('tag')
                    this.todoData.status = tag
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../static/common';

    @include main;
    @include banner($name: prior, $color: $white);
    @include banner($name: status, $color: $white);

    .prior, .status {
        border-bottom: 1px solid $deepgray;
    }

    .prior-opt, .status-opt {
        border: 1px solid $deepgray;
    }

    .input {
        @include flex;
        margin: .5em;
    }

    #content {
        border: 1px solid $deepgray;
        outline: none;
    }

    .sel {
        border: 1px solid $red;
    }
</style>

<template>
    <div class="header">
        <v-touch class="btn cancel" @tap="cancelEdit" v-if="isCancelShow">Cancel</v-touch>
        <button class="btn hide" v-else>Cancel</button>
        <div class="title">Todo</div>
        <v-touch class="btn" :class="btnClass" @tap="addItem">{{ btnName }}</v-touch>
    </div>
</template>

<script>
    import BUS from '../../bus.js'
    export default {
        data: function () {
            return {}
        },
        methods: {
            addItem() {
                if (this.btnClass === 'add') {
                    this.$router.push('/edit/add')
                } else {
                    let pattern = this.$route.params.pattern
                    if (pattern === 'add') {
                        this.$router.push('/all/added')
                    } else {
                        this.$router.push('/all/edited')
                    }
                }
            },
            cancelEdit() {
                if (!this.isSetBar) {
                    this.$router.push('/all/list')
                } else {
                    BUS.$emit('enable-pan')
                }
            }
        },
        computed: {
            btnName() {
                return this.$store.state.option.btnName
            },
            btnClass() {
                return this.$store.state.option.btnClass
            },
            isCancelShow() {
                return this.$store.state.option.cancelShow
            },
            isSetBar() {
                return this.$store.state.option.controlBar
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../static/common';

    .header {
        @include flex($justify: space-between);
        @include fixed(top);
        padding: .5em;
        z-index: 999;
        height: 2.5em;
        @include title;
        background: $deepgray;
    }

    .hide {
        visibility: hidden;
    }
</style>

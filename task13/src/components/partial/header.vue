<template>
    <div class="header">
        <button class="btn cancel" @click="cancelEdit" v-if="isCancelShow">Cancel</button>
        <button class="btn hide" v-else>Cancel</button>
        <div class="title">Todo</div>
        <button class="btn" :class="btnClass" @click="addItem">{{ btnName }}</button>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
        }
    },
    methods: {
        addItem() {
            if (this.btnClass === 'add') {
                this.$router.push('/edit')
            } else {
                this.$router.push('/all')
            }
        },
        cancelEdit() {
            this.$router.push('/all')
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
    height: 2.5em;
    @include title;
    background: $deepgray;
}

.hide {
    visibility: hidden;
}
</style>

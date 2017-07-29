<template>
    <div class="main">
        <ul class="prior">
            <li class="prior-opt">
                <i class="high fa fa-circle" aria-hidden="true"></i>
                <span>高优</span>
            </li>
            <li class="prior-opt">
                <i class="medium fa fa-circle" aria-hidden="true"></i>
                <span>中优</span>
            </li>
            <li class="prior-opt">
                <i class="low fa fa-circle" aria-hidden="true"></i>
                <span>低优</span>
            </li>
        </ul>
        <ul class="status">
            <li class="status-opt">
                <i class="fa fa-play" aria-hidden="true"></i>
                <span>进行中</span>
            </li>
            <li class="status-opt">
                <i class="fa fa-pause" aria-hidden="true"></i>
                <span>待办</span>
            </li>
            <li class="status-opt">
                <i class="fa fa-stop" aria-hidden="true"></i>
                <span>已完成</span>
            </li>
        </ul>
        <div class="input">
        <textarea name="task-text" id="task-text" cols="50" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.commit('changeOptions', {
            select: '', 
            btnName: 'Done',
            btnClass: 'done',
            setCancel: true
        })
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

#task-text {
    border: 1px solid $deepgray;
    outline: none;
}
</style>

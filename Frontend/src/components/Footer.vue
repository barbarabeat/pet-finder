<template>
    <v-footer
    v-bind="localAttrs"
    :padless="padless"
    color="#F0EFA3"
    >
    <v-card
        width="100%"
        color="#72bef0"
        class="text-center"
    >
        <v-card-text class="footer">

        </v-card-text>

        <v-divider></v-divider>

        <!-- eslint-disable-next-line -->
        <v-card-text class="white--text footer">
        {{ new Date().getFullYear() }} — <strong>Pet Finder</strong>
        </v-card-text>
    </v-card>
    </v-footer> 
</template>

<script>
export default {
    data: () => ({
    padless: false,
    variant: 'absolute',
    }),
    computed: {
    localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
        } else {
        attrs[this.variant] = true
        }
        return attrs
    },
    },
}
</script>

<style scoped>
.footer{
    padding: 0 !important;
}
</style>
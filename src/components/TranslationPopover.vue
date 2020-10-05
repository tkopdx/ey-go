<template>
        <b-popover :target="`list-group-item-${item.id}`" triggers="click blur" placement="auto">
            <b-list-group>
                <b-list-group-item v-for="slug in item.translations" :key="`translation-list-item-${slug.text}`">
                        <small>{{slug.text}}</small>
                    </b-list-group-item>
                </b-list-group>
        </b-popover>
</template>

<script>
export default {
    name: 'TranslationPopover',
    props: {
        item: Object
    },
}
</script>
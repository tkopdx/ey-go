<template>
    <b-popover :target="`popover-sets-${set.id}`" triggers="hover" placement="left">
        <b-list-group>
            <b-list-group-item v-for="slide in set.slides" :key="slide.answer">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{slide.answer}}</h5>
                </div>
                <slide-items-preview
                    :items="slide.items"
                />
            </b-list-group-item>
        </b-list-group>
    </b-popover>
</template>

<script>
import SlideItemsPreview from './SlideItemsPreview';

export default {
    name: 'SetPopover',
    props: {
        set: Object,
    },
    components: {
        SlideItemsPreview
    }
}
</script>
<template>
    <b-dropdown v-if="sets"  text="Sets" right>
          <b-list-group-item class="flex-column align-items-auto" v-for="set in sets" :set="set" :key="`${set.name}-${set.id}-nav`" :id="`popover-sets-${set.id}`">
            <dropdown-list-title
                :name="set.name"
            />
            <b-button-group>
              <b-button v-bind:set="set" v-on:click="$emit('show-slideshow', set)">Slideshow</b-button>
              <b-button v-bind:set="set" v-on:click="$emit('show-set-editor', set)">Edit</b-button>
            </b-button-group>
          </b-list-group-item>
          <set-popover
            v-for="set in sets"
            :key="`${set.id}-nav`"
            v-bind:set="set"
          />
    </b-dropdown>
    <b-dropdown v-else text="Sets" right>
      <b-list-group-item>
        Once you've saved a set, you'll see it here!
      </b-list-group-item>
    </b-dropdown>
</template>

<script>
import SetPopover from './SetPopover';
import DropdownListTitle from './DropdownListTitle';

export default {
    name: 'SetsDropdown',
    props: {
        sets: Array,
    },
    components: {
        SetPopover,
        DropdownListTitle
    }
}
</script>
<template>
  <div class="o-flex o-flex--gap-s">
    <Chip
      v-for="(memberName, index) in members"
      :key="index"
      iconId="user"
      :content="memberName.name"
      :class="memberName.variant"
      hasBackground
    />
  </div>
</template>

<script setup lang="ts">
import Chip from "./Chip.vue"
import {useMemberStore} from "@/stores/memberStore.js";

const memberStore = useMemberStore()
const members = memberStore.checkIfMembersIsGiven()

</script>

<template>
  <div>
    <h2>Einstellung</h2>
    <Button
        text="Neue Komponente hinzufügen"
        @click="formStore.showComponentForm()"
        variant="link-style"
        class="u-mb"
    />
    <Divider/>
    <div
        class="c-form"
        @submit.prevent="formStore.setValuesAndReload()"
    >
      <h3>Zeitintervall: </h3>
      <div class="c-form__row">
        <div class="c-form__column">
          <label>min:</label>
          <input
              type="number"
              placeholder="min"
              v-model="timerStore.newMin"
          >
        </div>
        <div class="c-form__column">
          <label>sek:</label>
          <input
              type="number"
              placeholder="sec"
              v-model="timerStore.newSec"
          >
        </div>
      </div>
      <h3>Teilnehmer: </h3>
      <div class="o-grid o-grid--half">
        <div
            class="c-form__row"
            v-for="(memberName, index) in memberStore.members"
        >
          <Chip
              :key="index"
              iconId="user"
              :content="memberName.name"
              :class="memberName.variant"
              hasBackground
          />
          <svg
              class="c-modal__icon"
              @click="memberStore.remove(memberName)"
          >
            <use href="#close"></use>
          </svg>
        </div>
        <div class="c-form__row">
          <svg
              v-if="!memberStore.isInputOpen"
              class="c-modal__icon"
              @click="memberStore.openInput()"
          >
            <use href="#plus"></use>
          </svg>
          <div
              class="c-form__row"
              v-if="memberStore.isInputOpen"
          >
            <input
                type="text"
                v-model="memberStore.newMemberName"
            >
            <svg
                class="c-modal__icon"
                @click="memberStore.add"
            >
              <use href="#check"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="c-form__row u-mt">
        <Button
            text="Zurücksetzten der Teilnehmer"
            @click="memberStore.reset"
            variant="link-style"
        />
      </div>
      <Button
          class="u-mt"
          text="Senden"
          type="submit"
          @click="formStore.setValuesAndReload()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/components/Button.vue";
import Divider from "@/components/Divider.vue";
import Chip from "@/components/Chip.vue";
import {useTimerStore} from "@/stores/timerStore.js";
import {useMemberStore} from "@/stores/memberStore.js";
import {useFormStore} from "@/stores/formStore.js";

const timerStore = useTimerStore()
const memberStore = useMemberStore()
const formStore = useFormStore()
</script>

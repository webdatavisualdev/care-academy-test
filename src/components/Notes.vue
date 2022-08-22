<template>
  <div class="notes">
    <h1>Notes</h1>
    <div class="notes__container">
      <div class="notes__container-list">
        <div class="notes__container-buttons">
          <button
            class="notes__container-add"
            :disabled="notes.indexOf('') > -1"
            @click="add"
          >
            Add
          </button>
          <button class="notes__container-delete" @click="deleteNote">
            Delete
          </button>
        </div>
        <div class="notes__container-items">
          <div
            :class="`notes__container-item ${
              index === currentNoteIndex ? 'selected' : ''
            }`"
            v-for="(note, index) in notes"
            :key="index"
            @click="currentNoteIndex = index"
          >
            <span class="note" v-if="note">{{ note }}</span>
            <em class="placeholder" v-else>Select and add note...</em>
          </div>
        </div>
      </div>
      <div class="notes__container-content">
        <textarea
          class="notes__container-input"
          placeholder="Type notes here..."
          v-model="note"
          @keyup.enter="save"
        ></textarea>
        <button class="notes__container-save" :disabled="!note" @click="save">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "../store";

export default class Notes extends Vue {
  note = "";
  currentNoteIndex = 0;

  mounted() {
    store.dispatch("getNotes");
  }

  get notes() {
    this.note = store.state.notes[this.currentNoteIndex];
    return store.getters.notes;
  }

  add() {
    if (this.notes.indexOf("") > -1) {
      return;
    }
    this.notes.splice(0, -1, "");
    this.currentNoteIndex = 0;
  }

  deleteNote() {
    this.notes.splice(this.currentNoteIndex, 1);
    this.currentNoteIndex = 0;
    this.save();
  }

  save() {
    if (!this.note) {
      return;
    }
    this.notes[this.currentNoteIndex] = this.note;
    store.dispatch("saveNotes", this.notes);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.notes {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__container {
    flex: 1;
    display: flex;
    border: 2px solid #eaeaea;
    border-radius: 8px;
    margin: 0 16px 16px;
    overflow: hidden;
    &-list {
      border-right: 2px solid #eaeaea;
      width: 30%;
      display: flex;
      flex-direction: column;
    }
    &-buttons {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #eaeaea;
      padding: 10px 16px;
    }
    &-add,
    &-delete,
    &-save {
      background-color: #0082f5;
      color: white;
      border-radius: 30px;
      border: 0;
      box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%),
        0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
      padding: 8px 16px;
      text-transform: uppercase;
      cursor: pointer;
      &:disabled {
        opacity: 0.6;
      }
    }
    &-delete {
      background-color: #e5616d;
    }
    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    &-input {
      flex: 1;
      margin-bottom: 16px;
      padding: 16px;
      border: 0;
      width: calc(100% - 32px);
      border-bottom: 2px solid #eaeaea;
      &:focus-visible {
        outline: 0;
      }
    }
    &-save {
      margin: 0 16px 16px;
    }
    &-item {
      border-bottom: 1px solid #eaeaea;
      text-align: left;
      padding: 8px 16px;
      cursor: pointer;
      &.selected {
        background-color: rgba(0, 131, 245, 0.2);
      }
      .placeholder {
        opacity: 0.4;
      }
      .note {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: block;
      }
    }
    &-items {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>

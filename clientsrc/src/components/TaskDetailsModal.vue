<template>
  <div
    class="task-details-modal modal fade"
    id="globalModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-hidden="true"
    :class="{show: isOpen}"
    :style="{display: isOpen ? 'block': 'none'}"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalTitle">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="close"
            @click="closeModal"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="task-details-content">
            <slot></slot>
          </div>
          <div v-for="comment in comments" :key="comment.id">
            <comment :comment="comment" />
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <div class="col-2">
            <i class="fa fa-fw fa-trash text-muted mr-2 action muted" @click="deleteTask()"></i>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-secondary mr-2"
              @click="closeModal"
              data-dismiss="modal"
            >Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment";

export default {
  name: "Modal",
  components: {
    Comment
  },
  props: {
    task: { type: Object, required: true },
    isOpen: { type: Boolean, default: false }
  },
  computed: {
    comments() {
      this.$store.state.comments;
    }
  },
  methods: {
    async deleteTask() {
      let yes = await this.$confirm("Delete this task?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("deleteTask", this.task);
      this.closeModal();
    },
    closeModal() {
      // let yes = await this.$confirm("Are you sure you want to close?");
      // if (!yes) {
      //   return;
      // }
      this.$emit("closeModal");
    }
  }
};
</script>

<style>
</style>
<template>
  <v-row>
    <v-icon @click.stop="dialog = true">edit</v-icon>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>
          <h2>Edit Todo</h2>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="editTodo()" @keydown.prevent.enter>
          <v-card-text>
            <v-text-field
              v-model="title"
              name="Title"
              label="Title"
              type="text"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              v-model="note"
              name="note"
              label="Note"
              type="text"
              :rules="[rules.required]"
            ></v-textarea>        
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text type="submit" :loading="getIsLoading">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapGetters } from "vuex";
export default {
   props: ["todo"],
     computed: {
    ...mapGetters(["getIsLoading"])
  },
  data() {
    return {
      dialog: false,
      valid: false,
      title: this.todo.title,
      note: this.todo.note,
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
  methods: {
    async editTodo() {
            this.$store
                    .dispatch("UPDATE_TODO", {
                        id: this.todo.id,
                        title: this.title,
                        note: this.note
                })
                .then((data) => {
                alert('Success edit data',data.result)
                this.dialog=false
                })
                .catch((err) => {
                console.log(err)
                });
        }
    },
};
</script>
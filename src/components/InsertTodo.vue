<template>
  <v-row justify="center">
    <v-btn color="orange" dark @click.stop="dialog = true">
      Add New Todo
    </v-btn>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>
          <h2>Add New Todo</h2>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="postTodo()" @keydown.prevent.enter>
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
  data() {
    return {
      dialog: false,
      valid: false,
      title: "",
      note: "",
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
   computed: {
    ...mapGetters(["getIsLoading"])
  },
  methods: {
    async postTodo() {
            this.$store
                    .dispatch("CREATE_TODO", {
                        title: this.title,
                        note: this.note
                })
                .then((data) => {
                alert('Success Upload Data',data.result)
                this.dialog=false
                })
                .catch((err) => {
                console.log(err)
                });
        }
    },
};
</script>
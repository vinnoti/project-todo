<template>
  <div class="todolist">
    <div class="mx-8">
      <v-container class="my-5">
        <InsertTodo />
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="todo in getTodoList"
            :key="todo.id"
          >
            <v-card class="text-xs-center ma-3" max-width="368">
              <v-card-text>
                <v-container class="mx-2">
                  <v-layout row warp class="my-2">
                    <div class="subheading black--text mx-2">{{ todo.title }}</div>
                  </v-layout>
                  <v-layout row warp class="my-2">
                    <div class="grey--text mx-2">{{ todo.note }}</div>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="deleteTodo(todo.id)">
                  delete
                </v-btn>
               <EditTodo :todo="todo" />
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import InsertTodo from "@/components/InsertTodo";
import EditTodo from "@/components/EditTodo";
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: "Home",
  components: { InsertTodo, EditTodo },
  data: () => ({
    drawer: false,
    icons: {
      location
    }
  }),
  computed: {
    ...mapGetters(["getTodoList"])
  },
  methods: {
    closealert() {
      this.error = false;
    },
    detailProduct(id) {
      this.$router.push({ name: "WarehouseDetail", params: { id: id } });
    },
    deleteTodo(id){
      this.$store.dispatch("DELETE_TODO",id).then(res => console.log(res))
    }
  },
  mounted() {
    this.$store.dispatch("GET_LIST_TODO");
  }
};
</script>
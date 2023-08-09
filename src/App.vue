<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered">My ToDO list</div>
    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo"
          />
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button is-light"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)"
              >
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";

// firebase ref

const todosCollectionRef = collection(db, "todo");
const todosCollectionQuery = query(
  todosCollectionRef,
  orderBy("date", "desc"),
  limit(10)
);

// todo

const todos = ref([
  // {
  //   id: "id1",
  //   content: "hello guys!",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "check this",
  //   done: true,
  // },
]);

// get todo

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

// add todo

const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = "";
};

// delete todo

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

// toggle done

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>


<style>
@import "bulma/css/bulma.min.css";

.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
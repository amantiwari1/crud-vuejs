<template>
  <div class="container mx-auto space-y-10 p-5">
    <form
      class="
        flex flex-col
        space-y-3
        md:space-x-2 md:space-y-0
        items-center
        md:flex-row
        justify-center
      "
    >
      <div>
        <label> Email : </label>
        <input
          class="border rounded-md py-1 px-2 focus:outline-none"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div>
        <label> Name: </label>
        <input
          class="border rounded-md py-1 px-2 focus:outline-none"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="flex items-center space-x-2">
        <label>Gender: </label>

        <select
          v-model="gender"
          class="w-52 border rounded-md py-2 px-2 focus:outline-none"
        >
          <option value="">Please select one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Not to say</option>
        </select>
      </div>

      <button
        type="button"
        class="
          px-3
          py-2
          bg-green-600
          hover:bg-green-500
          font-bold
          cursor-pointer
          text-white
          rounded-md
        "
        @click="submitForm"
      >
        Add
      </button>
    </form>

    <div class="space-y-3">
      <a class="text-3xl font-bold">List of User</a>
      <div class="grid gap-5 md:grid-cols-3 max-w-3xl mx-auto">
        <UserCard
          v-bind:product="product"
          v-for="product in latestProducts"
          v-bind:key="product.ID"
          v-on:deleteUser="deleteUser"
          v-on:updateUser="updateUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "./components/UserCard.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      latestProducts: [],
      email: "",
      name: "",
      gender: "",
    };
  },

  components: {
    UserCard,
  },
  mounted() {
    this.getLatestProduct();
    document.title = "Home";
  },
  methods: {
    async submitForm() {
      await axios
        .post("/user", {
          email: this.email,
          name: this.name,
          gender: this.gender,
        })
        .then((res) => {
          this.latestProducts = [res.data, ...this.latestProducts];

          this.email = "";
          this.name = "";
          this.gender = "";
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async deleteUser(id) {
      await axios
        .delete(`/user/${id}`)
        .then(() => {
          this.latestProducts = this.latestProducts.filter(
            (user) => user.ID !== id
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async updateUser(id, data) {
      await axios
        .put(`/user/${id}`, data)
        .then((res) => {
          const elementsIndex = this.latestProducts.findIndex(
            (arr) => arr.ID === res.data.ID
          );
          let newArray = [...this.latestProducts];
          newArray[elementsIndex] = res.data;

          this.latestProducts = newArray;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async getLatestProduct() {
      await axios
        .get("/user")
        .then((res) => {
          this.latestProducts = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

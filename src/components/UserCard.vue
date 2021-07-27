<template>
  <TransitionRoot
    appear
    :show="isShowing"
    enter="duration-300 ease-out"
    enter-from="opacity-0 scale-95"
    enter-to="opacity-100 scale-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100 scale-100"
    leave-to="opacity-0 scale-95"
  >
    <div
      class="border p-3 rounded-md max-w-sm mx-auto text-left shadow space-y-4"
    >
      <div>
        <p class="capitalize">{{ product.name }}</p>
        <p class="capitalize">{{ product.gender }}</p>
        <p>{{ product.email }}</p>
      </div>

      <div class="flex items-center justify-end space-x-2">
        <PencilAltIcon
          class="h-7 w-7 text-green-600 cursor-pointer"
          @click="openModal"
        />
        <TrashIcon
          @click="deleteUser(product.ID)"
          class="h-7 w-7 text-red-600 cursor-pointer"
        />
      </div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal">
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="min-h-screen px-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-20"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <DialogOverlay class="fixed inset-0 bg-gray-500 opacity-50" />
              </TransitionChild>

              <span
                class="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <div
                  class="
                    inline-block
                    w-full
                    max-w-sm
                    p-3
                    my-8
                    overflow-hidden
                    align-middle
                    transition-all
                    transform
                    bg-white
                    shadow
                    rounded-xl
                  "
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit User Details
                  </DialogTitle>

                  <div class="mt-4">
                    <form
                      class="flex w-full flex-col items-center justify-center"
                    >
                      <div class="space-y-2 max-w-md">
                        <div class="w-full text-left">
                          <label> Email : </label>
                          <input
                            class="
                              border
                              rounded-md
                              w-full
                              max-w-xs
                              py-1
                              px-2
                              focus:outline-none
                            "
                            placeholder="Email"
                            v-model="email"
                          />
                        </div>
                        <div>
                          <label> Name: </label>
                          <input
                            class="
                              border
                              rounded-md
                              py-1
                              px-2
                              focus:outline-none
                            "
                            placeholder="Name"
                            v-model="name"
                          />
                        </div>
                        <div class="flex items-center space-x-2">
                          <label>Gender </label>
                          <select
                            v-model="gender"
                            class="
                              w-32
                              border
                              rounded-md
                              py-2
                              px-2
                              focus:outline-none
                            "
                          >
                            <option disabled value="">Please select one</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Not to say</option>
                          </select>
                        </div>

                        <div class="flex items-center space-x-2">
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
                            @click="updateUser"
                          >
                            Update User's Details
                          </button>
                          <button
                            type="button"
                            class="
                              py-2
                              px-3
                              bg-red-500
                              text-white
                              font-medium
                              rounded-md
                            "
                            @click="closeModal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { PencilAltIcon, TrashIcon } from "@heroicons/vue/solid";

export default {
  name: "Text",
  data() {
    return {
      email: this.product.email,
      name: this.product.name,
      gender: this.product.gender,
    };
  },

  props: {
    product: Object,
  },
  components: {
    PencilAltIcon,
    TrashIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  setup() {
    const isOpen = ref(false);
    const isShowing = ref(true);

    return {
      isShowing,
      isOpen,
      closeShow(value) {
        isShowing.value = value;
      },
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true;
      },
    };
  },
  methods: {
    deleteUser(id) {
      this.closeShow(false);
      this.$emit("deleteUser", id);
    },
    updateUser() {
      this.$emit("updateUser", this.product.ID, {
        email: this.email,
        name: this.name,
        gender: this.gender,
      });

      this.closeModal();
    },
  },
};
</script>

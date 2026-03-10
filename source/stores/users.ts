import { defineStore } from "pinia"
import { reactive, ref, computed } from "vue"
import { IUser } from "@/types/user";

export const useUsersStore = defineStore("user-data", () => {
    const users = ref<IUser[]>([]);
    
    const getUsers = computed(() => users.value);

    function setUsers(payload: IUser[]) {
        users.value = payload;
    };

    return {
        users,
        getUsers,
        setUsers
    }
})

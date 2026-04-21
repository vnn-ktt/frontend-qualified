import { useStore } from "@nanostores/vue";
import { atom, computed } from "nanostores";
import type { IUser } from "@/types/user";

const $users = atom<IUser[]>([]);

const $getUsers = computed($users, (users) => users);

function setUsers(payload: IUser[]) {
    $users.set(payload);
}

export const useUsersStore = () => {
    const users = useStore($users);
    const getUsers = useStore($getUsers);

    return {
        users,
        getUsers,
        setUsers
    };
};

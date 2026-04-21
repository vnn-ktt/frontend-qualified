import { useStore } from "@nanostores/vue";
import { atom, computed } from "nanostores";
import type { TQuestion } from "@/types/question";

const $questions = atom<TQuestion[]>([]);

const $getQuestions = computed($questions, (questions) => questions);

function setQuestions(payload: TQuestion[]) {
    $questions.set(payload);
}

export const useQuestionsStore = () => {
    const questions = useStore($questions);
    const getQuestions = useStore($getQuestions);

    return {
        questions,
        getQuestions,
        setQuestions
    };
};

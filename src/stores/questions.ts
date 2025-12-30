import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { TTheme } from "@/types/theme";
import type { TQuestion } from "@/types/question";

export const useQuestionsStore = defineStore('question-data', () => {
    const questions = ref<TQuestion[]>([]);

    const getQuestions = computed(() => questions.value);

    function setQuestions(payload: TQuestion[]) {
        questions.value = payload;
    }

    return {
        questions,
        getQuestions,
        setQuestions
    }
})
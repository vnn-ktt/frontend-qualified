<script setup lang="ts">
import { computed, onMounted, provide, watch } from "vue";
import { useStorage, useDark, useToggle } from "@vueuse/core";
import type { TTheme } from "@/types/ui";
import MobileLayout from "@/layouts/MobileLayout.vue";

const defaultGuiSettings = {
  THEME: "theme--light" as TTheme,
};

const GUI_SETTINGS = useStorage("GUI_SETTINGS", defaultGuiSettings);

const currentTheme = computed(() => GUI_SETTINGS.value.THEME);

const isDarkTheme = useDark({
  selector: "body",
  attribute: "class",
  valueDark: "theme--dark",
  valueLight: "theme--light",
  storageKey: null,
});

const toggleTheme = useToggle(isDarkTheme);

watch(
  isDarkTheme,
  (dark) => {
    const theme: TTheme = dark ? "theme--dark" : "theme--light";
    GUI_SETTINGS.value.THEME = theme;
  },
  { immediate: true }
);

onMounted(() => {
  if (GUI_SETTINGS.value.THEME === "theme--dark") {
    isDarkTheme.value = true;
  }
});

provide("app-theme", {
  isDarkTheme,
  toggleTheme,
  currentTheme,
});
</script>

<template>
  <div id="app">
    <MobileLayout
      :is-dark-theme="isDarkTheme"
      @toggle-theme="toggleTheme"
    />
  </div>
</template>

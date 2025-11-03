<template>
  <q-page class="flex flex-center bg-grey-1 q-pa-xl">
    <q-card class="q-pa-xl text-center" flat bordered>
      <q-card-section>
        <div class="text-h5 text-primary">welcome to the qualified</div>
        <div class="text-subtitle2 text-grey-7 q-mt-sm">
          test your javascript and golang skills
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="start quiz"
          size="lg"
          unelevated
          @click="startQuiz"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startQuiz() {
  router.push({name: 'quiz'})
}
</script>

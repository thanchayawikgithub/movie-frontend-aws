<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { mdiEmailOutline, mdiLockOutline, mdiAccountOutline, mdiWindowClose } from '@mdi/js'
const authStore = useAuthStore()
</script>
<template>
  <v-dialog v-model="authStore.showSignupDialog"
    ><v-card :width="480" :height="670" class="mx-auto" rounded="lg" style="font-family: kanit"
      ><v-btn
        style="position: absolute; right: 0"
        class="mr-2 mt-1 close-btn"
        size="large"
        :icon="mdiWindowClose"
        flat
        variant="plain"
        :ripple="false"
        @click="authStore.showSignupDialog = false"
      ></v-btn
      ><v-container fluid style="padding-left: 80px; padding-right: 80px" class="mt-7"
        ><v-row
          ><v-col
            ><p
              style="
                text-align: center;
                font-size: 40px;
                font-weight: bold;
                font-family: 'Times New Roman', Times, serif;
                color: #dc2626;
              "
              class="mb-5"
            >
              SCALA
            </p>
            <v-text-field
              variant="outlined"
              :prepend-inner-icon="mdiEmailOutline"
              label="อีเมล"
              class="mb-7"
              hide-details
            ></v-text-field
            ><v-text-field
              type="password"
              variant="outlined"
              :prepend-inner-icon="mdiLockOutline"
              label="รหัสผ่าน"
              class="mb-7"
              hide-details
            ></v-text-field
            ><v-text-field
              variant="outlined"
              :prepend-inner-icon="mdiAccountOutline"
              label="ชื่อ"
              class="mb-7"
              hide-details
            ></v-text-field
            ><v-text-field
              variant="outlined"
              :prepend-inner-icon="mdiAccountOutline"
              label="นามสกุล"
              class="mb-7"
              hide-details
            ></v-text-field
            ><v-btn
              style="
                width: 100%;
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              :height="50"
              class="mb-7"
              >สมัครสมาชิก</v-btn
            ><v-divider :thickness="1" class="border-opacity-100 mb-7"></v-divider
            ><v-btn
              style="
                width: 100%;
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              :height="50"
              @click="(authStore.showSignupDialog = false), (authStore.showLoginDialog = true)"
              >เข้าสู่ระบบ</v-btn
            ></v-col
          ></v-row
        ></v-container
      ></v-card
    ></v-dialog
  >
</template>
<style scoped>
.close-btn {
  color: #9ca3af;
}
.close-btn:hover {
  color: #b91c1c;
}
</style>

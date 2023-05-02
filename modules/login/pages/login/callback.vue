<template>
  <section>
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <h3 class="mb-0">{{ $t('name') }}</h3>
          </div>
          <div class="card-body">
            <p class="login-box-msg">กำลังดำเนินการเข้าสู่ระบบ</p>
            <p class="login-box-msg">กรุณารอสักครู่ ...</p>
            <div class="social-auth-links text-center mt-1 mb-3">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import {
    setCookie
  } from 'typescript-cookie'
  const liffId = '1660847203-j8ZKMxoB'
  export default defineComponent({
    setup() {
      definePageMeta({
        auth: false
      })
      onMounted(async () => {
        const {
          $liff
        } = useNuxtApp()
        await $liff.init({
            liffId: liffId
          }).then(async () => {
            console.log('liff.init() done onMounted', $liff.isLoggedIn());
            if ($liff.isLoggedIn()) {
              let response = $liff.getIDToken()
              const {
                status,
                data,
                signIn,
                signOut
              } = useAuth()
              let obj = {
                idToken: response
              }
              console.log(response);
              
              signIn("credentials", obj)
            }
          })
          .catch(error => {
            console.log(`liff.init() failed: ${error}`);
            return Promise.reject(error);
          });
      })

      return {

      }
    },

  })
</script>
<style scoped>
  .btn-login-line {
    background-color: #00B900;
    color: #ffffff;
  }
</style>
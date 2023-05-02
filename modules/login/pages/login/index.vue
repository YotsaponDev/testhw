<template>
  <section>
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <h3 class="mb-0">{{ $t('name') }}</h3>
          </div>
          <div class="card-body">
            <p class="login-box-msg">{{ $t('loginPage.title') }}</p>
            <div class="social-auth-links text-center mt-1 mb-3">
              <button class="btn btn-login-line" @click="loginLine()">
                <i class="fab fa-line mr-2 fa-lg"></i>
                {{ $t('loginPage.buttonText') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>

        <!-- <form>
                <select id="locale-select" v-model="$i18n.locale">
                 <option value="en">en</option>
                <option value="th">th</option>
                </select>
              </form> -->
      </div>


    </div>
  </section>
</template>

<script lang="ts">
  import {
    setCookie
  } from 'typescript-cookie'
  const liffId = '1660847203-ZB752mVz'
  export default defineComponent({
    setup() {
      onMounted(async () => {
        const { $liff } = useNuxtApp()
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
              console.log(response, "response");
              setCookie('IDToken', response)
              
              signIn("credentials", obj)
            }
          })
          .catch(error => {
            console.log(`liff.init() failed: ${error}`);
            return Promise.reject(error);
          });
        
      })
      async function loginLine() {
        const { $liff } = useNuxtApp()
        await $liff.init({
            liffId: liffId
          }).then(async () => {
            console.log('liff.init() done');
            if ($liff.isLoggedIn()) {
              let response = $liff.getIDToken()
              setCookie('IDToken', response)
            } else {
              console.log(window.location.href);
              $liff.login();
            }
          })
          .catch(error => {
            console.log(`liff.init() failed: ${error}`);
            return Promise.reject(error);
          });
      }

      return {
        loginLine
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
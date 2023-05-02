<template>
  <!-- Navbar -->
  
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="pushmenu"
          href="#"
        ><i class="fas fa-lg fa-bars" /></a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-lg fa-user" />
        </a>
        <div class="dropdown-menu dropdown-menu dropdown-menu-right">
          <!-- <span class="dropdown-item dropdown-header">15 Notifications</span> -->
          <!-- <div class="dropdown-divider" />
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2" /> 8 friend requests
          </a> -->
          <div class="dropdown-divider" />
          <a href="#" class="dropdown-item" @click="logout()">
            <i class="fas fa-sign-out-alt mr-2" /> Logout
          </a>
          <div class="dropdown-divider" />
          <!-- <a
            href="#"
            class="dropdown-item dropdown-footer"
          >Logout</a> -->
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script lang="ts">
  import {
    setCookie
  } from 'typescript-cookie'
  const liffId = '1660847203-j8ZKMxoB'
  export default defineComponent({
    setup() {
      onMounted(async () => {
       
      })
      async function logout() {
        const { $liff } = useNuxtApp()
        const {
                signOut
              } = useAuth()
        console.log("logout");
        await $liff.init({
            liffId: liffId
          }).then(async () => {
            $liff.logout();
            signOut()
          })
          .catch(error => {
            console.log(`liff.init() failed: ${error}`);
            return Promise.reject(error);
          });
      }

      return {
        logout
      }
    },

  })
</script>
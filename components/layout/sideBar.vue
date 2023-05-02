<template>
    <!-- Main Sidebar Container -->
    <!-- <div class="wrapper"> -->
    <aside class="main-sidebar sidebar-light-navy elevation-4">
        <!-- Brand Logo -->
        <a href="index3.html" class="brand-link">
            <img src="/adminlte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">{{ $t('name') }}</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img v-if="obj.user.avatar" :src="obj.user.avatar" class="img-circle elevation-2" alt="User Image">
                    <img v-else src="/adminlte/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block">{{obj.user.firstName}}</a>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                    <li class="nav-item">
                        <NuxtLink to="/dashboard"
                            :class="[$route.path == '/dashboard' ? 'nav-link active' : 'nav-link']">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>แดชบอร์ด</p>
                        </NuxtLink>
                    </li>
                    <!-- <li class="nav-item">
                        <NuxtLink to="/sales" :class="[$route.path == '/sales' ? 'nav-link active' : 'nav-link']">
                            <i class="nav-icon fas fa-coins"></i>
                            <p>ฝ่ายขาย</p>
                        </NuxtLink>
                    </li> -->
                    <!-- <li class="nav-item">
                        <NuxtLink to="/sales/create-ticket"
                            :class="[$route.path == '/sales/create-ticket' ? 'nav-link active' : 'nav-link']">
                            &emsp;<i class="nav-icon fas fa-file-invoice"></i>
                            <p>สร้างใบงาน</p>
                        </NuxtLink>
                    </li> -->
                    <li :class="['nav-item has-treeview', $route.path == '/sales/create-ticket' ? 'menu-open' : '']">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fas fa-coins"></i>
                            <p>ฝ่ายขาย <i class="right fas fa-angle-left" /></p>
                        </a>
                        <ul class="nav nav-treeview"
                            :style="[$route.path == '/sales/create-ticket' ? 'display: block;' : 'display: none;']">
                            <li class="nav-item">
                                <NuxtLink to="/sales/create-ticket"
                                    :class="[$route.path == '/sales/create-ticket' ? 'nav-link active' : 'nav-link']">
                                    <i class="nav-icon fas fa-file-invoice"></i>
                                    <p>สร้างใบงาน</p>
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                    <!-- <li class="nav-item">
                        <NuxtLink to="/coordinate"
                            :class="[$route.path == '/coordinate' ? 'nav-link active' : 'nav-link']">
                            <i class="nav-icon fas fa-globe"></i>
                            <p>ประสานงานจีน</p>
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/account" :class="[$route.path == '/account' ? 'nav-link active' : 'nav-link']">
                            <i class="nav-icon fas fa-file-invoice-dollar"></i>
                            <p>บัญชี</p>
                        </NuxtLink>
                    </li> -->
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
    <!-- </div> -->
</template>

<script lang="ts">
  import {
    onMounted,
    reactive
  } from 'vue';
    export default defineComponent({
        components: {

        },

        setup() {
            const obj = reactive({
                user: {
                    avatar: null,
                    firstName: null
                }
            })
            onMounted(async () => {
                const auth = useAuth()
                if(auth.data.value){
                    obj.user = auth.data.value?.user
                }
            })

            return {
                obj
            }
        },

    })
</script>
<style scoped>

</style>
<template>
    <div class="sidebar-mini layout-fixed" id="layout-default" style="height: auto;padding: 0;">
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                            @click="toggleIconBars()">
                            <i class="fas fa-bars"></i>
                        </a>
                    </li>
                </ul>
                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <!-- Messages Dropdown Menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link" data-toggle="dropdown" href="#">
                            <i class="far fa-comments"></i>
                            <span class="badge badge-danger navbar-badge">3</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="#" class="dropdown-item"></a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item"></a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item"></a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    <!-- Notifications Dropdown Menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link" data-toggle="dropdown" href="#">
                            <i class="far fa-bell"></i>
                            <span class="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span class="dropdown-item dropdown-header">15 Notifications</span>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-envelope mr-2"></i>
                                4 new messages
                                <span class="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <!-- Main Sidebar Container -->
            <aside class="main-sidebar sidebar-light-navy elevation-4">
                <!-- Brand Logo -->
                <a href="../index3.html" class="brand-link">
                    <span class="brand-text font-weight-light">HAWA Back Office</span>
                </a>
                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul
                            class="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false">

                            <li class="nav-item">
                                <NuxtLink to="/dashboard" class="nav-link">
                                    <i class="nav-icon fas fa-tachometer-alt"></i>แดชบอร์ด</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink to="/sales" class="nav-link">
                                    <i class="nav-icon fas fa-coins"></i>ฝ่ายขาย</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink to="/coordinate" class="nav-link">
                                    <i class="nav-icon fas fa-globe"></i>ประสานงานจีน</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink to="/account" class="nav-link">
                                    <i class="nav-icon fas fa-file-invoice-dollar"></i>บัญชี</NuxtLink>
                            </li>
                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
            </aside>
            <slot/>
            <footer class="main-footer">
                <div class="float-right d-none d-sm-block">
                    <b>Version</b>
                    1.0.0
                </div>
                <strong>Copyright &copy; 2023 HAWA All rights reserved.
                </strong>
            </footer>
            <!-- Control Sidebar -->
            <aside class="control-sidebar control-sidebar-dark">
                <!-- Control sidebar content goes here -->
            </aside>
            <!-- /.control-sidebar -->
            <div id="sidebar-overlay"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, reactive} from 'vue'

    export default defineComponent({
        setup() {
            const obj = reactive({
                windowSize: {
                    width: 0,
                    height: 0
                }
            })

            onMounted(() => {
                console.log("onMounted");
                window.addEventListener("resize", handleResize);
                handleResize()
            })
            function handleResize() {
                let el : any = document.getElementById("layout-default")
                let so:any = document.getElementById("sidebar-overlay")

                if (window.innerWidth < 1010) {
                  console.log(el.className, "el.className");
                  
                    if(el.className != "sidebar-mini layout-fixed sidebar-open"){
                      el.className = "sidebar-mini sidebar-closed sidebar-collapse"
                    }
                } else {
                    el.className = "sidebar-mini"
                    so.style.display = "none"
                }
                obj.windowSize.width = window.innerWidth
                obj.windowSize.height = window.innerHeight
                console.log(window.innerWidth, window.innerHeight);
            }

            function toggleIconBars() {
                let el : any = document.getElementById("layout-default")
                let so:any = document.getElementById("sidebar-overlay")
                console.log(obj.windowSize);
                if (obj.windowSize.width < 992) {
                    el.className = "sidebar-mini layout-fixed sidebar-open"
                    so.style.display = "block"
                } else {
                  el.className = "sidebar-mini layout-fixed sidebar-collapse"
                }
            }
            return {toggleIconBars}
        }
    })
</script>
<style scoped></style>
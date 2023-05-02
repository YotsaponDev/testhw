<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper kanban">
    <section class="content-header pb-0">
      <div class="container-fluid">
        <div class="row mb-3">
          <div class="col-sm-6">
            <h1>หน้าจัดการงาน</h1>
          </div>
          <div class="col-sm-6 d-none d-sm-block">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
        <Search />
      </div>
    </section>

    <section class="content pb-3">
      <div class="container-fluid" style="height: 87%!important;">
        <div class="card card-row card-secondary">
          <div class="card-header">
            <h3 class="card-title">
              Sales (2 Tickets)
            </h3>
          </div>
          <div class="card-body">
            <Ticket v-for="item in obj.data.ticketLane1" :key="item" :lane="1" :data="item" />
          </div>
        </div>
        <div class="card card-row card-primary">
          <div class="card-header">
            <h3 class="card-title">
              ประสานงานจีน (2 Tickets)
            </h3>
          </div>
          <div class="card-body">
            <Ticket v-for="item in obj.data.ticketLane2" :key="item" :lane="2" :data="item" />
          </div>
        </div>
        <div class="card card-row card-default">
          <div class="card-header bg-info">
            <h3 class="card-title">
              บัญชี (2 Tickets)
            </h3>
          </div>
          <div class="card-body">
            <Ticket v-for="item in obj.data.ticketLane3" :key="item" :lane="3" :data="item" />
          </div>
        </div>
        <div class="card card-row card-warning">
          <div class="card-header">
            <h3 class="card-title">
              รอลูกค้าจ่ายเงิน (Sales) (2 Tickets)
            </h3>
          </div>
          <div class="card-body">
            <Ticket v-for="item in obj.data.ticketLane4" :key="item" :lane="4" :data="item" />
          </div>
        </div>
        <div class="card card-row card-success">
          <div class="card-header">
            <h3 class="card-title">
              Confirm สั่งซื้อ (ประสานงานจีน)
            </h3>
          </div>
          <div class="card-body">
            <Ticket v-for="item in obj.data.ticketLane5" :key="item" :lane="5" :data="item" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive
  } from 'vue';
  import {
    Form,
    Field,
  } from "vee-validate";
  import Search from '../../components/search.vue'
  import Ticket from '../../components/ticket.vue'
  export default defineComponent({
    components: {
      Form,
      Field,
      Search,
      Ticket
    },
    setup() {
      const {
        $axios
      } = useNuxtApp()
      const obj = reactive({
        data: {
          ticketLane1: [],
          ticketLane2: [],
          ticketLane3: [],
          ticketLane4: [],
          ticketLane5: [],
          initSearch:{
            term: null,
            type: null,
            dateFrom: null,
            dateTo: null
          } 
        }
      })
      onMounted(async () => {
        await $axios
          .post("/api/Ticket/Search", obj.data.initSearch)
          .then(res => {
            console.log(res);
            for (const item of res.data) {
              switch (item.currentLaneId) {
                case 1:
                  obj.data.ticketLane1.push(item)
                  break;
                case 2:
                  obj.data.ticketLane2.push(item)
                  break;
                case 3:
                  obj.data.ticketLane3.push(item)
                  break;
                case 4:
                  obj.data.ticketLane4.push(item)
                  break;
                case 5:
                  obj.data.ticketLane5.push(item)
                  break;
                default:
                  break;
              }
            }
            
          })
          .catch(err => {})
      })

      function submitSearch(data: any) {
        console.log(data);
      }

      return {
        submitSearch,
        obj
      }
    },

  })
</script>
<style scoped>
  .content-wrapper.kanban .card.card-row {
    width: 300px!important;
  }
  .content-wrapper.kanban .content-header+.content {
    height: calc(96% - ((2 * 15px) + (1.8rem * 1.2))) !important;
  }
</style>
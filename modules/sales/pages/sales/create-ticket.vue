<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h1>Sales Create Ticket</h1>
          </div>
          <div class="col-sm-6 d-none d-sm-block">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Sales</a></li>
              <li class="breadcrumb-item active">Create Ticket</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content pb-3">
      <div class="container h-100">
        <Form @submit="submit" ref="createTicket">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col text-right">
                  วันที่ {{ fnDateNow() }}
                </div>
              </div>
              <div class="row">
                <label for="salesCTCustomer" class="col-3 col-sm-2 col-form-label">
                  ลูกค้า
                </label>
                <div class="col col-sm-4">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" data-toggle="modal" data-target="#salesCTSearchCustomer"
                      id="salesCTBtnSearchCustomer">
                      <span class="input-group-text"><i class="fas fa-search" /></span>
                    </div>
                    <Field name="salesCTCustomer" rules="" label="ลูกค้า" v-slot="{ field, errors }">
                      <input readonly type="text"
                        :class="['form-control', 'custom-readonly', errors[0] ? 'is-invalid' : '']" id="salesCTCustomer"
                        v-bind="field" data-toggle="modal" data-target="#salesCTSearchCustomer">
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </Field>
                  </div>
                </div>
                <div class="col-2 col-sm-1">
                  <nuxt-link :to="'/sales/add-customer'">
                    <button type="button" class="btn btn-outline-dark"><i class="fas fa-plus" /></button>
                  </nuxt-link>
                </div>
              </div>
              <div class="form-group row">
                <label for="salesCTContact" class="col-3 col-sm-2 col-form-label">
                  ช่องทาง
                </label>
                <div class="col col-sm-4">
                  <Field name="salesCTChannelType" rules="required" label="ลูกค้า" v-slot="{ field, errors }">
                    <select v-bind="field" :class="['form-control', 'custom-readonly', errors[0] ? 'is-invalid' : '']"
                      id="salesCTChannelType">
                      <option v-for="(item, index) in obj.data.channelType" :value="item.id" :key="index">
                        {{ item.name }}</option>
                    </select>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </Field>
                </div>
              </div>
              <div class="form-group row">
                <label for="salesCTContact" class="col-3 col-sm-2 col-form-label">
                  Sales
                </label>
                <div class="col col-sm-4">
                  <select class="form-control" id="salesCTSales">
                    <option v-for="(item, index) in obj.data.sales" :value="item.id" :key="index" 
                    :selected="item.id == obj.data.user.id ? 'selected': null">{{ item.firstName }}</option>

                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <Field name="salesCTStoreName" rules="required|max:255" label="ชื่อร้านค้า" v-slot="{ field, errors }">
                  <label for="salesCTStoreName" class="col-3  col-sm-2 col-form-label">
                    ชื่อร้านค้า
                  </label>
                  <div class="col-5 col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="salesCTStoreName" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>

              <productTable />
              <hr>
              <specialRequest ref="sr" />
            </div>
          </div>
          <div class="row">
            <div class="col text-center">
              <button type="submit" class="btn btn-primary">เพิ่ม</button>
            </div>
          </div>
        </Form>
      </div>
      <!-- modal ค้นหาลูกค้า -->
      <searchCustomerModal @chooseCustomer="chooseCustomer" />
    </section>
  </div>
</template>

<script lang="ts">
  import searchCustomerModal from '../../components/searchCustomerModal.vue'
  import productTable from '../../components/productTable.vue';
  import specialRequest from '../../components/specialRequest.vue';
  import {
    defineComponent,
    onMounted,
    ref,
    reactive
  } from 'vue';
  import {
    Form,
    Field,
  } from "vee-validate";
  import {
    useSalesStore
  } from '../../store'
  export default defineComponent({
    components: {
      searchCustomerModal,
      productTable,
      Form,
      Field,
      specialRequest
    },
    setup() {
      const {
        $axios
      } = useNuxtApp()
      const salesStore = useSalesStore();
      const sr = ref(null);
      const createTicket = ref(null);
      const obj = reactive({
        data: {
          channelType: [],
          sales: [],
          user: {
            id: null
          }
        }
      })
      onMounted(async () => {
        const auth = useAuth()
        if (auth.data.value) {
          obj.data.user.id = auth.data.value.user.id
        }
        await $axios
          .get("/api/CustomerChannel")
          .then(res => {
            obj.data.channelType = res.data
          })
          .catch(err => {})
        await $axios
          .get("/api/User/1")
          .then(res => {
            obj.data.sales = res.data
          })
          .catch(err => {})

        // console.log(auth.data.value);

      })

      function chooseCustomer(data: any) {
        salesStore.setCustomerId(data.id)
        createTicket.value.setFieldValue('salesCTCustomer', data.firstName + ' ' + data.lastName);
      }

      async function submit(data: any) {
        let newObj = JSON.parse(JSON.stringify(salesStore.ct));
        newObj.customerChannelId = data.salesCTChannelType
        newObj.shopName = data.salesCTStoreName

        console.log(newObj);
        newObj.ticketProducts.map((i:any)=>{
          i.productLink = "test"
        })

        for (const data of sr.value.obj.data.request) {
          console.log(data);
          if (data.value == '999') {
            newObj.specialRequest.push(data.valueOther)
          } else {
            newObj.specialRequest.push(data.value)
          }
        }

        await $axios
          .post("/api/Ticket/Create", newObj)
          .then(res => {
            // console.log(res);
          })
          .catch(err => {
            console.log(err);

          })
      }

      function fnDateNow() {
        let month_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date()
        return date.getFullYear() + ' - ' + month_short[date.getMonth()] + ' - ' + date.getDate()
      }

      return {
        submit,
        sr,
        obj,
        fnDateNow,
        chooseCustomer,
        createTicket
      }
    },

  })
</script>
<style scoped>
  .custom-readonly {
    background-color: #ffffff;
  }

  #salesCTBtnSearchCustomer {
    cursor: pointer;
  }
</style>
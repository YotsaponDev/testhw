<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h1>กรอกข้อมูล Sales (รอบที่ 2)</h1>
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
              <div class="row mb-4">
                <div class="col">
                  <div class="d-flex justify-content-center">
                    <div class="text-center">
                      <h5 class="mb-0" style="border-bottom: 1px solid black;">Ticket No.</h5>
                      {{ salesStore.ticket.ticketNumber }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <label for="salesTKCustomer" class="col-3 col-sm-2 col-form-label">
                  ลูกค้า
                </label>
                <div class="col col-sm-4">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" id="salesTKCustomer">
                      <span class="input-group-text"><i class="fas fa-search" /></span>
                    </div>
                    <input readonly type="text" :class="['form-control', 'custom-readonly']" id="salesTKCustomer"
                      :value="salesStore.ticket.customer.firstName">
                  </div>
                </div>
                <div class="col-2 col-sm-1">
                  <button type="button" class="btn btn-outline-dark" data-toggle="modal"
                    data-target="#salesTKCustomerInfo"><i class="fas fa-info" /></button>
                </div>
              </div>
              <div class="modal fade" id="salesTKCustomerInfo" tabindex="-1" aria-labelledby="salesTKCustomerInfoLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="salesCTSearchCustomerLabel">ข้อมูลที่อยู่</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col">
                          <h5>ที่อยู่ปัจจุบัน</h5>
                          <b>House No.:</b> {{ salesStore.ticket.customer.currentAddress.houseNo }} <b>Village:</b>
                          {{ salesStore.ticket.customer.currentAddress.village }} <br>
                          <b>Village No.:</b> {{ salesStore.ticket.customer.currentAddress.villageNo }} <b>Alley:</b>
                          {{ salesStore.ticket.customer.currentAddress.alley }}
                          <b>Road:</b> {{ salesStore.ticket.customer.currentAddress.houseNo }} <br>
                          <b>Sub-District:</b> {{ salesStore.ticket.customer.currentAddress.subDistrict }}
                          <b>District:</b> {{ salesStore.ticket.customer.currentAddress.district }} <br>
                          <b>Province:</b> {{ salesStore.ticket.customer.currentAddress.province }} <b>Postal Code:</b>
                          {{ salesStore.ticket.customer.currentAddress.postalCode }} <br>
                        </div>
                        <div class="col">
                          <h5>ที่อยู่สำหรับออกใบกำกับภาษี</h5>
                          <b>House No.:</b> {{ salesStore.ticket.customer.billingAddress.houseNo }} <b>Village:</b>
                          {{ salesStore.ticket.customer.billingAddress.village }} <br>
                          <b>Village No.:</b> {{ salesStore.ticket.customer.billingAddress.villageNo }} <b>Alley:</b>
                          {{ salesStore.ticket.customer.billingAddress.alley }}
                          <b>Road:</b> {{ salesStore.ticket.customer.billingAddress.houseNo }} <br>
                          <b>Sub-District:</b> {{ salesStore.ticket.customer.billingAddress.subDistrict }}
                          <b>District:</b> {{ salesStore.ticket.customer.billingAddress.district }} <br>
                          <b>Province:</b> {{ salesStore.ticket.customer.billingAddress.province }} <b>Postal Code:</b>
                          {{ salesStore.ticket.customer.billingAddress.postalCode }} <br>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="salesTKContact" class="col-3 col-sm-2 col-form-label">
                  Sales
                </label>
                <div class="col col-sm-4">
                  <!-- <select class="form-control" id="salesTKSales">
                    <option v-for="(item, index) in obj.data.sales" :value="item.id" :key="index"
                      :selected="item.id == obj.data.user.id ? 'selected': null">{{ item.firstName }}</option>

                  </select> -->
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <Field name="salesTKStoreName" rules="required|max:255" label="ชื่อร้านค้า" v-slot="{ field, errors }"
                  v-model="salesStore.ticket.shopName">
                  <label for="salesTKStoreName" class="col-3  col-sm-2 col-form-label">
                    ชื่อร้านค้า
                  </label>
                  <div class="col-5 col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="salesTKStoreName" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>

              <productTableRound2 />
              <hr>
              <specialRequestRound2 v-if="salesStore.ticket.id" ref="sr" />
              <br>
              <b>ค่าส่งสินค้าในระบบ</b> 555 หยวน <br>
              <b>ต่อเหลือ</b> 555 หยวน <br><br>
              <Field name="isIncludeVat" v-slot="{ field, errors }" rules="required" label="ภาษี">
                <div class="mb-3">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" v-bind="field" value="true" v-model="field.value"
                        aria-invalid="true">Vat
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" v-bind="field" value="false" v-model="field.value"
                        aria-invalid="true">No Vat
                    </label>
                  </div>
                  <span class="invalid-feedback-show">{{ errors[0] }}</span>
                </div>
              </Field>
              <hr>
              <h5>รวม</h5>
              <b>ราคาสินค้า</b> {{totalPrice()}} หยวน
              <div class="form-group row">
                <Field name="salesTKShippingFee2" rules="required|max:255" label="ราคาค่าส่ง" v-model="salesStore.ticket.deliveryPrice"
                  v-slot="{ field, errors }">
                  <label for="salesTKShippingFee2" class="col-3 col-sm-2 col-form-label">
                    ราคาค่าส่ง (หยวน)
                  </label>
                  <div class="col-5 col-sm-3">
                    <input type="number" :class="['form-control', errors[0] ? 'is-invalid' : '']" style="text-align: right;" @blur="priceBlur('ticket.deliveryPrice')"
                      @keypress="isNumberKey($event)" id="salesTKShippingFee2" v-bind="field">
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <b>ราคารวม</b> {{price()}} หยวน
              <div class="form-group row mt-3">
                <Field name="salesTKNextOperation" rules="required" label="Next Operation" v-slot="{ field, errors }">
                  <label for="salesTKNextOperation" class="col-3 col-sm-2 col-form-label">
                    Next Operation
                  </label>
                  <div class="col-5 col-sm-3">
                    <select v-bind="field" :class="['form-control', errors[0] ? 'is-invalid' : '']"
                      id="salesTKNextOperation">
                      <option :value="2">ประสานงานจีน</option>
                      <option :value="3">บัญชี</option>
                    </select>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col text-center">
              <button type="submit" class="btn btn-primary mr-2">ยืนยัน</button>
              <NuxtLink to="/dashboard" tag="button" class="btn btn-secondary">ยกเลิก</NuxtLink>
              <!-- <button type="button" class="btn btn-secondary" ></button> -->
            </div>
          </div>
        </Form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import productTableRound2 from '../../../components/productTableRound2.vue';
  import specialRequestRound2 from '../../../components/specialRequestRound2.vue';
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
  } from '../../../store'
  export default defineComponent({
    components: {
      productTableRound2,
      Form,
      Field,
      specialRequestRound2
    },
    setup() {
      const {
        $axios
      } = useNuxtApp()
      const salesStore = useSalesStore();
      const route = useRoute();
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
          .get("/api/Ticket/" + route.params.id)
          .then(res => {
            console.log(res);
            salesStore.initTicket(res.data)
          })
          .catch(err => {})

        // console.log(auth.data.value);

      })

      async function submit(data: any) {
        let newObj = JSON.parse(JSON.stringify(salesStore.ct));
        newObj.customerChannelId = data.salesTKChannelType
        newObj.shopName = data.salesTKStoreName

        console.log(newObj);
        newObj.ticketProducts.map((i: any) => {
          i.productLink = "test"
        })
        newObj.specialRequest = []
        for (const data of sr.value.obj.data.request) {
          // console.log(data);
          if (data.name == '999') {
            newObj.specialRequest.push({
              name: data.nameOther,
              isCompleted: data.isCompleted
            })
          } else {
            newObj.specialRequest.push({
              name: data.name,
              isCompleted: data.isCompleted
            })
          }
        }

        console.log(newObj.specialRequest);

        // await $axios
        //   .post("/api/Ticket/Create", newObj)
        //   .then(res => {
        //     // console.log(res);
        //   })
        //   .catch(err => {
        //     console.log(err);

        //   })
      }

      function isNumberKey(evt: any) {
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode == 46) {
          return true
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          evt.preventDefault();
        } else {
          return true;
        }
      }

      function fnDateNow() {
        let month_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date()
        return date.getFullYear() + ' - ' + month_short[date.getMonth()] + ' - ' + date.getDate()
      }

      function totalPrice() {
        let total = 0
        let obj = salesStore.ticket.ticketProducts
        for (let i in obj) {
          for (let j in obj[i].ticketProductItems) {
            total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceFinal)
          }
        }
        salesStore.setTotalPrice(total.toFixed(2))
        return total.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      }

      function price() {
        let total = 0
        let obj = salesStore.ticket.ticketProducts
        let dp:any = salesStore.ticket.deliveryPrice
        for (let i in obj) {
          for (let j in obj[i].ticketProductItems) {
            total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceFinal)
          }
        }
        let sum:any = parseFloat(total.toFixed(2)) + parseFloat(Number.parseFloat(dp).toFixed(2))
        return sum.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      }

      function priceBlur(key:any){
        salesStore.priceBlur(key)
      }

      return {
        salesStore,
        submit,
        sr,
        obj,
        fnDateNow,
        createTicket,
        isNumberKey,
        totalPrice,
        price,
        priceBlur
      }
    },

  })
</script>
<style scoped>
  .custom-readonly {
    background-color: #ffffff;
  }

  #salesTKBtnSearchCustomer {
    cursor: pointer;
  }

  .invalid-feedback-show {
    display: block;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
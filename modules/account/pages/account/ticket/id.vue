<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h1>กรอกข้อมูลฝ่ายบัญชี</h1>
          </div>
          <div class="col-sm-6 d-none d-sm-block">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Account</a></li>
              <li class="breadcrumb-item active">Ticket</li>
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
                      {{ accountStore.ticket.ticketNumber }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <label for="accountTKCustomer" class="col-3 col-sm-2 col-form-label">
                  ลูกค้า
                </label>
                <div class="col col-sm-4">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend" id="accountTKCustomer">
                      <span class="input-group-text"><i class="fas fa-search" /></span>
                    </div>
                    <input readonly type="text" :class="['form-control', 'custom-readonly']" id="accountTKCustomer"
                      :value="accountStore.ticket.customer.firstName">
                  </div>
                </div>
                <div class="col-2 col-sm-1">
                  <button type="button" class="btn btn-outline-dark" data-toggle="modal"
                    data-target="#accountTKCustomerInfo"><i class="fas fa-info" /></button>
                </div>
              </div>
              <div class="modal fade" id="accountTKCustomerInfo" tabindex="-1"
                aria-labelledby="accountTKCustomerInfoLabel" aria-hidden="true">
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
                          <b>House No.:</b> {{ accountStore.ticket.customer.currentAddress.houseNo }} <b>Village:</b>
                          {{ accountStore.ticket.customer.currentAddress.village }} <br>
                          <b>Village No.:</b> {{ accountStore.ticket.customer.currentAddress.villageNo }} <b>Alley:</b>
                          {{ accountStore.ticket.customer.currentAddress.alley }}
                          <b>Road:</b> {{ accountStore.ticket.customer.currentAddress.houseNo }} <br>
                          <b>Sub-District:</b> {{ accountStore.ticket.customer.currentAddress.subDistrict }}
                          <b>District:</b> {{ accountStore.ticket.customer.currentAddress.district }} <br>
                          <b>Province:</b> {{ accountStore.ticket.customer.currentAddress.province }} <b>Postal
                            Code:</b>
                          {{ accountStore.ticket.customer.currentAddress.postalCode }} <br>
                        </div>
                        <div class="col">
                          <h5>ที่อยู่สำหรับออกใบกำกับภาษี</h5>
                          <b>House No.:</b> {{ accountStore.ticket.customer.billingAddress.houseNo }} <b>Village:</b>
                          {{ accountStore.ticket.customer.billingAddress.village }} <br>
                          <b>Village No.:</b> {{ accountStore.ticket.customer.billingAddress.villageNo }} <b>Alley:</b>
                          {{ accountStore.ticket.customer.billingAddress.alley }}
                          <b>Road:</b> {{ accountStore.ticket.customer.billingAddress.houseNo }} <br>
                          <b>Sub-District:</b> {{ accountStore.ticket.customer.billingAddress.subDistrict }}
                          <b>District:</b> {{ accountStore.ticket.customer.billingAddress.district }} <br>
                          <b>Province:</b> {{ accountStore.ticket.customer.billingAddress.province }} <b>Postal
                            Code:</b>
                          {{ accountStore.ticket.customer.billingAddress.postalCode }} <br>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="accountTKContact" class="col-3 col-sm-2 col-form-label">
                  Sales
                </label>
                <div class="col col-sm-4">
                  <!-- <select class="form-control" id="accountTKSales">
                    <option v-for="(item, index) in obj.data.sales" :value="item.id" :key="index"
                      :selected="item.id == obj.data.user.id ? 'selected': null">{{ item.firstName }}</option>

                  </select> -->
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="row mb-4">
                <div class="col">
                  <b>ชื่อร้านค้า:</b> {{ accountStore.ticket.shopName }}
                </div>
              </div>

              <productTableAccount />
              <hr>
              <br>
              <h5>Summary</h5>
              <b>มี Vat/ไม่มี Vat</b><br>
              <b>ราคารวมทั้งหมด</b> {{price()}} หยวน <br>
              <div class="form-group row mt-3">
                <Field name="accountTKQuotation" rules="required" label="อัพโหลด Quotation" v-model="obj.data.quotation"
                  v-slot="{ field, errors, handleChange, handleBlur }">
                  <label for="accountTKQuotation" class="col-3 col-sm-2 col-form-label">
                    อัพโหลด Quotation
                  </label>
                  <div class="col-5 col-sm-3">
                    <input type="file" class="custom-file-input" id="customerDataKYC" @change="handleChange"
                      @blur="handleBlur">
                    <label class="custom-file-label" for="customerDataKYC">
                      {{obj.data.quotation?.size > 0 ? obj.data.quotation.name : "Choose file" }}
                    </label>
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row mt-3">
                <Field name="accountTKNextOperation" rules="required" label="Next Operation" v-slot="{ field, errors }">
                  <label for="accountTKNextOperation" class="col-3 col-sm-2 col-form-label">
                    Next Operation
                  </label>
                  <div class="col-5 col-sm-3">
                    <select v-bind="field" :class="['form-control', errors[0] ? 'is-invalid' : '']"
                      id="accountTKNextOperation">
                      <option :value="4" selected>Sales</option>
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
  import productTableAccount from '../../../components/productTableAccount.vue';
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
    useAccountStore
  } from '../../../store'
  export default defineComponent({
    components: {
      productTableAccount,
      Form,
      Field
    },
    setup() {
      const {
        $axios
      } = useNuxtApp()
      const accountStore = useAccountStore();
      const route = useRoute();
      const sr = ref(null);
      const createTicket = ref(null);
      const obj = reactive({
        data: {
          channelType: [],
          sales: [],
          user: {
            id: null
          },
          quotation:  new File([""], "")
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
            accountStore.initTicket(res.data)
          })
          .catch(err => {})

        // console.log(auth.data.value);

      })

      async function submit(data: any) {
        let newObj = JSON.parse(JSON.stringify(accountStore.ticket));
        newObj.customerChannelId = data.accountTKChannelType
        newObj.shopName = data.accountTKStoreName

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
        let obj = accountStore.ticket.ticketProducts
        for (let i in obj) {
          for (let j in obj[i].ticketProductItems) {
            total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceFinal)
          }
        }
        accountStore.setTotalPrice(total.toFixed(2))
        return total.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      }

      function price() {
        let total = 0
        let obj = accountStore.ticket.ticketProducts
        let dp: any = accountStore.ticket.deliveryPrice
        for (let i in obj) {
          for (let j in obj[i].ticketProductItems) {
            total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceFinal)
          }
        }
        let sum: any = parseFloat(total.toFixed(2)) + parseFloat(Number.parseFloat(dp).toFixed(2))
        return sum.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      }

      return {
        accountStore,
        submit,
        sr,
        obj,
        fnDateNow,
        createTicket,
        isNumberKey,
        totalPrice,
        price
      }
    },

  })
</script>
<style scoped>
  .custom-readonly {
    background-color: #ffffff;
  }

  #accountTKBtnSearchCustomer {
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
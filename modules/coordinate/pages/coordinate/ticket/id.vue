<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h1>ประสานงานจีน</h1>
          </div>
          <!-- <div class="col-sm-6 d-none d-sm-block">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Sales</a></li>
              <li class="breadcrumb-item active">Create Ticket</li>
            </ol>
          </div> -->
        </div>
      </div>
    </section>
    <section class="content pb-3">
      <div class="container h-100">
        <Form @submit="submit">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="d-flex justify-content-center">
                    <div class="text-center">
                      <h5 class="mb-0" style="border-bottom: 1px solid black;">Ticket No.</h5>
                      {{ coordinateStore.ticket.ticketNumber }}
                    </div>
                  </div>
                </div>
              </div>
              <b>ลูกค้า: </b> {{ coordinateStore.ticket.customer.firstName }} <br>
              <b>Sales: </b> <br>
              <b>ชื่อร้านค้า: </b> {{ coordinateStore.ticket.shopName }} <br><br>
              <productTableCoordinate :ticket="obj.data.ticket" />
              <hr>
              <Field v-for="(item, key) in coordinateStore.ticket.specialRequestJson"
                :name="'coorSpecialRequestJson'+key" rules="" :label="item.name" v-slot="{ field, errors }"
                type="checkbox" :key="key" :value="true" v-model="item.isCompleted">
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" :class="['form-check-input', errors[0] ? 'is-invalid' : '']" v-bind="field"
                      :value="true" />{{ item.name }}
                  </label>
                </div>
              </Field>
              <Field name="deliveryFeeFromSystem" rules="required|min_value:0" label="ค่าส่งสินค้าในระบบ"
                v-slot="{ field, errors }">
                <div class="row mb-2 mt-2">
                  <div class="col-12 col-sm-3">
                    <label for="deliveryFeeFromSystem">ค่าส่งสินค้าในระบบ</label>
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" v-bind="field" type="text"
                      id="deliveryFeeFromSystem" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </div>
              </Field>
              <Field name="deliveryFeeAfterDiscount" rules="required|min_value:0" label="ต่อเหลือ"
                v-slot="{ field, errors }">
                <div class="row mb-3">
                  <div class="col-12 col-sm-3">
                    <label for="deliveryFeeAfterDiscount">ต่อเหลือ</label>
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" v-bind="field" type="text"
                      id="deliveryFeeAfterDiscount" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </div>
              </Field>
              <Field name="productReadiness" v-slot="{ field, errors }" rules="required" label="ความพร้อมจัดส่ง">
                <div class="mb-3">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" v-bind="field" :value="'1'" v-model="field.value"
                        aria-invalid="true">สินค้าพร้อมส่ง
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" v-bind="field" :value="'0'" v-model="field.value"
                        aria-invalid="true">สินค้ารอการผลิต
                    </label>
                  </div>
                  <span class="invalid-feedback-show">{{ errors[0] }}</span>
                </div>
              </Field>
              <Field name="estimatedDeliveryDate" rules="required" label="เวลาที่ใช้ในการผลิต"
                v-slot="{ field, errors }">
                <div class="row mb-3">
                  <div class="col-12 col-sm-3">
                    <label for="estimatedDeliveryDate">เวลาที่ใช้ในการผลิต</label>
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" v-bind="field" type="text"
                      id="estimatedDeliveryDate" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </div>
              </Field>
            </div>
          </div>
          <div class="row">
            <div class="col text-center">
              <button type="submit" class="btn btn-primary mr-2">ยืนยัน</button>
              <button type="button" class="btn btn-secondary">ยกเลิก</button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import productTableCoordinate from '../../../components/productTableCoordinate.vue';
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
    useCoordinateStore
  } from '../../../store'
  import Swal from 'sweetalert2'

  export default defineComponent({
    components: {
      productTableCoordinate,
      Form,
      Field
    },
    setup() {
      const {
        $axios
      } = useNuxtApp()
      const coordinateStore = useCoordinateStore();
      const route = useRoute();
      const sr = ref(null);
      const obj = reactive({
        data: {
          ticket: {
            assignneeId: null,
            customerChannelId: null,
            customerId: null,
            shopName: null,
            ticketProducts: [

            ],
            specialRequest: [],
            totalQty: 0,
            totalPrice: 0
          },
          updatedByCoordinator: {
            id: 0,
            ticketProducts: [

            ],
            specialRequestJson: [{
              isCompleted: true,
            }],
            ticketCustomerJson: {
              productReadiness: 0,
              estimatedDeliveryDate: "2023-04-27T14:02:33.769Z"
            },
            ticketDeliveryJson: {
              deliveryFeeFromSystem: 0,
              deliveryFeeAfterDiscount: 0,
            },
            discountAmount: ""
          }
        }
      })
      onMounted(async () => {
        console.log(route.params.id);
        await $axios
          .get("/api/Ticket/" + route.params.id)
          .then(res => {
            console.log(res);
            coordinateStore.initTicket(res.data)
          })
          .catch(err => {})

      })

      function discountAmount(data:any) {
        let total = 0
        let obj = data
        for (let i in obj) {
          for (let j in obj[i].ticketProductItems) {
            total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceAfterDiscount)
          }
        }
        coordinateStore.setTotalPrice(total.toFixed(2))
        return total.toFixed(2).toString()
      }

      async function submit(data: any) {
        let newObj = JSON.parse(JSON.stringify(coordinateStore.ticket));
        obj.data.updatedByCoordinator.id = newObj.id
        obj.data.updatedByCoordinator.ticketProducts = newObj.ticketProducts
        obj.data.updatedByCoordinator.specialRequestJson = newObj.specialRequestJson
        obj.data.updatedByCoordinator.ticketCustomerJson.productReadiness = Number(data.productReadiness)
        obj.data.updatedByCoordinator.ticketDeliveryJson.deliveryFeeFromSystem = data.deliveryFeeFromSystem
        obj.data.updatedByCoordinator.ticketDeliveryJson.deliveryFeeAfterDiscount = data.deliveryFeeAfterDiscount

        obj.data.updatedByCoordinator.specialRequestJson.map((i: any) => {
          console.log(i);
          if (!i.isCompleted) {
            i.isCompleted = false
          }
        })

        obj.data.updatedByCoordinator.discountAmount = discountAmount(obj.data.updatedByCoordinator.ticketProducts)

        console.log(data, obj.data.updatedByCoordinator);
        await $axios
          .post("/api/Ticket/UpdatedByCoordinator", obj.data.updatedByCoordinator)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: 'Successfully',
              icon: 'success',
              timer: 5000,
              showCancelButton: false,
            }).then(async (result) => {
              await navigateTo('/dashboard')
            })
          })
          .catch(err => {})
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
        coordinateStore
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

  .invalid-feedback-show {
    display: block;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
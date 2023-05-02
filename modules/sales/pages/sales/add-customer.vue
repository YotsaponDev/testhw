<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h1>Customer Data</h1>
          </div>
          <div class="col-sm-6 d-none d-sm-block">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Sales</a>
              </li>
              <li class="breadcrumb-item active">Customer Data</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content pb-3">
      <div class="container h-100">
        <Form @submit="submit">
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <Field name="title" rules="required|max:255" label="Title" v-slot="{ field, errors }"
                  v-model="obj.data.title">
                  <label for="customerDataTitle" class="col-sm-2 col-form-label">
                    Title<span class="required-field">*</span>
                  </label>
                  <div class="col-sm-10">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataTitle"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="firstName" rules="required|max:255" label="Name" v-slot="{ field, errors }"
                  v-model="obj.data.firstName">
                  <label for="customerDataName" class="col-sm-2 col-form-label">
                    Name<span class="required-field">*</span>
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataName" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="lastName" rules="required|max:255" label="Surname" v-model="obj.data.lastName"
                  v-slot="{ field, errors }">
                  <label for="customerDataSurname" class="col-sm-2 col-form-label">
                    Surname<span class="required-field">*</span>
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataSurname"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="phoneNumber" rules="max:20" label="Phone Number" v-model="obj.data.phoneNumber"
                  v-slot="{ field, errors }">
                  <label for="customerDataPhoneNumber" class="col-sm-2 col-form-label">
                    Phone Number
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataPhoneNumber"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="email" rules="required|email" label="Email" v-model="obj.data.email"
                  v-slot="{ field, errors }">
                  <label for="customerDataEmail" class="col-sm-2 col-form-label">
                    Email<span class="required-field">*</span>
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataEmail"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="lineContact" rules="required|max:255" label="Line Name" v-model="obj.data.lineContact"
                  v-slot="{ field, errors }">
                  <label for="customerDataLineName" class="col-sm-2 col-form-label">
                    Line Name<span class="required-field">*</span>
                  </label>
                  <div class="col-sm-10">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataLineName"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="facebookContact" rules="max:255" label="Facebook" v-model="obj.data.facebookContact"
                  v-slot="{ field, errors }">
                  <label for="customerDataFacebook" class="col-sm-2 col-form-label">
                    Facebook
                  </label>
                  <div class="col-sm-10">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="customerDataFacebook"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h4 class="card-title">ที่อยู่ปัจจุบัน</h4><br><br>
              <div class="form-group row">
                <Field name="addressHouseNo" rules="required" label="House No." v-model="obj.data.addressHouseNo"
                  v-slot="{ field, errors }">
                  <label for="addressHouseNo" class="col-sm-2 col-form-label">
                    House No.
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressHouseNo" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressVillage" rules="required" label="Village" v-model="obj.data.addressVillage"
                  v-slot="{ field, errors }">
                  <label for="addressVillage" class="col-sm-2 col-form-label">
                    Village
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressVillage" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressVillageNo" rules="required" label="Village No." v-model="obj.data.addressVillageNo"
                  v-slot="{ field, errors }">
                  <label for="addressVillageNo" class="col-sm-2 col-form-label">
                    Village No.
                  </label>
                  <div class="col-sm-3">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressVillageNo" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressAlley" rules="required" label="Alley" v-model="obj.data.addressAlley"
                  v-slot="{ field, errors }">
                  <label for="addressAlley" class="col-sm-1 col-form-label">
                    Alley
                  </label>
                  <div class="col-sm">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressAlley" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressRoad" rules="required" label="Road" v-model="obj.data.addressRoad"
                  v-slot="{ field, errors }">
                  <label for="addressRoad" class="col-sm-1 col-form-label">
                    Road
                  </label>
                  <div class="col-sm">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressRoad" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressSubDistrict" rules="required" label="Sub-District"
                  v-model="obj.data.addressSubDistrict" v-slot="{ field, errors }">
                  <label for="addressSubDistrict" class="col-sm-2 col-form-label">
                    Sub-District
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressSubDistrict"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressDistrict" rules="required" label="District" v-model="obj.data.addressDistrict"
                  v-slot="{ field, errors }">
                  <label for="addressDistrict" class="col-sm-2 col-form-label">
                    District
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressDistrict" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressProvince" rules="required" label="Province" v-model="obj.data.addressProvince"
                  v-slot="{ field, errors }">
                  <label for="addressProvince" class="col-sm-2 col-form-label">
                    Province
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressProvince" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressPostalCode" rules="required" label="Postal Code"
                  v-model="obj.data.addressPostalCode" v-slot="{ field, errors }">
                  <label for="addressPostalCode" class="col-sm-2 col-form-label">
                    Postal Code
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressPostalCode"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h4 class="card-title">ที่อยู่สำหรับออกใบกำกับภาษี</h4><br><br>
              <div class="form-check mb-4">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" v-model="obj.data.sameAddress"
                    @change="checkSameAddress($event)">
                  ใช้ที่อยู่เดียวกับที่อยู่ปัจจุบัน
                </label>
              </div>
              <div class="form-group row">
                <Field name="addressBillHouseNo" rules="required" label="House No."
                  v-model="obj.data.addressBillHouseNo" v-slot="{ field, errors }">
                  <label for="addressBillHouseNo" class="col-sm-2 col-form-label">
                    House No.
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillHouseNo"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressBillVillage" rules="required" label="Village" v-model="obj.data.addressBillVillage"
                  v-slot="{ field, errors }">
                  <label for="addressBillVillage" class="col-sm-2 col-form-label">
                    Village
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillVillage"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressBillVillageNo" rules="required" label="Village No."
                  v-model="obj.data.addressBillVillageNo" v-slot="{ field, errors }">
                  <label for="addressBillVillageNo" class="col-sm-2 col-form-label">
                    Village No.
                  </label>
                  <div class="col-sm-3">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillVillageNo"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressBillAlley" rules="required" label="Alley" v-model="obj.data.addressBillAlley"
                  v-slot="{ field, errors }">
                  <label for="addressBillAlley" class="col-sm-1 col-form-label">
                    Alley
                  </label>
                  <div class="col-sm">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillAlley" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressBillRoad" rules="required" label="Road" v-model="obj.data.addressBillRoad"
                  v-slot="{ field, errors }">
                  <label for="addressBillRoad" class="col-sm-1 col-form-label">
                    Road
                  </label>
                  <div class="col-sm">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillRoad" v-bind="field"
                      type="text" />
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressBillSubDistrict" rules="required" label="Sub-District"
                  v-model="obj.data.addressBillSubDistrict" v-slot="{ field, errors }">
                  <label for="addressBillSubDistrict" class="col-sm-2 col-form-label">
                    Sub-District
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillSubDistrict"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressBillDistrict" rules="required" label="District"
                  v-model="obj.data.addressBillDistrict" v-slot="{ field, errors }">
                  <label for="addressBillDistrict" class="col-sm-2 col-form-label">
                    District
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillDistrict"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
              <div class="form-group row">
                <Field name="addressBillProvince" rules="required" label="Province"
                  v-model="obj.data.addressBillProvince" v-slot="{ field, errors }">
                  <label for="addressBillProvince" class="col-sm-2 col-form-label">
                    Province
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillProvince"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
                <Field name="addressBillPostalCode" rules="required" label="Postal Code"
                  v-model="obj.data.addressBillPostalCode" v-slot="{ field, errors }">
                  <label for="addressBillPostalCode" class="col-sm-2 col-form-label">
                    Postal Code
                  </label>
                  <div class="col-sm-4">
                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="addressBillPostalCode"
                      v-bind="field" type="text" />
                    <div class="invalid-feedback" :style="[errors[0] ? 'display:block': 'display:none' ]">
                      {{ errors[0] }}</div>
                  </div>
                </Field>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Upload KYC File (รูปถ่ายคู่กับบัตรประชาชน)</h4><br><br>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <Field name="customerDataKYC" label="KYC" v-model="obj.data.customerDataKYC"
                    v-slot="{ handleChange, handleBlur }">
                    <input type="file" class="custom-file-input" id="customerDataKYC" @change="handleChange"
                      @blur="handleBlur">
                    <label class="custom-file-label" for="customerDataKYC">
                      {{obj.data.customerDataKYC?.size > 0 ? obj.data.customerDataKYC.name : "Choose file" }}
                    </label>
                  </Field>
                </div>
              </div>
            </div>
          </div>

          <div class="text-right">
            <button type="submit" class="btn btn-primary mr-2">เพิ่ม</button>
            <button type="button" class="btn btn-secondary">ยกเลิก</button>
          </div>

        </Form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive
  } from "vue";
  import {
    Form,
    Field,
    ErrorMessage
  } from "vee-validate";
  import Swal from 'sweetalert2'
  export default defineComponent({
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    setup() {
      const obj = reactive({
        data: {
          title: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          lineContact: "",
          facebookContact: "",
          //
          addressHouseNo: "",
          addressVillage: "",
          addressVillageNo: "",
          addressAlley: "",
          addressRoad: "",
          addressSubDistrict: "",
          addressDistrict: "",
          addressProvince: "",
          addressPostalCode: "",

          sameAddress: false,
          // bill
          addressBillHouseNo: "",
          addressBillVillage: "",
          addressBillVillageNo: "",
          addressBillAlley: "",
          addressBillRoad: "",
          addressBillSubDistrict: "",
          addressBillDistrict: "",
          addressBillProvince: "",
          addressBillPostalCode: "",

          customerDataKYC: new File([""], "")
        }
      })

      onMounted(() => {
        const a = useAuth()
        console.log(a, "sdfsdf");
        
        $.Thailand.setup({
          database: '../../../jquery.Thailand.js/database/db.json'
        });
        $.Thailand({
          $district: $('#addressSubDistrict'), // input ของตำบล
          $amphoe: $('#addressDistrict'), // input ของอำเภอ
          $province: $('#addressProvince'), // input ของจังหวัด
          $zipcode: $('#addressPostalCode'), // input ของรหัสไปรษณีย์
          onDataFill: function (data: any) {
            console.log(data);
            obj.data.addressSubDistrict = data.district
            obj.data.addressDistrict = data.amphoe
            obj.data.addressProvince = data.province
            obj.data.addressPostalCode = data.zipcode
          }
        });
        $.Thailand({
          $district: $('#addressBillSubDistrict'), // input ของตำบล
          $amphoe: $('#addressBillDistrict'), // input ของอำเภอ
          $province: $('#addressBillProvince'), // input ของจังหวัด
          $zipcode: $('#addressBillPostalCode'), // input ของรหัสไปรษณีย์
          onDataFill: function (data: any) {
            console.log(data);
            obj.data.addressBillSubDistrict = data.district
            obj.data.addressBillDistrict = data.amphoe
            obj.data.addressBillProvince = data.province
            obj.data.addressBillPostalCode = data.zipcode
          }
        });

        const fileInput: any = document.getElementById('customerDataKYC');
        fileInput.onchange = () => {
          const selectedFile = fileInput.files[0];
          console.log(selectedFile);
        }
        // console.log(obj.data.customerDataKYC);

      });

      function checkSameAddress(e: any) {
        if (obj.data.sameAddress) {
          obj.data.addressBillHouseNo = obj.data.addressHouseNo
          obj.data.addressBillVillage = obj.data.addressVillage
          obj.data.addressBillVillageNo = obj.data.addressVillageNo
          obj.data.addressBillAlley = obj.data.addressAlley
          obj.data.addressBillRoad = obj.data.addressRoad
          obj.data.addressBillSubDistrict = obj.data.addressSubDistrict
          obj.data.addressBillDistrict = obj.data.addressDistrict
          obj.data.addressBillProvince = obj.data.addressProvince
          obj.data.addressBillPostalCode = obj.data.addressPostalCode
        }
      }

      function customerDataKYCChange(event: any) {
        console.log(event, obj.data.customerDataKYC);
      }

      async function submit(data: any) {
        console.log(data, obj.data);
        const {
          $axios
        } = useNuxtApp()

        //   "kycImageUrl": "string",

        const formData = new FormData();


        formData.append("FirstName", obj.data.firstName);
        formData.append("LastName", obj.data.lastName);
        formData.append("LineContact", obj.data.lineContact);
        formData.append("FacebookContact", obj.data.facebookContact);
        formData.append("PhoneNumber", obj.data.phoneNumber);
        formData.append("Email", obj.data.email);
        formData.append("CurrentAddress.HouseNo", obj.data.addressHouseNo);
        formData.append("CurrentAddress.Village", obj.data.addressVillage);
        formData.append("CurrentAddress.VillageNo", obj.data.addressVillageNo);
        formData.append("CurrentAddress.Alley", obj.data.addressAlley);
        formData.append("CurrentAddress.Road", obj.data.addressRoad);
        formData.append("CurrentAddress.SubDistrict", obj.data.addressSubDistrict);
        formData.append("CurrentAddress.District", obj.data.addressDistrict);
        formData.append("CurrentAddress.Province", obj.data.addressProvince);
        formData.append("CurrentAddress.PostalCode", obj.data.addressPostalCode);
        formData.append("BillingAddress.HouseNo", obj.data.addressBillHouseNo);
        formData.append("BillingAddress.Village", obj.data.addressBillVillage);
        formData.append("BillingAddress.VillageNo", obj.data.addressBillVillageNo);
        formData.append("BillingAddress.Alley", obj.data.addressBillAlley);
        formData.append("BillingAddress.Road", obj.data.addressBillRoad);
        formData.append("BillingAddress.SubDistrict", obj.data.addressBillSubDistrict);
        formData.append("BillingAddress.District", obj.data.addressBillSubDistrict);
        formData.append("BillingAddress.Province", obj.data.addressBillProvince);
        formData.append("BillingAddress.PostalCode", obj.data.addressBillPostalCode);

        await $axios.post("/api/customer", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ).then(res=>{
          console.log(res);
          Swal.fire({
            title: 'Successfully added',
            icon: 'success',
            timer: 5000,
            showCancelButton: false,
          }).then(async (result) => {
            await navigateTo('/sales/create-ticket')
          })
        }).catch(err=>{
          console.log(err, "err");
          Swal.fire({
            title: 'Error! Please try again later',
            icon: 'error',
            timer: 5000,
            showCancelButton: false,
          })
        })
      }


      return {
        checkSameAddress,
        submit,
        obj,
        customerDataKYCChange
      };
    },
  });
</script>
<style scoped></style>
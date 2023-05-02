<template>
    <!-- modal ค้นหาลูกค้า -->
    <div class="modal fade" id="salesCTSearchCustomer" tabindex="-1" aria-labelledby="salesCTSearchCustomerLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="salesCTSearchCustomerLabel">ค้นหาลูกค้า</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form @submit="submit">
                    <div class="modal-body">
                        <div class="form-group row">
                            <Field name="firstName" rules="" label="Firstname" v-model="obj.data.firstName"
                                v-slot="{ field, errors }">
                                <label for="scmFirstName" class="col-4 col-sm-2 col-form-label">
                                    Firstname
                                </label>
                                <div class="col-8 col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmFirstName"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                            <Field name="lastName" rules="" label="Lastname" v-model="obj.data.lastName"
                                v-slot="{ field, errors }">
                                <label for="scmLastName" class="col-4 col-sm-2 col-form-label">
                                    Lastname
                                </label>
                                <div class="col-8 col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmLastName"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                        </div>
                        <div class="form-group row">
                            <Field name="phoneNumber" rules="" label="Phone Number" v-model="obj.data.phoneNumber"
                                v-slot="{ field, errors }">
                                <label for="scmPhoneNumber" class="col-4 col-sm-2 col-form-label">
                                    Phone Number
                                </label>
                                <div class="col-8 col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmPhoneNumber"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                            <Field name="email" rules="" label="Email" v-model="obj.data.email"
                                v-slot="{ field, errors }">
                                <label for="scmEmail" class="col-4 col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div class="col-8 col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmEmail"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                        </div>
                        <div class="form-group row">
                            <Field name="lineContact" rules="" label="Line Contact" v-model="obj.data.lineContact"
                                v-slot="{ field, errors }">
                                <label for="scmLineContact" class="col-sm-2 col-form-label">
                                    Line Contact
                                </label>
                                <div class="col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmLineContact"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                            <Field name="facebookContact" rules="max:255" label="Facebook"
                                v-model="obj.data.facebookContact" v-slot="{ field, errors }">
                                <label for="scmFacebook" class="col-sm-2 col-form-label">
                                    Facebook
                                </label>
                                <div class="col-sm-4">
                                    <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="scmFacebook"
                                        v-bind="field" type="text" />
                                    <div class="invalid-feedback">{{ errors[0] }}</div>
                                </div>
                            </Field>
                        </div>

                        <div class="row mb-3">
                            <div class="col text-center">
                                <button type="submit" class="btn btn-primary mr-2">ค้นหา</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table class="table table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th>Firstname</th>
                                                <th>Lastname</th>
                                                <th>Phone Number</th>
                                                <th>Email</th>
                                                <th>Line</th>
                                                <th>Facebook</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="obj.customer.length > 0">
                                            <tr v-for="item in obj.customer" :key="item.id">
                                                <td>{{item.firstName}}</td>
                                                <td>{{item.lastName}}</td>
                                                <td>{{item.phoneNumber}}</td>
                                                <td>{{item.email}}</td>
                                                <td>{{item.lineContact}}</td>
                                                <td>{{item.facebookContact}}</td>
                                                <td><button type="button" class="btn btn-sm btn-outline-success"
                                                        @click="chooseCustomer(item)">เลือก</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr>
                                                <td colspan="7" class="text-center">
                                                    No data found
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
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
    export default defineComponent({
        components: {
            Form,
            Field
        },
        setup() {
            const {
                $axios
            } = useNuxtApp()
            const data = reactive([])
            const obj = reactive({
                data: {
                    firstName: null,
                    lastName: null,
                    lineContact: null,
                    facebookContact: null,
                    phoneNumber: null,
                    email: null
                },
                customer: []
            })
            onMounted(() => {

            })

            async function submit(data: any) {
                console.log(data);
                await $axios
                    .post("/api/Customer/Search", data)
                    .then(res => {
                        console.log(res);
                        obj.customer = res.data

                    })
                    .catch(err => {})
            }

            function chooseCustomer(data: any) {
                let modal:any = document.querySelector('#salesCTSearchCustomer');
                let jQueryObj:any = Object.keys(modal).filter((key) => (key.toString().indexOf('jQuery') !== -1) && modal[key].hasOwnProperty('bs.modal'))
                modal[jQueryObj]['bs.modal'].hide();

                this.$emit("chooseCustomer", data)
            }

            return {
                submit,
                obj,
                chooseCustomer
            }
        },

    })
</script>
<style scoped>
    .my-custom-scrollbar {
        position: relative;
        height: 200px;
        overflow: auto;
    }

    .table-wrapper-scroll-y {
        display: block;
    }

    .table-fixed tbody {
        height: 200px;
        overflow-y: auto;
        width: 100%;
    }

    .table-fixed thead,
    .table-fixed tbody,
    .table-fixed tr,
    .table-fixed td,
    .table-fixed th {
        display: block;
    }

    .table-fixed tbody td,
    .table-fixed tbody th,
    .table-fixed thead>tr>th {
        float: left;
        position: relative;

        &::after {
            content: '';
            clear: both;
            display: block;
        }
    }
</style>
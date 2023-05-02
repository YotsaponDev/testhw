<template>
    <client-only>
        <div class="row mb-2">
            <div class="col text-right">
                <button type="button" class="btn btn-primary" data-toggle="modal" @click="$refs.formProduct.resetForm()"
                    data-target="#salesCTModalProduct">เพิ่มสินค้า</button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>รหัสสินค้า</th>
                        <!-- <th>รูปภาพ</th> -->
                        <th>ชื่อสินค้า</th>
                        <th>ราคารวม</th>
                        <th>ตัวเลือกสินค้า</th>
                        <th>จำนวน</th>
                        <th>ราคา</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody v-if="salesStore.ct.ticketProducts.length > 0">
                    <template v-for="(data, key) in salesStore.ct.ticketProducts" :key='key'>
                        <tr v-if="data.ticketProductItems.length == 1">
                            <td>#</td>
                            <!-- <td>รูปภาพ</td> -->
                            <td>{{ data.name }}</td>
                            <td>{{finalPrice(data.ticketProductItems)}}</td>
                            <td>{{data.ticketProductItems[0].productSpecification}}</td>
                            <td>{{data.ticketProductItems[0].qty}}</td>
                            <td>{{data.ticketProductItems[0].priceFromSystem.toFixed(2)}}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-warning mr-2" data-toggle="modal"
                                    data-target="#salesCTModalProduct"
                                    @click="editProduct(data.productNumber)">แก้ไข</button>
                                <button type="button" class="btn btn-sm btn-danger"
                                    @click="deleteProduct(data.productNumber)">ลบ</button>
                            </td>
                        </tr>
                        <template v-else>
                            <tr>
                                <td :rowspan="data.ticketProductItems.length">#</td>
                                <!-- <td :rowspan="data.ticketProductItems.length">รูปภาพ</td> -->
                                <td :rowspan="data.ticketProductItems.length">{{ data.name }}</td>
                                <td :rowspan="data.ticketProductItems.length">{{ finalPrice(data.ticketProductItems) }}
                                </td>
                                <td>{{data.ticketProductItems[0].productSpecification}}</td>
                                <td>{{data.ticketProductItems[0].qty}}</td>
                                <td>{{data.ticketProductItems[0].priceFromSystem.toFixed(2)}}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-warning mr-2" data-toggle="modal"
                                        data-target="#salesCTModalProduct"
                                        @click="editProduct(data.productNumber)">แก้ไข</button>
                                    <button type="button" class="btn btn-sm btn-danger"
                                        @click="deleteProduct(data.productNumber)">ลบ</button>
                                </td>
                            </tr>
                            <tr v-for="(data2, key2) in data.ticketProductItems.slice(1)" :key='key2'>
                                <td>{{data2.productSpecification}}</td>
                                <td>{{data2.qty}}</td>
                                <td>{{data2.priceFromSystem.toFixed(2)}}</td>
                            </tr>
                        </template>
                    </template>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7" class="text-center">
                            ยังไม่ได้เพิ่มสินค้า
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row">
            <div class="col">
                <h5>สรุปข้อมูล</h5>
                &emsp;<span>จำนวน {{ totalQty() }} ชิ้น</span><br>
                &emsp;<span>ราคารวม {{ totalPrice() }} หยวน</span>
            </div>
        </div>
        <div class="modal fade" id="salesCTModalProduct" tabindex="-1" aria-labelledby="salesCTModalProduct"
            data-backdrop="static" data-keyboard="false" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="salesCTSearchCustomerLabel">
                            {{ modalType == "create" ? "เพิ่มสินค้า":"แก้ไขสินค้า"}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click="closeModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form @submit="submitProduct" ref="formProduct">
                        <div class="modal-body">
                            <div v-for="(input, index) in obj.data.productLink" :key="index">
                                <div class="form-group row">
                                    <Field :name="'productLink'+index" rules="" label="ลิงก์" v-slot="{ field, errors }"
                                        v-model="input.value">
                                        <label class="col-4 col-sm-2 col-form-label">
                                            <span v-show="index == 0">ลิงก์</span>
                                        </label>
                                        <div class="col-8 col-sm-4">
                                            <input :class="['form-control', errors[0] ? 'is-invalid' : '']"
                                                v-bind="field" type="text" />

                                            <div class="invalid-feedback">{{ errors[0] }}</div>
                                        </div>
                                        <div class="col">
                                            <button v-show="index == obj.data.productLink.length-1" type="button"
                                                class="btn btn-outline-dark mr-2" @click="addLink(index)">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                            <button v-show="index || ( !index && obj.data.productLink.length > 1)"
                                                type="button" class="btn btn-outline-danger" @click="deleteLink(index)">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </div>
                                    </Field>
                                </div>
                            </div>
                            <div class="form-group row">
                                <Field name="name" rules="required" label="ชื่อสินค้า" v-model="obj.data.name"
                                    v-slot="{ field, errors }">
                                    <label for="name" class="col-4 col-sm-2 col-form-label">
                                        ชื่อสินค้า
                                    </label>
                                    <div class="col-8 col-sm-4">
                                        <input :class="['form-control', errors[0] ? 'is-invalid' : '']" id="name"
                                            v-bind="field" type="text" />
                                        <div class="invalid-feedback">{{ errors[0] }}</div>
                                    </div>
                                </Field>
                            </div>
                            <!-- รูปภาพ -->
                            <div class="form-group row">
                                <Field name="productTypeId" rules="required" label="ประเภทสินค้า"
                                    v-slot="{ field, errors }" v-model="obj.data.productTypeId">
                                    <label for="productTypeId" class="col-4 col-sm-2 col-form-label">
                                        ประเภทสินค้า
                                    </label>
                                    <div class="col-8 col-sm-4">
                                        <select :class="['form-control', errors[0] ? 'is-invalid' : '']" id="productTypeId" v-bind="field">
                                            <option v-for="item in obj.productType" :value="item.id" :key="item.id">{{ item.name }}</option>
                                        </select>
                                        <div class="invalid-feedback">{{ errors[0] }}</div>
                                    </div>
                                </Field>
                            </div>
                            <div v-for="(input, index) in obj.data.ticketProductItems" :key="index">
                                <div class="form-group row">
                                    <label class="col-4 col-sm-2 col-form-label">
                                        <span v-show="index == 0">ตัวเลือกสินค้า</span>
                                    </label>
                                    <div class="col-4 col-sm-3">
                                        <Field :name="'productSpecification'+index" rules="required"
                                            label="ตัวเลือกสินค้า" v-slot="{ field, errors }"
                                            v-model="input.productSpecification">
                                            <input :class="['form-control', errors[0] ? 'is-invalid' : '']"
                                                v-bind="field" type="text" placeholder="สี/ขนาด" />
                                            <div class="invalid-feedback">{{ errors[0] }}</div>
                                        </Field>
                                    </div>
                                    <label class="col-3 col-sm-1 col-form-label">
                                        จำนวน
                                    </label>
                                    <div class="col-4 col-sm-3 col-md-1">
                                        <Field :name="'qty'+index" rules="required|numeric" label="จำนวน"
                                            v-slot="{ field, errors }" v-model="input.qty">
                                            <input :class="['form-control', errors[0] ? 'is-invalid' : '']"
                                                v-bind="field" type="text" placeholder="ชิ้น" />
                                            <div class="invalid-feedback">{{ errors[0] }}</div>
                                        </Field>
                                    </div>
                                    <label class="col-4 col-sm-1 col-form-label">
                                        ราคา
                                    </label>
                                    <div class="col-3 col-sm-2">
                                        <Field :name="'priceFromSystem'+index" rules="required|min_value:0" label="ราคา"
                                            v-slot="{ field, errors }" v-model="input.priceFromSystem">
                                            <input :class="['form-control', errors[0] ? 'is-invalid' : '']"
                                                v-bind="field" type="text" placeholder="หยวน" />
                                            <div class="invalid-feedback">{{ errors[0] }}</div>
                                        </Field>
                                    </div>
                                    <div class="col">
                                        <button v-show="index == obj.data.ticketProductItems.length-1" type="button"
                                            class="btn btn-outline-dark mr-2" @click="addProductOption(index)">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        <button v-show="index || ( !index && obj.data.ticketProductItems.length > 1)"
                                            type="button" class="btn btn-outline-danger"
                                            @click="deleteProductOption(index)">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit"
                                class="btn btn-primary">{{ modalType == 'create' ? 'เพิ่ม' : 'แก้ไข' }}</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                @click="closeModal()">ปิด</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    </client-only>

</template>
<script lang="ts">
    import {
        defineComponent,
        reactive,
        onMounted
    } from 'vue';
    import {
        Form,
        Field,
        useForm
    } from "vee-validate";
    import {
        useSalesStore
    } from '../store'
    import Swal from 'sweetalert2'

    export default defineComponent({
        components: {
            Form,
            Field
        },
        setup() {
            const {
                $axios
            } = useNuxtApp()
            const salesStore = useSalesStore();
            const modalType = ref("create") // create, edit 
            const obj = reactive({
                productType: [],
                data: {
                    productNumber: "",
                    productLink: [{
                        value: null
                    }],
                    name: "",
                    productTypeId: "",
                    ticketProductItems: [{
                        productSpecification: "",
                        qty: null,
                        priceFromSystem: null,
                        priceAfterDiscount: 0,
                        priceFinal: 0
                    }]
                }
            })

            onMounted(async () => {
                await $axios
                    .get("/api/ProductType")
                    .then(res => {
                        obj.productType = res.data
                    })
                    .catch(err => {})
            })

            function submitProduct(data: any, actions: any) {
                let modal: any = document.querySelector('#salesCTModalProduct');
                let jQueryObj: any = Object.keys(modal).filter((key) => (key.toString().indexOf('jQuery') !== -
                    1) && modal[key].hasOwnProperty('bs.modal'))
                if (modalType.value == 'create') {
                    obj.data.productNumber = Date.now().toString()
                    let newObj = JSON.parse(JSON.stringify(obj.data));
                    salesStore.addProduct(newObj)

                    modal[jQueryObj]['bs.modal'].hide();
                    actions.resetForm()
                    obj.data.ticketProductItems = [{
                        productSpecification: "",
                        qty: null,
                        priceFromSystem: null,
                        priceAfterDiscount: 0,
                        priceFinal: 0
                    }]

                } else {
                    let newObj = JSON.parse(JSON.stringify(obj.data));
                    salesStore.editTicketProducts(newObj)

                    modal[jQueryObj]['bs.modal'].hide();
                    actions.resetForm()

                    obj.data.ticketProductItems = [{
                        productSpecification: "",
                        qty: null,
                        priceFromSystem: null,
                        priceAfterDiscount: 0,
                        priceFinal: 0
                    }]
                }

            }

            function editProduct(id: any) {
                modalType.value = "edit"
                let product = salesStore.getTicketProductsById(id)
                setTimeout(() => {
                    let newObj = JSON.parse(JSON.stringify(product));
                    obj.data = newObj
                    obj.data.productLink = [{
                        value: null
                    }]
                }, 100);
            }

            function deleteProduct(id: any) {
                Swal.fire({
                    title: 'Confirm delete?',
                    icon: 'warning',
                    confirmButtonText: 'Delete',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        salesStore.deleteProduct(id)
                        Swal.fire(
                            'Deleted!',
                            'Item has been deleted.',
                            'success'
                        )
                    }
                })
            }

            function closeModal() {
                modalType.value = "create"
                this.$refs.formProduct.resetForm();
            }

            function addLink(index: any) {
                obj.data.productLink.push({
                    value: null
                });
            }

            function deleteLink(index: any) {
                obj.data.productLink.splice(index, 1);
            }

            function addProductOption(index: any) {
                obj.data.ticketProductItems.push({
                    productSpecification: "",
                    qty: null,
                    priceFromSystem: null,
                    priceAfterDiscount: 0,
                    priceFinal: 0
                });
            }

            function deleteProductOption(index: any) {
                obj.data.ticketProductItems.splice(index, 1);
            }

            function finalPrice(o: any) {
                let sum = 0
                for (let i in o) {
                    sum += Number(o[i].qty) * Number(o[i].priceFromSystem)
                }
                return sum.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }

            function totalQty() {
                let total = 0
                let obj = salesStore.ct.ticketProducts
                for (let i in obj) {
                    for (let j in obj[i].ticketProductItems) {
                        total += Number(obj[i].ticketProductItems[j].qty)
                    }
                }
                salesStore.setTotalQty(total)
                return total
            }

            function totalPrice() {
                let total = 0
                let obj = salesStore.ct.ticketProducts
                for (let i in obj) {
                    for (let j in obj[i].ticketProductItems) {
                        total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j]
                            .priceFromSystem)
                    }
                }
                salesStore.setTotalPrice(total.toFixed(2))
                return total.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }

            return {
                submitProduct,
                obj,
                deleteLink,
                addLink,
                addProductOption,
                deleteProductOption,
                editProduct,
                deleteProduct,
                closeModal,
                salesStore,
                finalPrice,
                totalQty,
                totalPrice,
                modalType
            }
        },

    })
</script>
<style scoped>

</style>
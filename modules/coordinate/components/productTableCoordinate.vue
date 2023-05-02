<template>
    <client-only>
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
                        <th>ราคาหน้าเว็บ</th>
                        <th>ราคาที่ต่อได้</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(data, key) in coordinateStore.ticket.ticketProducts" :key='key'>
                        <tr v-if="data.ticketProductItems.length == 1">
                            <td>{{ data.productNumber }}</td>
                            <!-- <td>รูปภาพ</td> -->
                            <td>{{ data.name }}</td>
                            <td>{{finalPrice(data.ticketProductItems)}}</td>
                            <td>{{data.ticketProductItems[0].productSpecification}}</td>
                            <td>{{data.ticketProductItems[0].qty}}</td>
                            <td>{{data.ticketProductItems[0].priceFromSystem.toFixed(2)}}</td>
                            <td>
                                <input type="number" class="form-control form-control-sm" @keypress="isNumberKey($event)" style="text-align: right;"
                                    @blur="priceAfterDiscountBlur($event)" v-model="data.ticketProductItems[0].priceAfterDiscount"
                                >
                            </td>
                        </tr>
                        <template v-else>
                            <tr>
                                <td :rowspan="data.ticketProductItems.length">{{ data.productNumber }}</td>
                                <!-- <td :rowspan="data.ticketProductItems.length">รูปภาพ</td> -->
                                <td :rowspan="data.ticketProductItems.length">{{ data.name }}</td>
                                <td :rowspan="data.ticketProductItems.length">{{ finalPrice(data.ticketProductItems) }}</td>
                                <td>{{data.ticketProductItems[0].productSpecification}}</td>
                                <td>{{data.ticketProductItems[0].qty}}</td>
                                <td>{{data.ticketProductItems[0].priceFromSystem.toFixed(2)}}</td>
                                <td>
                                    <input type="number" class="form-control form-control-sm" @keypress="isNumberKey($event)" style="text-align: right;"
                                    @blur="priceAfterDiscountBlur($event)" v-model="data.ticketProductItems[0].priceAfterDiscount"
                                >
                                </td>
                            </tr>
                            <tr v-for="(data2, key2) in data.ticketProductItems.slice(1)" :key='key2'>
                                <td>{{data2.productSpecification}}</td>
                                <td>{{data2.qty}}</td>
                                <td>{{data2.priceFromSystem.toFixed(2)}}</td>
                                <td>
                                    <input type="number" class="form-control form-control-sm" @keypress="isNumberKey($event)" style="text-align: right;"
                                        @blur="priceAfterDiscountBlur($event)" v-model="data2.priceAfterDiscount"
                                    >
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
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
        useCoordinateStore
    } from '../store'
    import Swal from 'sweetalert2'

    export default defineComponent({
        components: {
            Form,
            Field
        },
        props: {
            ticket: {}
        },
        setup(props) {
            const coordinateStore = useCoordinateStore();
            const modalType = ref("create") // create, edit 
            const obj = reactive({
                data: {
                    ticket: {
                        ticketProducts: []
                    }
                }
            })

            onMounted(() => {
                obj.data.ticket = props.ticket
            })

            function submitProduct(data: any, actions:any) {
             
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
                let obj = coordinateStore.ticket.ticketProducts
                for (let i in obj) {
                    for (let j in obj[i].ticketProductItems) {
                        total += Number(obj[i].ticketProductItems[j].qty)
                    }
                }
                coordinateStore.setTotalQty(total)
                return total
            }

            function totalPrice() {
                let total = 0
                let obj = coordinateStore.ticket.ticketProducts
                for (let i in obj) {
                    for (let j in obj[i].ticketProductItems) {
                        total += Number(obj[i].ticketProductItems[j].qty) * Number(obj[i].ticketProductItems[j].priceFromSystem)
                    }
                }
                coordinateStore.setTotalPrice(total.toFixed(2))
                return total.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            }

            function isNumberKey(evt:any) {
                var charCode = evt.which ? evt.which : evt.keyCode;
                if(charCode == 46){
                    return true
                }
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            }

            function priceAfterDiscountBlur(e:any){
                coordinateStore.blurToFixed2()
                console.log(coordinateStore.ticket.specialRequestJson);
                
            }

            return {
                submitProduct,
                obj,
                coordinateStore,
                finalPrice,
                totalQty,
                totalPrice,
                modalType,
                isNumberKey,
                priceAfterDiscountBlur
            }
        },

    })
</script>
<style scoped>

</style>
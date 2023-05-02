<template>
    <div class="card card-outline">
        <div class="card-header">
            <h5 class="card-title">1 Day Ago</h5>
            <div class="card-tools">
                <!-- <a href="#" class="btn btn-tool btn-link">{{lane}}</a> -->
                <a href="#" class="btn btn-tool">
                    <i class="fas fa-star"></i>
                </a>
            </div>
        </div>
        <div class="card-body">
            <span>
                <b>Ticket:</b> <NuxtLink :to="goTo(obj.ticket.id)">{{obj.ticket.ticketNumber}}</NuxtLink>
            </span><br>
            <span>
                <b>Customer:</b> {{obj.ticket.customer.firstName}}
            </span><br>
            <span>
                <b>จำนวน:</b> {{numberWithCommas(obj.ticket.totalQty)}} ชิ้น
            </span><br>
            <span>
                <b>ราคา:</b> {{numberWithCommas(obj.ticket.totalPrice)}} หยวน
            </span><br>
            <span v-if="obj.lane == 1">
                <b>LINE:</b> xxxxxx
            </span>
            <br v-if="obj.lane == 1">
            <span>
                <b>Assign:</b> xxxxxx
            </span>
            <br v-if="obj.lane == 1">
            <span v-if="obj.lane == 1">
                <b style="color: green">ราคาที่ได้:</b> {{numberWithCommas(obj.ticket.discountAmount)}}
            </span>
            <br>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        onMounted,
        reactive,
        PropType
    } from 'vue';
    import {
        Form,
        Field,
    } from "vee-validate";
    export default defineComponent({
        props: {
            lane: {
                type: Number as PropType<number>,
                required: true
            },
            data: {

            }
        },
        components: {
            Form,
            Field
        },
        setup(props) {
            const obj = reactive({
                ticket: {
                    id: null,
                    ticketNumber: null,
                    customer: {
                        firstName: null,
                        lineContact: null
                    },
                    totalQty: 0,
                    totalPrice: 0
                },
                lane: 0,
            })
            onMounted(() => {
                // console.log(props.lane, "dd" ,props.data);
                // console.log(props.data);
                
                obj.ticket = props.data
                obj.lane = props.lane
            })

            function numberWithCommas(x:any) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            function goTo(id:any) {
                const pathLane = ["", "sales/ticket/", "/coordinate/ticket/"]
                return pathLane[props.lane] + id
            }

            return {
                obj,
                numberWithCommas,
                goTo
            }
        },

    })
</script>
<style scoped>
</style>
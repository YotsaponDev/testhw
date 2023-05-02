<template>
    <client-only>
        <div class="row">
            <div class="col">
                <h5>คำขอพิเศษ
                    <button type="button" class="btn btn-sm btn-outline-dark mr-2" @click="addRequest()">
                        <i class="fas fa-plus"></i>
                    </button>
                </h5>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6">
                <div v-for="(item, index) in obj.data.request" class="mb-3 form-inline">
                    <select class="form-control mr-2" :id="'selectRequest'+index" v-model="obj.data.request[index].name"
                        @change="changeSelect($event, index)">
                        <option v-for="(_item, _index) in obj.data.requestList" :value="_item.name" :key="_index" :selected="_item.name == item.name ? true:false">
                            {{_item.name}}
                        </option>
                        <option value="999" selected>อื่น ๆ</option>
                    </select>
                    <input type="text" class="form-control mr-2" v-if="obj.data.request[index].name == 999"
                        placeholder="โปรดระบุ" v-model="obj.data.request[index].nameOther">
                    <button type="button"
                        class="btn btn-outline-danger" @click="deleteRequest(index)">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script lang="ts">
    import {
        defineComponent,
        reactive,
        onMounted,
        watch,
        watchEffect
    } from 'vue';
    import {
        Form,
        Field
    } from "vee-validate";
    import {
        useSalesStore
    } from '../store/index'
    export default defineComponent({
        components: {
            Form,
            Field
        },
        setup() {
            const salesStore = useSalesStore();
            const obj = reactive < {
                data: any
            } > ({
                data: {
                    request: [],
                    requestList: [],
                    requestListName: []
                }
            });

            onMounted(async () => {
                const {
                    $axios
                } = useNuxtApp()

                await $axios
                    .get("/api/SpecialRequest")
                    .then(res => {
                        // console.log(res.data);
                        obj.data.requestList = res.data

                        for (const item of res.data) {
                            obj.data.requestListName.push(item.name)
                        }

                        obj.data.request = salesStore.ticket.specialRequestJson


                        for (const item of obj.data.request) {
                            let i = obj.data.requestListName.findIndex((fi:any)=>fi == item.name)
                            // console.log(i);
                            if(i <= 0){
                                item.nameOther = item.name
                                item.name = "999"
                            }   
                        }
                        // console.log(obj.data.request);
                    })
                    .catch(err => {})
            })

            function addRequest() {
                // console.log(obj.data.request);
                obj
                    .data
                    .request
                    .push({
                        name: null,
                        nameOther: null,
                        isCompleted: false
                    });
            }

            function deleteRequest(index: any) {
                obj
                    .data
                    .request
                    .splice(index, 1);
            }

            function changeSelect(e: any, i: any) {
                console.log(e.target.value, i);
            }
            

            // watch(()=>obj.data.request,(newRequest)=>{
            //      console.log(newRequest, "watch");
                 
            // })

            watchEffect(()=>{
                
            })

            return {
                obj,
                deleteRequest,
                addRequest,
                changeSelect,
                salesStore
            }
        }
    })
</script>
<style scoped></style>
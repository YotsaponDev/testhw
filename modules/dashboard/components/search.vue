<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex flex-wrap justify-content-start">
                <div style="width: 290px" class="mr-3">
                    <Form @submit="submitSearch">
                        <Field name="dashboardSearchTK" rules="max:255" label="ค้นหาโดยเลข Ticket/ชื่อลูกค้า"
                            v-slot="{ field, errors }" v-model="obj.search.byTK">
                            <label for="dashboardSearchTK">ค้นหาโดยเลข Ticket/ชื่อลูกค้า</label>
                            <div class="input-group">
                                <input type="text" :class="['form-control', errors[0] ? 'is-invalid' : '']"
                                    v-bind="field" id="dashboardSearchTK">
                                <div class="invalid-feedback">{{ errors[0] }}</div>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary">ค้นหา</button>
                                </div>
                            </div>
                        </Field>
                    </Form>
                </div>
                <div style="width: 220px" class="mr-3">
                    <div class="form-group">
                        <label for="dashboardSearchShowFor">แสดง</label>
                        <select class="form-control" id="dashboardSearchShowFor"
                            @change="$el => searchShowForChange($el)" v-model="obj.search.byShowFor">
                            <option v-for="(item, k) in obj.selectSearchShowFor" :key="k" :value="item.value">
                                {{ item.name }}</option>
                        </select>
                    </div>
                </div>
                <div style="width: 330px">
                    <div class="form-group">
                        <label for="dashboardSearchDate">วันที่</label>
                        <div class="form-inline">
                            <input type="date" class="form-control" v-model="obj.search.byDateStart">
                            -
                            <input type="date" class="form-control" v-model="obj.search.byDateEnd">
                        </div>
                    </div>
                </div>
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
            const obj = reactive({
                search: {
                    byTK: null,
                    byShowFor: null,
                    byDateStart: null,
                    byDateEnd: null
                },
                selectSearchShowFor: [{
                    value: "",
                    name: ""
                }]
            })
            onMounted(() => {
                // เช็ค role เพื่อกำหนดสิทธิ์ให้กับ select(แสดง)
                checkRoleForSelectSearch()
            })

            function checkRoleForSelectSearch() {
                obj.selectSearchShowFor = [{
                    value: 0,
                    name: "แสดงทั้งหมด"
                }, {
                    value: 1,
                    name: "เฉพาะของคุณ"
                }, {
                    value: 2,
                    name: "unAssign"
                }]
            }

            function submitSearch(data: any) {
                console.log(data);
            }

            function searchShowForChange(e: any) {
                console.log(e.target.value);
            }



            return {
                submitSearch,
                obj,
                searchShowForChange
            }
        },

    })
</script>
<style scoped>
</style>
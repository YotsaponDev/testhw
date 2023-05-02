import axios from 'axios';

export default defineNuxtPlugin(async (app) => {
    const auth = useAuth()
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const {
        data: token
    } = await useFetch('/api/token', {
        headers
    })

    const config = useRuntimeConfig();
    let $axios = axios.create({
        baseURL: config.NUXT_PUBLIC_URL_API
    });

    $axios.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${token.value.token}`;
        return config;
    })

    $axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if(error.response.status == 401){
            auth.signOut()
        }
        return Promise.reject(error);
      });


    return {
        provide: {
            axios: $axios
        }
    }
})
export default defineNuxtRouteMiddleware((from, to) => {
    const { status, signIn } = useAuth()
    if (status.value === 'unauthenticated') {
      if(from.path !== "/login"){
        return navigateTo("/login")
      }
    }else if (status.value === 'authenticated') {
      if(from.path == "/login" || from.path == "/login/callback"){
        return navigateTo("/")
      }
    }
})
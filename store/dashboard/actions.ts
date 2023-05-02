export const actions = {
  setName(context:any, name:string) {
    context.state.name = name;
  },
  test(){
    console.log("dashboard pinia test action");        
  }
};
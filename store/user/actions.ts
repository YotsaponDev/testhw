export const actions = {
  setName(context:any, name:string) {
    context.state.name = name;
  },
  test(){
    console.log("pinia test action");        
  }
};
import {
  defineStore
} from 'pinia';

export const useSalesStore = defineStore({
  id: 'sales-store',

  state: () => ({
    ct: {
      assignneeId: null,
      customerChannelId: null,
      customerId: null,
      shopName: null,
      // TicketStatus: 0,
      ticketProducts: [
        // {
        //   productNumber: "1324",
        //   // productLink: [{
        //   //   value: "test"
        //   // }],
        //   productLink: "link test",
        //   name: "product 1",
        //   productTypeId: "1",
        //   ticketProductItems: [{
        //     productSpecification: "detail 2",
        //     qty: 2,
        //     priceFromSystem: 10,
        //     priceAfterDiscount: 0,
        //     priceFinal: 0
        //   }]
        // },
        // {
        //   productNumber: "221123",
        //   // productLink: [{
        //   //   value: "test"
        //   // }],
        //   productLink: "link test2",
        //   name: "product 2",
        //   productTypeId: "1",
        //   ticketProductItems: [{
        //       productSpecification: "detail 2.1",
        //       qty: 4,
        //       priceFromSystem: 20,
        //       priceAfterDiscount: 0,
        //       priceFinal: 0
        //     },
        //     {
        //       productSpecification: "detail 2.2",
        //       qty: 7,
        //       priceFromSystem: 25,
        //       priceAfterDiscount: 0,
        //       priceFinal: 0
        //     },
        //     {
        //       productSpecification: "detail 2.3",
        //       qty: 10,
        //       priceFromSystem: 500,
        //       priceAfterDiscount: 0,
        //       priceFinal: 0
        //     }
        //   ]
        // }
      ],
      specialRequest: [],
      totalQty: 0,
      totalPrice: 0
    },
    ticket: {
      id: null,
      assignneeId: null,
      customerChannelId: null,
      customerId: null,
      shopName: null,
      ticketNumber: null,
      deliveryPrice: 0,
      ticketProducts: [
     
      ],
      specialRequestJson: [],
      customer: {
        firstName: null,
        currentAddress:{
          alley: null,
          district: null,
          houseNo: null,
          postalCode: null,
          province: null,
          road: null,
          subDistrict: null,
          village: null,
          villageNo: null,
        },
        billingAddress: {
          alley: null,
          district: null,
          houseNo: null,
          postalCode: null,
          province: null,
          road: null,
          subDistrict: null,
          village: null,
          villageNo: null,
        }

      },
      specialRequest: [],
      totalQty: 0,
      totalPrice: 0
    }
  }),

  getters: {
    getTicketProductsById: (state) => {
      return (id: any) => state.ct.ticketProducts.find((i) => i.productNumber == id)
    },
  },

  actions: {
    addProduct(data: any) {
      this.ct.ticketProducts.push(data)
      console.log(this.ct.ticketProducts, "add p ");
    },
    deleteProduct(id: any) {
      let i = this.ct.ticketProducts.findIndex((i: any) => i.productNumber == id);
      this.ct.ticketProducts.splice(i, 1);
    },
    setTotalQty(value: any) {
      this.ct.totalQty = value
    },
    setTotalPrice(value: any) {
      this.ct.totalPrice = value
    },
    setCustomerId(value: any) {
      this.ct.customerId = value
    },
    editTicketProducts(data: any) {
      let index = this.ct.ticketProducts.findIndex((i: any) => i.productNumber == data.productNumber)
      this.ct.ticketProducts[index] = data
    },
    // Ticket
    initTicket(data:any){
      this.ticket = data
      if(this.ticket.ticketProducts.length > 0){
        for (const i in this.ticket.ticketProducts) {
          for (const j in this.ticket.ticketProducts[i].ticketProductItems) { 
            let newNum = Number.parseFloat(this.ticket.ticketProducts[i].ticketProductItems[j].priceFinal).toFixed(2)
            this.ticket.ticketProducts[i].ticketProductItems[j].priceFinal = newNum
          }
        }
      }
    },
    blurToFixed2(){
      if(this.ticket.ticketProducts.length > 0){
        for (const i in this.ticket.ticketProducts) {
          for (const j in this.ticket.ticketProducts[i].ticketProductItems) { 
            let newNum = Number.parseFloat(this.ticket.ticketProducts[i].ticketProductItems[j].priceFinal).toFixed(2)
            this.ticket.ticketProducts[i].ticketProductItems[j].priceFinal = newNum
          }
        }
      }
    },
    priceBlur(key:any){
      let pn = key.split(".")
      switch (pn.length) {
        case 1:
          this[pn[0]] = parseFloat(this[pn[0]]).toFixed(2)
          break;
        case 2:
          this[pn[0]][pn[1]] = parseFloat(this[pn[0]][pn[1]]).toFixed(2)
          break;
        case 3:
          this[pn[0]][pn[1]][pn[2]] = parseFloat(this[pn[0]][pn[1]][pn[2]]).toFixed(2)
          break;
        case 4:
          this[pn[0]][pn[1]][pn[2]][pn[3]] = parseFloat(this[pn[0]][pn[1]][pn[2]][pn[3]]).toFixed(2)
          break;
        default:
          break;
      }
    }
  }
})
import {
  defineStore
} from 'pinia';

export const useAccountStore = defineStore({
  id: 'account-store',

  state: () => ({
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

  },

  actions: {
    setTotalQty(value: any) {
      this.ct.totalQty = value
    },
    setTotalPrice(value: any) {
      this.ct.totalPrice = value
    },
    setCustomerId(value: any) {
      this.ct.customerId = value
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
    }
  }
})
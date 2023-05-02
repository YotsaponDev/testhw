import { defineStore } from 'pinia';

export const useCoordinateStore = defineStore({
  id: 'coordinate-store',

  state: () => ({
    ticket: {
      assignneeId: null,
      customerChannelId: null,
      customerId: null,
      shopName: null,
      ticketNumber: null,
      ticketProducts: [
     
      ],
      customer: {
        firstName: null
      },
      specialRequest: [],
      totalQty: 0,
      totalPrice: 0
    }
  }),

  getters: {

  },

  actions: {
    initTicket(data:any){
      this.ticket = data
      if(this.ticket.ticketProducts.length > 0){
        for (const i in this.ticket.ticketProducts) {
          for (const j in this.ticket.ticketProducts[i].ticketProductItems) { 
            let newNum = Number.parseFloat(this.ticket.ticketProducts[i].ticketProductItems[j].priceAfterDiscount).toFixed(2)
            this.ticket.ticketProducts[i].ticketProductItems[j].priceAfterDiscount = newNum
          }
        }
      }
    },
    setTotalQty(value:any) {
      this.ticket.totalQty = value
    },
    setTotalPrice(value:any) {
      this.ticket.totalPrice = value
    },
    editTicketProducts(data:any){
      let index = this.ticket.ticketProducts.findIndex((i:any) => i.productNumber == data.productNumber)
      this.ticket.ticketProducts[index] = data
    },
    blurToFixed2(){
      if(this.ticket.ticketProducts.length > 0){
        for (const i in this.ticket.ticketProducts) {
          for (const j in this.ticket.ticketProducts[i].ticketProductItems) { 
            let newNum = Number.parseFloat(this.ticket.ticketProducts[i].ticketProductItems[j].priceAfterDiscount).toFixed(2)
            this.ticket.ticketProducts[i].ticketProductItems[j].priceAfterDiscount = newNum
          }
        }
      }
    }
  }
})
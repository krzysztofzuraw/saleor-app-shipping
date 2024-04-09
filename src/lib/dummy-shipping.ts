export class DummyExternalShippingAPI {
  private dummyShippingMethods = [
    {
      id: "pnl-bua",
      name: "PostNord Letter (DS)",
      amount: 10.0,
      currency: "USD",
    },
    {
      id: "dhl-exp",
      name: "DHL Express (DS)",
      amount: 20.0,
      currency: "USD",
    },
  ];

  getShippingMethodsForCheckout() {
    console.log("Calling external shipping provider API to get shipping methods for checkout");
    return this.dummyShippingMethods;
  }

  getShippingMethodForOrder() {
    console.log("Calling external shipping provider API to get shipping method for order");
    return this.dummyShippingMethods;
  }
}

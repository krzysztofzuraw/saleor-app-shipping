import { SaleorSyncWebhook } from "@saleor/app-sdk/handlers/next";
import { gql } from "urql";
import { ShippingListMethodsPayloadFragment } from "../../../../generated/graphql";
import { DummyExternalShippingAPI } from "../../../lib/dummy-shipping";
import { saleorApp } from "../../../saleor-app";

const ShippingListMethodsPayload = gql`
  fragment ShippingListMethodsPayload on ShippingListMethodsForCheckout {
    checkout {
      id
      shippingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
        }
        phone
      }
    }
  }
`;

const ShippingListMethodsForCheckoutSubscription = gql`
  ${ShippingListMethodsPayload}
  subscription ShippingListMethodsForCheckout {
    event {
      ...ShippingListMethodsPayload
    }
  }
`;

export const shippingListMethodsForCheckoutWebhook =
  new SaleorSyncWebhook<ShippingListMethodsPayloadFragment>({
    name: "Shipping List Methods for Checkout",
    webhookPath: "api/webhooks/shipping-list-methods-for-checkout",
    event: "SHIPPING_LIST_METHODS_FOR_CHECKOUT",
    apl: saleorApp.apl,
    query: ShippingListMethodsForCheckoutSubscription,
  });

export default shippingListMethodsForCheckoutWebhook.createHandler((req, res, ctx) => {
  const { payload } = ctx;
  console.log("Shipping List Methods for Checkout Webhook received with: ", payload);
  const dummyAPI = new DummyExternalShippingAPI();
  return res.status(200).json(dummyAPI.getShippingMethodsForCheckout());
});

export const config = {
  api: {
    bodyParser: false,
  },
};

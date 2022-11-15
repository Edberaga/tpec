import { PayPalButtons } from '@paypal/react-paypal-js';
import React, {useRef, useEffect} from 'react'

export const DonationButton = ({ currency, amount }) => {
    const amountRef = useRef(amount);
    useEffect(() => {
      amountRef.current = amount;
    }, [amount]);
  
    return (
      <PayPalButtons
        // forceReRender={[currency, amount]}
        style={{ color: "black", label: "donate" }}
        fundingSource="paypal"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amountRef.current,
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: amountRef.current
                    }
                  }
                },
                items: [
                  {
                    name: "T-PEC School Donation",
                    description:
                      "All proceeds directly to support Children school supplies and care.",
                    quantity: "1",
                    unit_amount: {
                      currency_code: currency,
                      value: amountRef.current
                    },
                    category: "DONATION"
                  }]
              }]
          });
        }}/>
    );
  };
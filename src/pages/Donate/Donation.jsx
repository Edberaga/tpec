import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import './Donation.css';
import DonationForm from "./DonationForm";

export const Donation = () => {
    return (
        <>
        <div className="container-heading"><h1>Donation</h1></div>

        <div className="container-section">
            <PayPalScriptProvider
                options={{
                    'client-id': 'AYNMxykH9aygiV5PMmSSGZRZRTP7BLIV8XtjIM1uk6FHfEjkwATOAza3eZU_Mk4leGejrKoz-z7ERJOh',
                    components: 'buttons',
                    currency: 'MYR'
                }}
            >
                <DonationForm/>
            </PayPalScriptProvider>
        </div>
        </>
    )
}
import React, {useState} from 'react'
import { DonationButton } from './DonationButton';

const AmountPicker = ({ onAmountChange }) => {
    return (
      <fieldset onChange={onAmountChange}>
        <legend>Donation Amount</legend>
        <label>
          <input type="radio" value="5.00" defaultChecked="true" name="amount" />
          5.00
        </label>
        <label>
          <input type="radio" value="10.00" name="amount" id="radio-6" />
          10.00
        </label>
        <label>
          <input type="radio" value="15.00" name="amount" id="radio-9" />
          15.00
        </label>
        <label>
          <input type="radio" value="25.00" name="amount" id="radio-9" />
          25.00
        </label>
        <label>
          <input type="radio" value="50.00" name="amount" id="radio-9" />
          50.00
        </label>
        <label>
          <input type="radio" value="100.00" name="amount" id="radio-9" />
          100.00
        </label>
      </fieldset>
    );
}

export default function DonationForm() {
    const [amount, setAmount] = useState("5.00");
    return (
        <form className="DonateForm">
        <AmountPicker
            onAmountChange={(e) => {
            setAmount(e.target.value);
        }}/>
        <DonationButton currency="MYR" amount={amount} />
        </form>
    );
}
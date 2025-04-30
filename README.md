# prorate-invoice-calculator 
I wrote a lightweight JavaScript program for calculating prorated subscription invoices as part of a coding challenge. Given a billing cycle and a set of usage intervals (with start/end dates and monthly rates or charges), it returns daily-prorated costs per plan segment and a total invoice amount—perfect for usage-based billing and subscription services.

## Run locally
Make sure you have [Node.js](https://nodejs.org/) (v14 or higher) installed

```bash
// first clone code 
git clone https://github.com/HARRIFIED/prorate-invoice-calculator.git

npm install // then install dependencies
npm start // run code
npm test // run tests
```

## Example usage

```
const invoiceSvc = new Invoice();

const data: InvoiceType = {
  startofBillingCycle: '2025-04-01',
  endofBillingCycle: '2025-04-30',
  plansUsageInterval: [
    { monthlyCost: 100, startUsageDate: '2025-04-01', endUsageDate: '2025-04-10' },
    { monthlyCost: 150, startUsageDate: '2025-04-11', endUsageDate: '2025-04-20' }
  ]
};

const invoice = invoiceSvc.calculateInvoice(data);

console.log(invoice);
// Output:
// {
//   plans: [ { plan: 'Plan 1', amount: 33.33 }, { plan: 'Plan 2', amount: 50.00 } ],
//   total: 83.33
// }

```

## Contributing

Feel free to contribute by adding more edge cases than what is currently here already.
Please feel free to fork this repo and contribute by submitting a pull request to enhance the functionalities.







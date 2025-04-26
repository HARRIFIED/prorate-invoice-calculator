import { InvoiceType, InvoiceNote } from './types';

export class Invoice {

    calculateInvoice({startofBillingCycle, endofBillingCycle, plansUsageInterval}: InvoiceType): InvoiceNote {
        let resultArray = [];
        const totalBillCycle = ((new Date(endofBillingCycle).valueOf() - new Date(startofBillingCycle).valueOf()) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < plansUsageInterval.length; i++) {
            const plan = plansUsageInterval[i];
            const planStartDate = plan.startUsageDate;
            const planEndDate = plan.endUsageDate;
            const monthlyCost = plan.monthlyCost;

            const timeDifference = ((new Date(planEndDate).valueOf() - new Date(planStartDate).valueOf()) / (1000 * 60 * 60 * 24)) + 1
            
            const proratedAmount = (timeDifference / totalBillCycle) * monthlyCost;

            resultArray.push({
                plan: `Plan ${i + 1}`,
                amount: parseFloat(proratedAmount.toFixed(2))
            })
            
        }
        
        const total = resultArray.reduce((acc, plan) => acc + plan.amount, 0);

        return {
            plans: resultArray,
            total: parseFloat(total.toFixed(2))
        }
    }
}

//Example usage
const invoice = new Invoice();
console.log(invoice.calculateInvoice({
    startofBillingCycle: '2025-04-01',  
    endofBillingCycle: '2025-04-30',
    plansUsageInterval: [
        {
            monthlyCost: 100,
            startUsageDate: '2025-04-01',
            endUsageDate: '2025-04-10'
        },
        {
            monthlyCost: 150,
            startUsageDate: '2025-04-11',
            endUsageDate: '2025-04-20'
        }
    ]
}))

class Invoice {

    calculateInvoice(startofBillingCycle, endofBillingCycle, plansUsageInterval) {
        let resultArray = [];
        
        for (let i = 0; i < plansUsageInterval.length; i++) {
            const plan = plansUsageInterval[i];
            const planStartDate = plan.startUsageDate;
            const planEndDate = plan.endUsageDate;
            const monthlyCost = plan.monthlyCost;

            const timeDifference = ((new Date(planEndDate) - new Date(planStartDate)) / (1000 * 60 * 60 * 24)) + 1
            const totalBillCycle = ((new Date(endofBillingCycle) - new Date(startofBillingCycle)) / (1000 * 60 * 60 * 24)) + 1;
            
            const proratedAmount = (timeDifference / totalBillCycle) * monthlyCost;

            resultArray.push({
                plan: `Plan ${i + 1}`,
                amount: proratedAmount
            })
            
        }
        
        const total = resultArray.reduce((acc, plan) => {
            return acc + parseFloat(plan.amount);
        }, 0).toFixed(2);

        return {
            plans: resultArray,
            total: parseFloat(total)
        }
    }
}

//Test
const invoice = new Invoice();
console.log(invoice.calculateInvoice(
    '2025-04-01',
    '2025-04-30',
    [
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
))

module.exports = Invoice
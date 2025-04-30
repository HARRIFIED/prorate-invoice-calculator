import { InvoiceType, InvoiceNote } from './types';

export class Invoice {
    calculateInvoice({
      startofBillingCycle,
      endofBillingCycle,
      plansUsageInterval,
    }: InvoiceType): InvoiceNote {
      // Validate billing cycle dates
      if (new Date(startofBillingCycle) > new Date(endofBillingCycle)) {
        throw new Error("Billing start date cannot be after billing end date.");
      }
  
      const totalBillCycle = this.calculateDaysBetweenDates(
        startofBillingCycle,
        endofBillingCycle
      );
      const resultArray: { plan: string; amount: number }[] = [];
  
      for (let i = 0; i < plansUsageInterval.length; i++) {
        const plan = plansUsageInterval[i];
        let planStartDate = plan.startUsageDate;
        let planEndDate = plan.endUsageDate;
  
        // Validate plan interval
        if (new Date(planStartDate) > new Date(planEndDate)) {
          throw new Error("Plan start date cannot be after plan end date.");
        }
  
        // Skip intervals completely outside the billing cycle
        if (
          new Date(planEndDate) < new Date(startofBillingCycle) ||
          new Date(planStartDate) > new Date(endofBillingCycle)
        ) {
          continue;
        }
  
        // Clip to billing cycle boundaries
        if (new Date(planStartDate) < new Date(startofBillingCycle)) {
          planStartDate = startofBillingCycle;
        }

        if (new Date(planEndDate) > new Date(endofBillingCycle)) {
          planEndDate = endofBillingCycle;
        //   console.log("end", planEndDate)
        }
          console.log("end", planEndDate)
        const timeDifference = this.calculateDaysBetweenDates(
          planStartDate,
          planEndDate
        );
        const proratedAmount = (timeDifference / totalBillCycle) * plan.monthlyCost;
  
        resultArray.push({
          plan: `Plan ${i + 1}`,
          amount: parseFloat(proratedAmount.toFixed(2)),
        });
      }
  
      const total = resultArray
        .reduce((acc, plan) => acc + plan.amount, 0)
        .toFixed(2);
  
      return {
        plans: resultArray,
        total: parseFloat(total),
      };
    }
  
    // Helper function to calculate number of days between dates (inclusive)
    calculateDaysBetweenDates(
      startDate: string | Date,
      endDate: string | Date
    ): number {
      return (
        (new Date(endDate).valueOf() - new Date(startDate).valueOf()) /
          (1000 * 60 * 60 * 24) +
        1
      );
    }
}
  

// Example usage
// const invoice = new Invoice();
// console.log(invoice.calculateInvoice({
//     startofBillingCycle: '2025-04-01',  
//     endofBillingCycle: '2025-04-30',
//     plansUsageInterval: [
//         {
//             monthlyCost: 300,
//             startUsageDate: '2025-03-20',
//             endUsageDate: '2025-04-10'
//         },
//         {
//             monthlyCost: 450,
//             startUsageDate: '2025-04-11',
//             endUsageDate: '2025-05-20'
//         }
//     ]
// }))

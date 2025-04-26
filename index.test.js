const Invoice = require('./index');

/**
 * planUsage: {
 *  amount: number,
 *  startUsageDate: date;
 *  endUsageDate: date
 * }
 * 
 * calculate(billingCycle, [planUsage]) {
 *  result = {
 *      plans: [{plan: string, amount: number}]
 *      total: number
 * }
 *  loop through each plansUsage and do prorate calculations and store result in the resultArr
 *  reduce the array and get total invoice
 * }
 */

const invoice = new Invoice()
describe("Calculates Invoice for prorated charges", () => {
    test("should calculate the prorated invoice for plan change and cancellation", () => {
        const startofBillingCycle = '2025-04-01';
        const endofBillingCycle = '2025-04-30';

        const plansUsageInterval = [
            {
                monthlyCost: 300,
                startUsageDate: '2025-04-01',
                endUsageDate: '2025-04-10'
            },
            {
                monthlyCost: 450,
                startUsageDate: '2025-04-11',
                endUsageDate: '2025-04-20'
            }
        ]

        const invoiceNote = invoice.calculateInvoice(startofBillingCycle, endofBillingCycle, plansUsageInterval);
        expect(typeof invoiceNote).toBe('object');
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 1', amount: 100 }, { plan: 'Plan 2', amount: 150 });
        expect(invoiceNote.total).toBeCloseTo(250.0)
    })
});
import { Invoice } from "./index"
import { InvoiceType } from './types'

/**
 * planUsage: {
 *  amount: number,
 *  startUsageDate: string | date;
 *  endUsageDate: string | date
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
const invoice = new Invoice();
describe("Calculates Invoice for prorated charges", () => {
    
    test("should calculate the prorated invoice for plan change and cancellation", () => {

        const data: InvoiceType = {
            startofBillingCycle: '2025-04-01',
            endofBillingCycle: '2025-04-30',
            plansUsageInterval: [
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
        }

        const invoiceNote = invoice.calculateInvoice(data);
        expect(typeof invoiceNote).toBe('object');
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 1', amount: 100 });
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 2', amount: 150 });
        expect(invoiceNote.total).toBeCloseTo(250.0)
    })

    test("should calculate the days between two dates a startDate and endDate", () => {
        const startDate = '2025-04-01';
        const endDate = '2025-04-30';

        const noOfDays = invoice.calculateDaysBetweenDates(startDate, endDate);
        expect(noOfDays).toBe(30)
    })
});

describe('Invoice Calculation - Invalid Date Scenarios', () => {

    test('should throw an error if plan start date is after plan end date', () => {
      const data = {
        startofBillingCycle: '2025-04-01',
        endofBillingCycle: '2025-04-30',
        plansUsageInterval: [
          {
            monthlyCost: 100,
            startUsageDate: '2025-04-15',
            endUsageDate: '2025-04-10'
          }
        ]
      };
  
      expect(() => invoice.calculateInvoice(data)).toThrow("Plan start date cannot be after plan end date.");
    });
  
    test('should throw an error if billing cycle start date is after end date', () => {
      const data = {
        startofBillingCycle: '2025-04-30',
        endofBillingCycle: '2025-04-01',
        plansUsageInterval: [
          {
            monthlyCost: 100,
            startUsageDate: '2025-04-01',
            endUsageDate: '2025-04-10'
          }
        ]
      };
  
      expect(() => invoice.calculateInvoice(data)).toThrow("Billing start date cannot be after billing end date.");
    });

    test('should set effectiveStartDate = startofBillingCycle when plan.startUsageDate < startofBillingCycle', () => {
        const data: InvoiceType = {
            startofBillingCycle: '2025-04-01',
            endofBillingCycle: '2025-04-30',
            plansUsageInterval: [
                {
                    monthlyCost: 300,
                    startUsageDate: '2025-03-20',
                    endUsageDate: '2025-04-10'
                },
                {
                    monthlyCost: 450,
                    startUsageDate: '2025-04-11',
                    endUsageDate: '2025-04-20'
                }
            ]
        }

        const invoiceNote = invoice.calculateInvoice(data);
        expect(typeof invoiceNote).toBe('object');
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 1', amount: 100 });
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 2', amount: 150 });
        expect(invoiceNote.total).toBeCloseTo(250.0)  
    });

    test('Set effectiveEndDate = endofBillingCycle when plan.endUsageDate > endofBillingCycle', () => {
        const data: InvoiceType = {
            startofBillingCycle: '2025-04-01',
            endofBillingCycle: '2025-04-30',
            plansUsageInterval: [
                {
                    monthlyCost: 300,
                    startUsageDate: '2025-03-20',
                    endUsageDate: '2025-04-10'
                },
                {
                    monthlyCost: 450,
                    startUsageDate: '2025-04-11',
                    endUsageDate: '2025-05-20'
                }
            ]
        }

        const invoiceNote = invoice.calculateInvoice(data);
        expect(typeof invoiceNote).toBe('object');
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 1', amount: 100 });
        expect(invoiceNote.plans).toContainEqual({ plan: 'Plan 2', amount: 300 });
        expect(invoiceNote.total).toBeCloseTo(400.0)  
    });

    test('skips a plan that is fully outside the billing cycle', () => {
        const data = {
          startofBillingCycle: '2025-04-01',
          endofBillingCycle: '2025-04-30',
          plansUsageInterval: [
            {
              monthlyCost: 100,
              startUsageDate: '2025-03-01',
              endUsageDate: '2025-03-31',
            },
          ],
        };
      
        const result = invoice.calculateInvoice(data);
        expect(result.plans.length).toBe(0);
        expect(result.total).toBe(0);
    });
      
});
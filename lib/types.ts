export interface InvoiceType {
    startofBillingCycle: string | Date;
    endofBillingCycle: string | Date;
    plansUsageInterval: PlanInterval[];
}

interface PlanInterval {
    monthlyCost: number;
    startUsageDate: string | Date;
    endUsageDate: string | Date;
}

export interface InvoiceNote {
    plans: Plan[];
    total: number;
}

interface Plan {
    plan: string;
    amount: number;
}



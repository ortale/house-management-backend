export interface Certificate {
    id: number;
    name: string;
    date: Date;
    expireDate: Date;
}

export interface Payment {
    id: number;
    description: string;
    paymentDate: Date;
    dueDate: Date;
}

export interface House {
    id: number;
    name: string;
    certificates: Certificate[];
    payments: Payment[];
}

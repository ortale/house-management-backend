export interface Payment {
    id: number;
    houseId: number;
    rentAmount: number;
    feeAmount: number;
    status: string;
    paymentDate: Date;
    dueDate: Date;
}

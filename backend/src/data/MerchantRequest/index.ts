import {v4 as uuid} from "uuid";

export type MerchantRequestData = {
    id: string;
    companyName: string;
    companyId: string;
    requestedLimit: number;
    CEOName: string;
    riskManagerResolution?: string;
    status: 'pending' | 'approved' | 'rejected'
}

export class MerchantRequestRepository {
    private readonly requests: Record<string, MerchantRequestData> = {};
    constructor() {
        this.requests = {}
    }

    public getRequests() {
        return Object.values(this.requests);
    }

    public getRequestDetails(): MerchantRequestData | null {
        return Object.values(this.requests)[0] || null;
    }

    public checkIsRequestExist(requestId: string): boolean {
        return !!this.requests[requestId];
    }

    public finalRequest(requestId: string, decision: 'approved' | 'rejected') {
        if (!this.checkIsRequestExist(requestId)) {
            throw new Error(`Request ${requestId} doesn't exist`);
        }
        this.requests[requestId].status = decision;
    }

    public createNewRequest(requestData: MerchantRequestData): MerchantRequestData {
        const newRequestId = uuid();
        const newRequest: MerchantRequestData = {
            ...requestData,
            status: 'pending',
            id: newRequestId,
        }
        this.requests[newRequestId] = newRequest;
        return newRequest;
    }
}
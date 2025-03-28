import tenant_1985 from './1985.json';
import tenant_9999 from './9999.json';

export interface configType {
    tenant_id: string;
    tenantName: string;
    visibleFieldGroup: {
        nationality: boolean;
        purpose: boolean;
        shop_kind: boolean;
        my_number: boolean;
        card_pin: boolean;
        passbook: boolean;
        job: boolean;
        business_details: boolean;
        account_details: boolean;
    }
    smsNotificationSettings:{
        applicationCompletionMessage: string;
        procedureCompletionMessage: string;
    }
}

export const tenantConfigs = {
    [tenant_1985.tenant_id]:tenant_1985,
    [tenant_9999.tenant_id]:tenant_9999,
};
 
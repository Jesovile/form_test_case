type MerchantRequestFormProps = {
    role?: 'merchant' | 'riskManager'
}

export function MerchantRequestForm ({role}: MerchantRequestFormProps) {
    return (
        <h2>{role}</h2>
    );
}
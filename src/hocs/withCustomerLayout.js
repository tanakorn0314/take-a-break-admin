import CustomerLayout from "../layouts/CustomerLayout";

export default (ComposedComponent) => props => {
    return (
        <CustomerLayout>
            <ComposedComponent {...props} />
        </CustomerLayout>
    )
}
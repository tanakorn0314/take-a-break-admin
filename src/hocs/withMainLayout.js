import MainLayout from "../layouts/MainLayout";

export default (ComposedComponent) => props => {
    return (
        <MainLayout>
            <ComposedComponent {...props} />
        </MainLayout>
    )
}
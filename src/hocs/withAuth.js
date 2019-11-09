import getFirebase from "../lib/firebase";

const withAuth = ComposedComponent => {
    const WithAuthComponent = props => {
        const { auth } = getFirebase();
        auth.signInAnonymously();
        return <ComposedComponent {...props}/>
    }

    return WithAuthComponent;
}

export default withAuth;
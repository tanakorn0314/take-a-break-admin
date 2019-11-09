import withMainLayout from "../src/hocs/withMainLayout";

const HomePage = props => {
    return (
        <div>
            <p className='text-light'>Test</p>
            <h1>H1</h1>
        </div>
    )
}

export default withMainLayout(HomePage);
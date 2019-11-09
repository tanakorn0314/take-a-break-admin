import withMainLayout from "../src/hocs/withMainLayout";
import CreateForm from "../src/components/CreateForm";

const HomePage = props => {
    return (
        <div className='container'>
            <h3>Create Promotion</h3>
                <CreateForm type='Promotion'/>
            <style jsx>{`
                .container {
                   padding: 12px;
                }
                h3 {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    )
}

export default withMainLayout(HomePage);
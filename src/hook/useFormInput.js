import { useState } from 'react';

const useFormInput = (init) => {
    const [state, setState] = useState(init);
    return {
        value: state,
        onChange: (e) => setState(e.target.value)
    }
}

export default useFormInput;
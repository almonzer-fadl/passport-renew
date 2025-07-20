
export function Button(props){

    return <button 
            onClick={props.onClick}

            className={`p-3 text-gray-200 bg-blue-600 cursor-pointer text-2xl rounded-xl hover:bg-blue-900 transition-colors ${props.isDisabled? 'bg-gray-700 hover:bg-gray-900 cursor-not-allowed disabled:pointer-events-none':''}`}
        >
        {props.text}
    </button>
}
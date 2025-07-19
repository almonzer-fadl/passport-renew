
export function Button(props){

    return <button 
            onClick={props.onClick}

            className={`p-2 min-w-50 w-full bg-blue-600 text-white text-2xl rounded-4xl m-5 hover:bg-blue-800 transition-colors ${props.isDisabled? 'bg-gray-700 hover:bg-gray-900 cursor-not-allowed disabled:':''}`}
        >
        {props.text}
    </button>
}
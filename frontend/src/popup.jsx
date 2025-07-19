
export function Popup(props){
    console.log('this dialog is running')

    return(
        <div>
            <dialog className="z-12000">
                <h1>Progess abandon!</h1>
                <p>Are you sure you want to exit? All changes are going to be deleted.</p>

                <button className="bg-red-600" onClick={props.closeFunc}>Proceed</button>
                <button className="bg-gray-500"onClick={props.returnFunc}>Return</button>
            </dialog>
        </div>
    )
}
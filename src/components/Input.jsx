function Input ({label,state,setState,placeholder,type}){
    return(
        <div className="p-3">
            <p className="mt-1.5 mb-1.5">{label}</p>
            <input className="focus:outline-none border-gray-400 border-b-2 w-full"
            type={type}
            value={state}
            placeholder={placeholder}
            onChange={(e)=>setState(e.target.value)}
            />
        </div>
    )
}
export default Input;
import "./Input.css" ;

export default function Input({ type, onChange, disabled, not_required, inputText}) {
    const inputNeeded = not_required ? false : true ;
    // const disabledd = disabled ? true : false 
    return (
        <div className= { `main-input-${inputText.toLowerCase()}`} >
            <input onChange = { (e)=> onChange(e.target.value) } disabled = {disabled} type = {type} placeholder = {inputText} required = {inputNeeded} name = {inputText.toLowerCase()}/>
        </div>
    )
}
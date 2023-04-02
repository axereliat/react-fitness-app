export default props => (
    <input type={props.type || 'text'}
           id={props.id}
           name={props.name}
           value={props.value}
           onChange={props.onChange}
           required={props.required}
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
)

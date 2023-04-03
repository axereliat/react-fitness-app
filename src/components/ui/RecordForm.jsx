import FormLabel from "./FormLabel.jsx";
import FormInput from "./FormInput.jsx";
import SubmitButton from "./SubmitButton.jsx";

export default ({submitHandler, reps, setReps, sets, setSets, activity, setActivity, activities, buttonText}) => {
    return (
        <form className="space-y-6" onSubmit={submitHandler}>
            <div>
                <FormLabel htmlFor="reps">Reps</FormLabel>
                <div className="mt-2">
                    <FormInput
                        type="text"
                        id="reps"
                        name="reps"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        required={true}
                    />
                </div>
            </div>
            <div>
                <FormLabel htmlFor="sets">Sets</FormLabel>
                <div className="mt-2">
                    <FormInput
                        type="text"
                        id="sets"
                        name="sets"
                        value={sets}
                        onChange={e => setSets(e.target.value)}
                        required={true}
                    />
                </div>
            </div>
            <div>
                <FormLabel htmlFor="activity">Activity</FormLabel>
                <select
                    id="activity"
                    name="activity"
                    value={activity}
                    onChange={e => setActivity(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Canada"
                >
                    {activities.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <SubmitButton>{buttonText === 'create' ? 'Create' : 'Update'}</SubmitButton>
            </div>
        </form>
    );
}

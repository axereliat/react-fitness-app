import {Link, Navigate} from "react-router-dom";
import toastr from 'toastr'
import {useEffect, useState} from "react";
import {createRecord, fetchActivities} from "../utils/Requester.js";
import SiteModal from "./ConfirmationModal.jsx";
import SubmitButton from "./ui/SubmitButton.jsx";
import FormLabel from "./ui/FormLabel.jsx";
import FormInput from "./ui/FormInput.jsx";

function CreateRecord() {
    const [loadingMsg, setLoadingMsg] = useState('');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('');
    const [newRecord, setNewRecord] = useState(false);

    useEffect(() => {
        fetchActivities()
            .then(res => {
                setActivities(res.data);
                setActivity(res.data[0].id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const submitHandler = e => {
        e.preventDefault();

        if (!sets || !reps) {
            toastr.error('Sets and reps must not be zero!');
            return;
        }

        createRecord(sets, reps, activity)
            .then(res => {
                setNewRecord(true);
                toastr.success('Your record was successfully added');
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (newRecord) {
        return <Navigate to="/records" replace={true}/>;
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    {loadingMsg ? (
                        <div>{loadingMsg}</div>
                    ) : (
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
                                <SubmitButton>Add</SubmitButton>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateRecord;

import {Link, Navigate} from "react-router-dom";
import toastr from 'toastr'
import {useEffect, useState} from "react";
import {createRecord, fetchActivities} from "../utils/Requester.js";
import SiteModal from "./ConfirmationModal.jsx";

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
            <Link to="/records">Back</Link>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    {loadingMsg ? (
                        <div>{loadingMsg}</div>
                    ) : (
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Reps
                                </label>
                                <div className="mt-2">
                                    <input type="text"
                                           id="reps"
                                           name="reps"
                                           value={reps}
                                           onChange={e => setReps(e.target.value)}
                                           required
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Sets
                                </label>
                                <div className="mt-2">
                                    <input type="text"
                                           id="sets"
                                           name="sets"
                                           value={sets}
                                           onChange={e => setSets(e.target.value)}
                                           autoComplete="current-password"
                                           required
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Activity
                                </label>
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
                                <button type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Add
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateRecord;

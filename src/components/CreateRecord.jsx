import {Navigate} from "react-router-dom";
import toastr from 'toastr'
import {useEffect, useState} from "react";
import {createRecord, fetchActivities} from "../utils/Requester.js";
import RecordForm from "./ui/RecordForm";

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
                        <RecordForm {...{buttonText: 'create', submitHandler, reps, setReps, sets, setSets, setActivity, activities}} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateRecord;

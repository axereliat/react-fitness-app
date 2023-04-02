import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import toastr from 'toastr';
import {getAllRecords, deleteRecord} from "../utils/Requester.js";
import SiteModal from "./ConfirmationModal.jsx";

function Records() {

    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        getAllRecords()
            .then(res => {
                setRecords(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleDelete = id => {
        deleteRecord(id)
            .then(res => {
                setRecords(records.filter(r => r.id !== id));
                setOpen(false);
                toastr.success('Record was successfully deleted');
            })
            .catch(err => {
                console.log(err);
                toastr.error('An error occurred');
            })
    };

    const openModal = id => {
        setSelectedId(id);
        setOpen(true);
    }

    return (
        <div>
            <Link to="/">Back</Link>

            <SiteModal open={open} setOpen={setOpen} yesButtonHandler={() => handleDelete(selectedId)}/>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Records</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all your records
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link
                            to="/records/create"
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add record
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Activity
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Sets
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Reps
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {records.map((record) => (
                                    <tr key={record.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {record.dailyActivity.name}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {record.sets}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {record.reps}
                                        </td>
                                        <td>
                                            <button onClick={() => openModal(record.id)}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Records;

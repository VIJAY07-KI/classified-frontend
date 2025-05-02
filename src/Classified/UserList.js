import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers } from "./UserSlice";

export default function UserList() {
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">User List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-md rounded-md overflow-hidden">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Name</th>
                            <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Email</th>
                            <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Role</th>
                            <th className="text-left px-4 py-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((ele, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition duration-200">
                                <td className="px-4 py-2 text-sm text-gray-800">{ele.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{ele.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-800 capitalize">{ele.role}</td>
                                <td className="px-4 py-2 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            ele.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {ele.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

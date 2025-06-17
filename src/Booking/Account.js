import { useSelector } from 'react-redux'

export default function Account() {
    const { data } = useSelector((state) => state.user)

    if (!data) return null

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Account Details</h2>
                <div className="space-y-4 text-lg">
                <p><span className="font-medium text-gray-700">Name:</span> {data.name}</p>

                    <p><span className="font-medium text-gray-700">Email:</span> {data.email}</p>
                    <p><span className="font-medium text-gray-700">Role:</span> {data.role}</p>
                </div>
            </div>
        </div>
    )
}

function AddTrain() {
  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-2xl shadow border border-gray-200 p-10 hover:shadow-md transition">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">
        Add Train
      </h2>

      <form className="space-y-6">
        {/* Train Name */}
        <div>
          <label
            htmlFor="trainName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Train Name
          </label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. Rajdhani Express"
          />
        </div>

        {/* Train Type */}
        <div>
          <label
            htmlFor="trainType"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Train Type
          </label>
          <select
            id="trainType"
            name="trainType"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
          >
            <option value="Express">Express</option>
            <option value="Local">Local</option>
            <option value="Freight">Freight</option>
          </select>
        </div>

        {/* Train Status */}
        <div>
          <label
            htmlFor="trainStatus"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Train Status
          </label>
          <select
            id="trainStatus"
            name="trainStatus"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition"
        >
          Add Train
        </button>
      </form>
    </div>
  );
}

export default AddTrain;
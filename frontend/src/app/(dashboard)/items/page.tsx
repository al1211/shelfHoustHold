export default function ItemsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Inventory Items
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search Item"
            className="border p-3 rounded-lg"
          />

          <select className="border p-3 rounded-lg">
            <option>All Categories</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Vegetables</option>
          </select>

          <select className="border p-3 rounded-lg">
            <option>Sort By Expiry</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Item
              </th>
              <th className="p-4 text-left">
                Category
              </th>
              <th className="p-4 text-left">
                Qty
              </th>
              <th className="p-4 text-left">
                Expiry
              </th>
              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Milk</td>
              <td className="p-4">Dairy</td>
              <td className="p-4">2</td>
              <td className="p-4">12 Jul</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Fresh
                </span>
              </td>

              <td className="p-4 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
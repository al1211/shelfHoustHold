export default function AddItemPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Add Grocery Item
      </h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <form className="space-y-5">
          <div>
            <label className="block mb-2">
              Item Name
            </label>

            <input
              type="text"
              placeholder="Milk"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Category
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Dairy</option>
              <option>Bakery</option>
              <option>Vegetables</option>
              <option>Fruits</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Quantity
            </label>

            <input
              type="number"
              placeholder="2"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Expiry Date
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Barcode Scanner
            </label>

            <button
              type="button"
              className="w-full border-2 border-dashed p-6 rounded-xl"
            >
              📷 Scan Barcode
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
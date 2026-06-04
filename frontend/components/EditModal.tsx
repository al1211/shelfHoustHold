

export default function EditItemModal({
  isOpen,
  onClose,
  selectedItem,
  setSelectedItem,
  handleUpdate,
}) {
  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-125">
        <h2>Edit Item</h2>

        <input
          value={selectedItem.name}
          onChange={(e) =>
            setSelectedItem({
              ...selectedItem,
              name: e.target.value,
            })
          }
        />

        <button onClick={handleUpdate}>
          Save
        </button>

        <button onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
     

      <main className=" p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome back 👋
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow">
            Household: Roommates House
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-green-500 text-white p-5 rounded-2xl shadow">
            <h3 className="text-lg">Fresh</h3>
            <p className="text-4xl font-bold mt-2">
              15
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-5 rounded-2xl shadow">
            <h3 className="text-lg">
              Expiring Soon
            </h3>

            <p className="text-4xl font-bold mt-2">
              3
            </p>
          </div>

          <div className="bg-red-500 text-white p-5 rounded-2xl shadow">
            <h3 className="text-lg">Expired</h3>

            <p className="text-4xl font-bold mt-2">
              1
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-lg">
              Waste Score
            </h3>

            <p className="text-4xl font-bold mt-2 text-green-600">
              84%
            </p>
          </div>
        </div>

        {/* Shelf Display */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Fresh */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold text-green-600 text-lg mb-4">
              🟢 Fresh
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                Milk - 5 days left
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                Rice - 20 days left
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                Juice - 7 days left
              </div>
            </div>
          </div>

          {/* Expiring */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold text-yellow-600 text-lg mb-4">
              🟡 Expiring Soon
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                Eggs - Tomorrow
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                Bread - 2 days left
              </div>
            </div>
          </div>

          {/* Expired */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold text-red-600 text-lg mb-4">
              🔴 Expired
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                Cheese - Expired
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            🏆 Top Contributors
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>🥇 Anil</span>
              <span>24 used items</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>🥈 Rahul</span>
              <span>18 used items</span>
            </div>

            <div className="flex justify-between">
              <span>🥉 Amit</span>
              <span>12 used items</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
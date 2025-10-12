// pages/HallOfFamePage.jsx
import RankingBoard from "@/components/Ranking/RankingBoard";
import RankingList from "@/components/Ranking/RankingList";
import { FaTrophy } from "react-icons/fa";

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-100 py-8 px-4">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
            <FaTrophy className="text-4xl text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800">Hall of Fame</h1>
          </div>
          <p className="text-lg text-gray-600">
            Những sinh viên có thành tích cao nhất
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Ranking Board (Top 3 or Highlights) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <FaTrophy />
                Top 3 sinh viên có thành tích cao nhất
              </h2>
            </div>
            <div className="">
              <RankingBoard />
            </div>
          </div>

          {/* Ranking List (Full leaderboard) */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex-grow">
            <div className="bg-gray-50 p-4 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">Bảng xếp hạng</h2>
            </div>
            <div className="p-6 overflow-auto">
              <RankingList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {BiChevronRight} from "react-icons/bi";
import { motion } from "framer-motion";
export default function RankingBoard() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/hall-of-fame');
  };
  const topThree = [
    { name: "Thành Nam", score: 252, correct: 265 }, // Top 1
    { name: "Thế Nghĩa", score: 200, correct: 205 }, // Top 2
    { name: "Duy Hưng", score: 169, correct: 176 }, // Top 3
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="p-6 flex-grow overflow-auto bg-gradient-to-t from-yellow-200 to-white rounded-lg">
        <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4 cursor-pointer" onClick={handleClick}>
        </h2>
        
        <div className="flex justify-center items-end mb-8 gap-6">
          <div className="w-1/4 flex flex-col items-center transform transition-all hover:scale-105 bg-gradient-to-b from-gray-200 to-gray-300 p-6 rounded-xl shadow-lg h-64">
            <div className="w-16 h-16 mb-4 flex-shrink-0 relative">
              <Image
                src="/img/avatar/SilverRank.webp"
                alt="Silver Rank"
                width={64}
                height={64}
                className="rounded-full border-4 border-gray-400"
              />
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">2</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="font-semibold text-gray-800 text-lg truncate w-full">{topThree[1].name}</p>
              <p className="text-sm text-gray-600 font-medium">Điểm: <span className="text-gray-800">{topThree[1].score}</span></p>
              <p className="text-sm text-gray-600 font-medium">Lần đúng: <span className="text-gray-800">{topThree[1].correct}</span></p>
            </div>
          </div>

          <div className="w-1/4 flex flex-col items-center transform -translate-y-8 transition-all hover:scale-105 bg-gradient-to-b from-yellow-300 to-yellow-400 p-6 rounded-xl shadow-xl h-72">
            <div className="w-20 h-20 mb-4 flex-shrink-0 relative">
              <Image
                src="/img/avatar/GoldRank.webp"
                alt="Gold Rank"
                width={80}
                height={80}
                className="rounded-full border-4 border-yellow-500"
              />
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">1</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="font-semibold text-gray-800 text-xl truncate w-full">{topThree[0].name}</p>
              <p className="text-sm text-gray-700 font-medium">Điểm: <span className="text-gray-900">{topThree[0].score}</span></p>
              <p className="text-sm text-gray-700 font-medium">Lần đúng: <span className="text-gray-900">{topThree[0].correct}</span></p>
            </div>
          </div>

          <div className="w-1/4 flex flex-col items-center transform transition-all hover:scale-105 bg-gradient-to-b from-amber-400 to-amber-500 p-6 rounded-xl shadow-lg h-64">
            <div className="w-16 h-16 mb-4 flex-shrink-0 relative">
              <Image
                src="/img/avatar/BronzeRank.webp"
                alt="Bronze Rank"
                width={64}
                height={64}
                className="rounded-full border-4 border-amber-600"
              />
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">3</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="font-semibold text-gray-800 text-lg truncate w-full">{topThree[2].name}</p>
              <p className="text-sm text-gray-600 font-medium">Điểm: <span className="text-gray-800">{topThree[2].score}</span></p>
              <p className="text-sm text-gray-600 font-medium">Lần đúng: <span className="text-gray-800">{topThree[2].correct}</span></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
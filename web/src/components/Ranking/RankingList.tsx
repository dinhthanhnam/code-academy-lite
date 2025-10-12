"use client";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

export default function RankingList() {
    const [selected, setSelected] = useState(null);
    
    const rankingList = [
        {
          id: "B22DCAT175",
          name: "Vũ Bình Long",
          class: "D22CQCE3-B",
          correct: 252,
          score: 265,
        },
        {
          id: "B22DCAT371",
          name: "Trịnh Minh Hùng",
          class: "D22CQCE1-B",
          correct: 200,
          score: 205,
        },
        {
          id: "B22DCAT120",
          name: "Nguyễn Bá Hùng",
          class: "D22CQCE3-B",
          correct: 169,
          score: 176,
        },
        {
          id: "B22DCPT008",
          name: "Nguyễn Đức Anh",
          class: "D22CQCE1-B",
          correct: 159,
          score: 162,
        },
        {
          id: "B22DCAT055",
          name: "Trịnh Quốc Anh",
          class: "D22CQCE1-B",
          correct: 157,
          score: 166,
        },
    ];

    return (
        <div className="flex-grow overflow-auto">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="exercise-header bg-gray-100">
                            <th className="exercise-cell text-left p-3">STT</th>
                            <th className="exercise-cell text-left p-3">Họ và tên</th>
                            <th className="exercise-cell text-left p-3">Lớp học</th>
                            <th className="exercise-cell text-left p-3">Lần đúng</th>
                            <th className="exercise-cell text-left p-3">Điểm thi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingList.map((student, index) => (
                            <tr
                                key={student.id}
                                className={`exercise-row ${
                                    selected === student.id ? "bg-primary2" : "hover:bg-gray-50"
                                }`}
                                onClick={() => setSelected(student.id)}
                            >
                                <td className="exercise-cell p-3">{index + 1}</td>
                                <td className="exercise-cell p-3">{student.name}</td>
                                <td className="exercise-cell p-3">{student.class}</td>
                                <td className="exercise-cell p-3 text-green-600">{student.correct}</td>
                                <td className="exercise-cell p-3 text-blue-600">{student.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
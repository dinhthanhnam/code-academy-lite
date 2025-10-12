"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { fetchPersonalCourseClasses } from "@/utils/service/StudentService";
import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  progress: number;
  lessons: number;
  completedLessons: number;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const courseClasses = await fetchPersonalCourseClasses();
        const formattedCourses: Course[] = courseClasses.map((course) => {
          const lessons = Math.floor(Math.random() * 20) + 1; // Random từ 1 đến 20
          const completedLessons = Math.floor(Math.random() * (lessons + 1)); // Random từ 0 đến lessons
          const progress = lessons > 0 ? Math.floor((completedLessons / lessons) * 100) : 0; // Tính progress dựa trên tỷ lệ
          return {
            id: course.id,
            title: course.name,
            progress,
            lessons,
            completedLessons,
          };
        });
        setCourses(formattedCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const updateConstraints = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.parentElement?.offsetWidth || window.innerWidth;
        const contentWidth = courses.length * 320;
        const maxDragLeft = contentWidth > containerWidth ? -(contentWidth - containerWidth) : 0;
        setConstraints({ left: maxDragLeft, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [courses]);

  const handleClick = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  if (loading) {
    return <div className="p-6 text-center">Đang tải danh sách khóa học...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 flex-grow">
      <div className="relative overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="grid grid-rows-1 gap-4 select-none"
          style={{
            gridTemplateColumns: `repeat(${courses.length}, 300px)`,
          }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
          dragMomentum={true}
          initial={{ x: 0 }}
          whileTap={{ cursor: "grabbing" }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className="flex flex-col w-[300px] transform transition-all hover:scale-105 bg-white p-4 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex flex-col flex-grow">
                <h3 className="bg-primary p-2 font-semibold text-white text-lg mb-2 truncate rounded-lg">
                  {course.title}
                </h3>
                <div className="space-y-1">
                  <p className="text-base text-gray-600">
                    Tiến độ: <span className="font-medium text-gray-800">{course.progress}%</span>
                  </p>
                  <p className="text-base text-gray-600">
                    Bài học: <span className="font-medium text-gray-800">{course.completedLessons}/{course.lessons}</span>
                  </p>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleClick(course.id)}
                className="mt-4 w-full bg-secondary text-white py-1 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Tiếp tục học
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
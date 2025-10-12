// components/IcedTeaUponTheAcademy.tsx
"use client";

import { useState } from "react";

export default function IcedTeaUponTheAcademy() {
  // Dữ liệu bài viết mẫu
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Thành Nam",
      content: "Hôm nay trời đẹp quá, uống trà đá thì tuyệt!",
      time: "10:30",
      reactions: { like: 5, love: 2, haha: 0 },
      comments: [
        { id: 1, user: "Duy Hưng", content: "Trà đá là chân ái!", time: "10:32" },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  // Hàm đăng bài mới
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          user: "Me",
          content: newPost,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          reactions: { like: 0, love: 0, haha: 0 },
          comments: [],
        },
      ]);
      setNewPost("");
    }
  };

  // Hàm thêm bình luận
  const handleCommentSubmit = (postId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (newComment[postId]?.trim()) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  user: "Me",
                  content: newComment[postId],
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : post
      );
      setPosts(updatedPosts);
      setNewComment({ ...newComment, [postId]: "" });
    }
  };

  // Hàm thả reaction
  const handleReaction = (postId: number, type: "like" | "love" | "haha") => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            reactions: {
              ...post.reactions,
              [type]: post.reactions[type] + 1,
            },
          }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="flex w-full max-h-screen p-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col bg-gradient-to-b from-orange-100 to-orange-200 rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-orange-300">
          <h2 className="text-2xl font-semibold text-gray-800">
            Trà đá học viện
          </h2>
          <p className="text-sm text-orange-600 font-medium">
            Trà đá đê!
          </p>
        </div>

        {/* Form đăng bài */}
        <form onSubmit={handlePostSubmit} className="p-6 border-b border-orange-300">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-white">M</span>
            </div>
            <input
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Bạn đang nghĩ gì?"
              className="flex-1 p-3 bg-white bg-opacity-70 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              Đăng
            </button>
          </div>
        </form>

        {/* Danh sách bài viết */}
        <div className="flex-1 p-6 overflow-y-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white bg-opacity-80 p-6 mb-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              {/* Header bài viết */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-lg font-semibold text-white">
                    {post.user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {post.user}
                  </p>
                  <p className="text-xs text-gray-600">{post.time}</p>
                </div>
              </div>

              {/* Nội dung bài viết */}
              <p className="text-gray-800 mb-4">{post.content}</p>

              {/* Reactions */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 text-sm text-gray-600">
                  <span>👍 {post.reactions.like}</span>
                  <span>❤️ {post.reactions.love}</span>
                  <span>😂 {post.reactions.haha}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {post.comments.length} Bình luận
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => handleReaction(post.id, "like")}
                  className="px-4 py-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-all duration-200"
                >
                  👍 Thích
                </button>
                <button
                  onClick={() => handleReaction(post.id, "love")}
                  className="px-4 py-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-all duration-200"
                >
                  ❤️ Yêu thích
                </button>
                <button
                  onClick={() => handleReaction(post.id, "haha")}
                  className="px-4 py-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-all duration-200"
                >
                  😂 Haha
                </button>
              </div>

              {/* Bình luận */}
              <div className="mt-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-sm font-semibold text-white">
                        {comment.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {comment.user}
                      </p>
                      <p className="text-gray-800 text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-600 mt-1">{comment.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form thêm bình luận */}
              <form
                onSubmit={(e) => handleCommentSubmit(post.id, e)}
                className="flex gap-3 mt-4"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-white">M</span>
                </div>
                <input
                  value={newComment[post.id] || ""}
                  onChange={(e) =>
                    setNewComment({
                      ...newComment,
                      [post.id]: e.target.value,
                    })
                  }
                  placeholder="Hãy viết gì đó..."
                  className="flex-1 p-2 bg-white bg-opacity-70 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                  Bình luận
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
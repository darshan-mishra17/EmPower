import React, { useState } from 'react';
import { MessageCircle, Plus, ThumbsUp, Reply, Volume2, Mic } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    useVoiceInput: false,
  });

  const posts = [
    {
      id: 1,
      title: 'Tips for Learning with Dyslexia',
      author: 'Sarah M.',
      role: 'Student',
      time: '2 hours ago',
      content: 'I wanted to share some techniques that have helped me with reading comprehension...',
      likes: 12,
      replies: 8,
      isLiked: false,
    },
    {
      id: 2,
      title: 'Accessibility Features in Math Courses',
      author: 'Prof. Johnson',
      role: 'Teacher',
      time: '1 day ago',
      content: 'Has anyone tried using the new equation reader feature? I would love to hear your feedback...',
      likes: 24,
      replies: 15,
      isLiked: true,
    },
    {
      id: 3,
      title: 'Supporting My Child with ADHD',
      author: 'Lisa K.',
      role: 'Parent',
      time: '2 days ago',
      content: 'Looking for advice on how to help my son stay focused during online lessons...',
      likes: 18,
      replies: 22,
      isLiked: false,
    },
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New post:', newPost);
    setShowNewPost(false);
    setNewPost({ title: '', content: '', useVoiceInput: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Community Discussion
          </h1>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Community Guidelines:</strong> All discussions are AI-moderated for inclusivity and respect. 
                  Please keep conversations supportive and focused on learning accessibility.
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            <span>Start New Discussion</span>
          </button>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="new-post-title">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 id="new-post-title" className="text-2xl font-bold text-gray-900 mb-6">
                Start a New Discussion
              </h2>
              
              <form onSubmit={handleSubmitPost} className="space-y-6">
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Discussion Title
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter a descriptive title..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="post-content"
                      rows={6}
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Share your thoughts, questions, or experiences..."
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setNewPost({ ...newPost, useVoiceInput: !newPost.useVoiceInput })}
                      className={`absolute bottom-3 right-3 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        newPost.useVoiceInput
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={newPost.useVoiceInput ? 'Stop voice input' : 'Use voice input'}
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                  {newPost.useVoiceInput && (
                    <p className="mt-2 text-sm text-blue-600 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                      Voice input active - speak now
                    </p>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Post Discussion
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 text-gray-700 py-3 px-4 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Discussion Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      <a
                        href={`/community/post/${post.id}`}
                        className="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{post.author}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.role === 'Teacher' ? 'bg-green-100 text-green-800' :
                        post.role === 'Parent' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {post.role}
                      </span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  
                  <button
                    className="text-gray-400 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                    aria-label="Listen to post with text-to-speech"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button
                      className={`flex items-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 ${
                        post.isLiked 
                          ? 'text-blue-600 hover:text-blue-700' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      aria-label={`${post.isLiked ? 'Unlike' : 'Like'} this post`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{post.likes}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
                      <Reply className="h-5 w-5" />
                      <span className="font-medium">{post.replies} replies</span>
                    </button>
                  </div>

                  <a
                    href={`/community/post/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 focus:text-blue-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  >
                    View Discussion
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Load More Discussions
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
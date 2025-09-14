import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus, ThumbsUp, Reply, Volume2, Mic } from 'lucide-react';
import { communityAPI } from '../services/api';

interface Post {
  _id: string;
  authorId: { name: string };
  role: string;
  content: string;
  createdAt: string;
  replies: any[];
}

const CommunityPage: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await communityAPI.getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await communityAPI.createPost(newPost);
      setNewPost({ content: '' });
      setShowNewPost(false);
      // Refetch posts
      const response = await communityAPI.getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="post-content"
                    rows={6}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your thoughts, questions, or experiences..."
                    required
                  />
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
              key={post._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Community Post
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{post.authorId.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.role === 'Teacher' ? 'bg-green-100 text-green-800' :
                        post.role === 'Parent' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {post.role}
                      </span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      aria-label="Like this post"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span className="font-medium">0</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
                      <Reply className="h-5 w-5" />
                      <span className="font-medium">{post.replies.length} replies</span>
                    </button>
                  </div>

                  <a
                    href={`/community/post/${post._id}`}
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
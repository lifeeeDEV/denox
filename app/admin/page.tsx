'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCategories();
    }
  }, [status]);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.map((category: { name: string }) => category.name));
  };

  const handleCategorySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });
    if (res.ok) {
      setCategory('');
      fetchCategories();
    }
  };

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, image, youtube_link: youtubeLink, category }),
    });
    if (res.ok) {
      setTitle('');
      setDescription('');
      setImage('');
      setYoutubeLink('');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>You must be logged in to access this page.</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-3xl font-bold text-center text-foreground mb-6">Admin Dashboard</h1>

      <form onSubmit={handleCategorySubmit} className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Create Category</h2>
        <label className="block mb-4">
          <span className="text-foregroundMuted">Category Name</span>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Category Name"
          />
        </label>
        <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Create Category
        </button>
      </form>

      <form onSubmit={handleProjectSubmit}>
        <h2 className="text-2xl font-bold text-primary mb-4">Upload Project</h2>
        <label className="block mb-4">
          <span className="text-foregroundMuted">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Project Title"
          />
        </label>
        <label className="block mb-4">
          <span className="text-foregroundMuted">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Project Description"
          />
        </label>
        <label className="block mb-4">
          <span className="text-foregroundMuted">Image URL</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Image URL"
          />
        </label>
        <label className="block mb-4">
          <span className="text-foregroundMuted">YouTube Link</span>
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="YouTube Link"
          />
        </label>
        <label className="block mb-4">
          <span className="text-foregroundMuted">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-surface text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Upload Project
        </button>
      </form>
    </div>
  );
}

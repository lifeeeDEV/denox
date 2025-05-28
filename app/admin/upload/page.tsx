'use client'; // This directive makes this file a client component

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProject() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, image, youtube_link: youtubeLink })
    });
    if (res.ok) {
      setTitle('');
      setDescription('');
      setImage('');
      setYoutubeLink('');
      router.push('/admin/projects');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-3xl font-bold text-center mb-6 text-foreground">Upload Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-surface p-6 rounded-lg shadow-md">
        <label className="block">
          <span className="text-foregroundMuted">Title</span>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Project Title"
          />
        </label>
        <label className="block">
          <span className="text-foregroundMuted">Description</span>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Project Description"
          />
        </label>
        <label className="block">
          <span className="text-foregroundMuted">Image URL</span>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="Image URL"
          />
        </label>
        <label className="block">
          <span className="text-foregroundMuted">YouTube Link</span>
          <input 
            type="text" 
            value={youtubeLink} 
            onChange={(e) => setYoutubeLink(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 text-foreground border border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary placeholder-neutral-500"
            placeholder="YouTube Link"
          />
        </label>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Upload Project
        </button>
      </form>
    </div>
  );
}

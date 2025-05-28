'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  youtube_link: string;
  createdAt: string; // Hinzugefügt, um das Erstellungsdatum zu speichern
};

export default function HomeProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects?limit=4')  // Fetch only 4 projects for the homepage
      .then((res) => res.json())
      .then((data) => {
        // Projekte nach Erstellungsdatum sortieren
        const sortedProjects = data.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProjects(sortedProjects);
      });
  }, []);

  return (
    <div className="mt-20 mb-20 container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-foreground mb-6">Meine Projekte</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-surface bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03] shadow-black/30 hover:shadow-black/40">
            <div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{project.title}</h3>
              <p className="text-foregroundMuted mb-4">{project.description}</p>
              {project.image && <img src={project.image} alt={project.title} className="aspect-video w-full object-cover rounded-md mb-4" />}
            </div>
            <div>
              {project.youtube_link && 
                <Link 
                  href={project.youtube_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors duration-200"
                >
                  Zum Projekt
                </Link>
              }
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href="/projects"
          className="px-4 py-2 bg-primary text-white font-bold rounded-full hover:bg-teal-700 transition-all duration-300">
            Mehr Projekte
        </Link>
      </div>
    </div>
  );
}

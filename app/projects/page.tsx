'use client';

import { useState, useEffect } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  youtube_link: string;
  category: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const categorizedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-4xl font-extrabold text-center text-foreground mb-12">Projekte</h1>
      {Object.keys(categorizedProjects).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">{category}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedProjects[category].map((project) => (
              <li key={project.id} className="bg-surface bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03] shadow-black/30 hover:shadow-black/40">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-accent mb-4">{project.title}</h3>
                  <p className="text-foregroundMuted mb-4">{project.description}</p>
                  {project.image && <img src={project.image} alt={project.title} className="aspect-video w-full object-cover rounded-md mb-4" />}
                </div>
                <div>
                  {project.youtube_link && 
                    <a 
                      href={project.youtube_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors duration-200"
                    >
                      Zum Projekt
                    </a>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

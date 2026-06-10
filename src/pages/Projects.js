import React from 'react';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <section className="hero" id="projects" style={{ minHeight: '80vh' }}>
        <div className="hero-content">
            <h1>
                From Idea to Execution.<br/>
                <span className="gradient-text">Project Today, Master Tomorrow</span>
            </h1>
            <p>
                Start from scratch and grow into a pro with our step-by-step projects. Begin with easy projects, move to medium challenges, and finally tackle hard, real-world projects. Each step builds your skills and confidence, helping you learn by doing and master your craft.
            </p>
            <div className="hero-btns">
                <button className="btn-primary">
                    Get Started
                    <span>→</span>
                </button>
                <button className="btn-secondary">Explore Projects</button>
            </div>
        </div>
        <div className="cards">
            <div className="card">
                <div className="card-image"><img src="/img/java.png" alt="Java" /></div>
                <div className="title">Java Project</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/html.png" alt="HTML" /></div>
                <div className="title">HTML Project</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/cal.png" alt="Cal" /></div>
                <div className="title">Project 2</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/Tic-Tac-Toe Game.png" alt="Tic-Tac-Toe" /></div>
                <div className="title">C Project</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/to do list.png" alt="To Do List" /></div>
                <div className="title">Project 1</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/quiz.png" alt="Quiz" /></div>
                <div className="title">Python Project</div>
            </div>
            <Link to="/projects/github-clone" className="card" style={{ border: '2px solid var(--primary)', textDecoration: 'none' }}>
                <div className="card-image" style={{ fontSize: '2.5rem' }}>🐈‍⬛</div>
                <div className="title">GitHub Clone</div>
            </Link>
        </div>
    </section>
  );
}

export default Projects;

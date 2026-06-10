import React from 'react';
import { Link } from 'react-router-dom';

function Roadmaps() {
  return (
    <section className="hero bg-alt" id="roadmap" style={{ minHeight: '80vh' }}>
        <div className="cards">
            <div className="card">
                <div className="card-image"><img src="/img/java.png" alt="Java" /></div>
                <div className="title">Java Roadmap</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/html.png" alt="HTML" /></div>
                <div className="title">HTML Roadmap</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/cloude.png" alt="Cloud" /></div>
                <div className="title">Cloud Roadmap</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/c.png" alt="C" /></div>
                <div className="title">C Roadmap</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/cn.png" alt="CN" /></div>
                <div className="title">CN Roadmap</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/image.png" alt="Python" /></div>
                <div className="title">Python Roadmap</div>
            </div>
            <Link to="/roadmaps/sde" className="card" style={{ border: '2px solid var(--primary)', textDecoration: 'none' }}>
                <div className="card-image" style={{ fontSize: '2.5rem' }}>🎯</div>
                <div className="title">SDE Roadmap</div>
            </Link>
        </div>
        <div className="hero-content">
            <h1>
                Master Programming<br/>
                <span className="gradient-text">with Oriented Roadmap</span>
            </h1>
            <p>
                We provide a well-structured and industry-oriented roadmap to guide learners toward becoming confident and skilled developers. With practical learning, real-world examples, and continuous guidance, we help you build strong fundamentals, improve problem-solving abilities, and shape yourself into a professional and job-ready developer.
            </p>
            <div className="hero-btns">
                <button className="btn-primary">
                    Get Started
                    <span>→</span>
                </button>
                <button className="btn-secondary">Explore Roadmaps</button>
            </div>
        </div>
    </section>
  );
}

export default Roadmaps;

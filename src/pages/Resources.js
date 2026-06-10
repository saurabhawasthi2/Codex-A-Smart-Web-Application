import React from 'react';
import { Link } from 'react-router-dom';

function Resources() {
  return (
    <section className="hero bg-alt" id="resources" style={{ minHeight: '80vh' }}>
        <div className="cards">
            <div className="card">
                <div className="card-image"><img src="/img/java.png" alt="Java" /></div>
                <div className="title">Java Notes</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/html.png" alt="HTML" /></div>
                <div className="title">HTML Notes</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/cal.png" alt="Cloud" /></div>
                <div className="title">Cloud Notes</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/Tic-Tac-Toe Game.png" alt="C" /></div>
                <div className="title">C Notes</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/to do list.png" alt="CN" /></div>
                <div className="title">CN Notes</div>
            </div>
            <div className="card">
                <div className="card-image"><img src="/img/quiz.png" alt="Python" /></div>
                <div className="title">Python Notes</div>
            </div>
            <Link to="/resources/dsa" className="card" style={{ border: '2px solid var(--primary)', textDecoration: 'none' }}>
                <div className="card-image" style={{ fontSize: '2.5rem' }}>🌳</div>
                <div className="title">DSA Notes</div>
            </Link>
            <div className="card" style={{ border: '2px solid var(--primary)' }}>
                <div className="card-image" style={{ fontSize: '2.5rem' }}>☕</div>
                <div className="title">Adv. Java Notes</div>
            </div>
        </div>
        <div className="hero-content">
            <h1>
                Comprehensive Study Material.<br/>
                <span className="gradient-text">Notes that make sense</span>
            </h1>
            <p>
                Access top-quality notes prepared by industry experts. Whether you're studying for an exam or brushing up on a new language, our concise and comprehensive resources make learning effortless.
            </p>
            <div className="hero-btns">
                <button className="btn-primary">
                    Get Started
                    <span>→</span>
                </button>
                <button className="btn-secondary">Explore Notes</button>
            </div>
        </div>
    </section>
  );
}

export default Resources;

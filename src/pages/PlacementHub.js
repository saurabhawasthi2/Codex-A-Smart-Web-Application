import React from 'react';
import { Link } from 'react-router-dom';

function PlacementHub() {
  return (
    <section className="hero" id="placement-hub" style={{ minHeight: '80vh', gridTemplateColumns: '1fr' }}>
        <div className="hero-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
            <h1>
                Get Ready For <br/>
                <span className="gradient-text">Your Dream Job</span>
            </h1>
            <p>
                A dedicated hub for interview preparation, resume building, and placement opportunities. Prepare specifically for top product-based and service-based companies.
            </p>
        </div>
        
        <div className="cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', padding: '0 2rem' }}>
            <Link to="/placement-hub/amazon" className="card" style={{ border: '2px solid var(--primary)', textDecoration: 'none' }}>
                <div className="card-image" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
                <div className="title">Amazon Prep</div>
            </Link>
            <div className="card" style={{ border: '2px solid var(--primary)' }}>
                <div className="card-image" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔍</div>
                <div className="title">Google Prep</div>
            </div>
            <div className="card" style={{ border: '2px solid var(--primary)' }}>
                <div className="card-image" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏢</div>
                <div className="title">Capgemini Prep</div>
            </div>
            <div className="card" style={{ border: '2px solid var(--primary)' }}>
                <div className="card-image" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍💻</div>
                <div className="title">Role-Oriented</div>
            </div>
        </div>
    </section>
  );
}

export default PlacementHub;

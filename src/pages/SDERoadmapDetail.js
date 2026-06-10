import React from 'react';
import { Link } from 'react-router-dom';

function SDERoadmapDetail() {
  return (
    <div className="detail-page">
      <div className="detail-header bg-alt">
        <Link to="/roadmaps" className="back-link">← Back to Roadmaps</Link>
        <h1>SDE Roadmap</h1>
        <p>Your step-by-step guide to becoming a top-tier Software Development Engineer.</p>
      </div>
      
      <div className="detail-content">
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Programming Fundamentals</h3>
              <p>Master a primary language like C++, Java, or Python. Understand variables, loops, conditional statements, and functions.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Data Structures & Algorithms</h3>
              <p>Learn Arrays, Linked Lists, Trees, Graphs, Sorting, and Dynamic Programming. Practice consistently on LeetCode or Codeforces.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Core CS Subjects</h3>
              <p>Study Operating Systems, Database Management Systems (DBMS), and Computer Networks. These are crucial for interviews.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>System Design</h3>
              <p>Understand how to build scalable systems. Learn about load balancers, caching, microservices, and database scaling.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SDERoadmapDetail;

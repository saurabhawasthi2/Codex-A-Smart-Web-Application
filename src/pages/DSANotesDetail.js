import React from 'react';
import { Link } from 'react-router-dom';

function DSANotesDetail() {
  return (
    <div className="detail-page">
      <div className="detail-header bg-alt">
        <Link to="/resources" className="back-link">← Back to Resources</Link>
        <h1>DSA Notes</h1>
        <p>Comprehensive Data Structures and Algorithms study materials.</p>
      </div>
      
      <div className="detail-content">
        <div className="resource-grid">
          <div className="resource-module">
            <h3>Module 1: Linear Data Structures</h3>
            <ul>
              <li>Arrays & Dynamic Arrays</li>
              <li>Linked Lists (Singly, Doubly, Circular)</li>
              <li>Stacks & Queues Implementation</li>
            </ul>
            <button className="btn-secondary btn-sm">Download PDF</button>
          </div>
          <div className="resource-module">
            <h3>Module 2: Non-Linear Data Structures</h3>
            <ul>
              <li>Binary Trees & BSTs</li>
              <li>Heaps & Priority Queues</li>
              <li>Graphs (BFS, DFS, Shortest Path)</li>
            </ul>
            <button className="btn-secondary btn-sm">Download PDF</button>
          </div>
          <div className="resource-module">
            <h3>Module 3: Algorithmic Paradigms</h3>
            <ul>
              <li>Divide & Conquer</li>
              <li>Greedy Algorithms</li>
              <li>Dynamic Programming</li>
            </ul>
            <button className="btn-secondary btn-sm">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DSANotesDetail;

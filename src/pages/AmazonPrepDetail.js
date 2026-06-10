import React from 'react';
import { Link } from 'react-router-dom';

function AmazonPrepDetail() {
  return (
    <div className="detail-page">
      <div className="detail-header bg-alt">
        <Link to="/placement-hub" className="back-link">← Back to Placement Hub</Link>
        <h1>Amazon Interview Prep</h1>
        <p>Your comprehensive guide to cracking the Amazon SDE interview.</p>
      </div>
      
      <div className="detail-content">
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Online Assessment (OA)</h3>
              <p>Usually consists of 2 coding questions (medium-hard) focused on Strings, Arrays, and Graphs, followed by a Work Style Assessment.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Technical Phone Screen</h3>
              <p>A 45-60 minute interview with an engineer. Focuses on DSA problem solving and 1-2 Leadership Principle questions.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>The Loop (Onsite)</h3>
              <p>4-5 rounds of interviews. Heavy emphasis on Amazon's 16 Leadership Principles (Behavioral), System Design, and advanced DSA.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Leadership Principles</h3>
              <p>Use the STAR method (Situation, Task, Action, Result) to frame your stories. "Customer Obsession" and "Deliver Results" are key.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AmazonPrepDetail;

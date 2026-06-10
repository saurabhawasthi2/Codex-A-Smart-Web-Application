import React from 'react';
import { Link } from 'react-router-dom';

function GitHubCloneDetail() {
  return (
    <div className="detail-page">
      <div className="detail-header bg-alt">
        <Link to="/projects" className="back-link">← Back to Projects</Link>
        <h1>GitHub Clone</h1>
        <p>Build a fully functional GitHub clone with repository tracking and markdown rendering.</p>
      </div>
      
      <div className="detail-content">
        <div className="project-setup">
          <h2>Project Setup</h2>
          <div className="code-block">
            <pre>
              <code>
                npx create-react-app github-clone{'\n'}
                cd github-clone{'\n'}
                npm install axios react-router-dom styled-components
              </code>
            </pre>
          </div>
        </div>

        <div className="steps-container mt-4">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>GitHub API Integration</h3>
              <p>Setup Axios to fetch user data and repositories from the public GitHub REST API.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>UI Layout</h3>
              <p>Recreate the navigation bar, sidebar profile, and repository list using CSS Grid and Flexbox.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Markdown Rendering</h3>
              <p>Implement a markdown parser to dynamically render the repository's README.md files on the UI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GitHubCloneDetail;

// src/components/PopupBuilder.js
import './PopupBuilder.css';

function PopupBuilder() {
  return (
    <div className="popup-builder">
      <h1>Popup Builder</h1>
      <p>Create engaging popups to capture leads and boost conversions.</p>
      <div className="builder-demo">
        <div className="builder-controls">
          <h3>Customize Your Popup</h3>
          <label>
            Title:
            <input type="text" placeholder="Enter popup title" />
          </label>
          <label>
            Message:
            <textarea placeholder="Enter popup message"></textarea>
          </label>
          <label>
            CTA Text:
            <input type="text" placeholder="Enter CTA text" />
          </label>
          <button>Preview Popup</button>
        </div>
        <div className="popup-preview">
          <h3>Preview</h3>
          <div className="preview-area">
            {/* Popup preview will be shown here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupBuilder;
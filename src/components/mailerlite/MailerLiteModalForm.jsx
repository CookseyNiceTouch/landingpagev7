import { useEffect, useRef } from 'react';
import SquareButton from '../UIbits/sqbutton';
import './mailerLiteModal.css';

const MailerLiteModalForm = ({ onClose, onSuccess }) => {
  const formRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Generate unique form ID for modal
    const modalFormId = 'mlb2-modal-24164656';
    
    // Load MailerLite scripts
    const script = document.createElement('script');
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.async = true;
    document.body.appendChild(script);
    scriptRef.current = script;

    script.onload = () => {
      // Add success callback for modal
      window.ml_webform_success_modal_24164656 = function() {
        // Hide the minimal form and show success message
        const minimalForm = document.querySelector('.minimal-form-content');
        const successMessage = document.querySelector('.minimal-success-message');
        
        if (minimalForm && successMessage) {
          minimalForm.style.display = 'none';
          successMessage.style.display = 'block';
          
          // Call parent success handler
          if (onSuccess) {
            setTimeout(onSuccess, 2000); // Show success message for 2s then close
          }
        }
      };

      // Initialize form
      fetch("https://assets.mailerlite.com/jsonp/1413791/forms/150028848308684795/takel");

      // Style the submit button to match our design
      setTimeout(() => {
        const button = document.querySelector('.ml-subscribe-form-modal-24164656 .ml-form-horizontalRow button.primary');
        if (button) {
          button.style.display = 'none'; // Hide original button
        }
      }, 500);
    };

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      // Clean up global callback
      if (window.ml_webform_success_modal_24164656) {
        delete window.ml_webform_success_modal_24164656;
      }
    };
  }, [onSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the email value from the visible input
    const visibleEmailInput = formRef.current?.querySelector('.minimal-email-input');
    const hiddenEmailInput = formRef.current?.querySelector('.hidden-email-input');
    
    if (!visibleEmailInput || !visibleEmailInput.value.trim()) {
      return; // Simple validation - just don't submit if empty
    }

    // Copy the email value to the hidden MailerLite input
    if (hiddenEmailInput) {
      hiddenEmailInput.value = visibleEmailInput.value;
    }

    // Trigger the original MailerLite form submission
    const originalSubmit = formRef.current?.querySelector('.hidden-submit-button');
    
    if (originalSubmit) {
      originalSubmit.click();
    }
  };

  return (
    <div ref={formRef} className="minimal-form-container">
      
      {/* Hidden MailerLite form for backend functionality */}
      <div style={{ display: 'none' }} id="mlb2-modal-24164656" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-modal-24164656">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
              <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/1413791/forms/150028848308684795/subscribe" data-code="" method="post">
                <div className="ml-form-formContent horozintalForm">
                  <div className="ml-form-horizontalRow">
                    <div className="ml-input-horizontal">
                      <div style={{ width: '100%' }} className="horizontal-fields">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <input 
                            type="email" 
                            className="form-control hidden-email-input" 
                            name="fields[email]" 
                            placeholder="Enter your email" 
                            autoComplete="email" 
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-button-horizontal primary">
                      <button type="submit" className="primary hidden-submit-button">Sign Up</button>
                      <button disabled style={{ display: 'none' }} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                  </div>
                </div>
                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>
            <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
              <div className="ml-form-successContent">
                <h4>Thanks for signing up!</h4>
                <p>We'll be in touch soon with early access details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal visible form */}
      <div className="minimal-form">
        <div className="minimal-form-content">
          <input 
            type="email" 
            className="minimal-email-input" 
            placeholder="your email"
            required
          />
          <button 
            type="button" 
            className="minimal-submit-button"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
        
        {/* Success message */}
        <div className="minimal-success-message" style={{ display: 'none' }}>
          <p>thank you</p>
        </div>
      </div>
      
    </div>
  );
};

export default MailerLiteModalForm; 
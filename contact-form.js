// js/contact-form.js
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    // If the contact form doesn't exist on the page, do nothing.
    if (!contactForm) {
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('contactFormMessage');

    contactForm.addEventListener('submit', function (event) {
        // Prevent the default browser action of submitting the form and reloading the page.
        event.preventDefault();
        event.stopPropagation();

        // Use Bootstrap's built-in validation feedback.
        // If the form is invalid, it adds the 'was-validated' class to show error messages.
        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }
        contactForm.classList.add('was-validated');

        // Disable the button and show a loading state to prevent multiple submissions.
        const originalButtonText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;

        // Hide any previous success or error messages before a new submission.
        formMessage.style.display = 'none';
        formMessage.className = 'alert mt-3';

        // Gather all the form data into a single object.
        const formData = new FormData(contactForm);

        // Send the form data to the PHP script using the Fetch API.
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // We expect a JSON response from the server.
            }
        })
        .then(response => {
            // Check if the server responded with an error (e.g., 404 Not Found, 500 Server Error).
            if (!response.ok) {
                // Try to parse the error message from the server's JSON response.
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `Server error: ${response.status}`);
                });
            }
            // If the response is OK, parse the JSON data.
            return response.json();
        })
        .then(data => {
            // The server responded successfully. Check the 'success' status we defined in our PHP script.
            if (data.success) {
                formMessage.classList.add('alert-success');
                formMessage.innerHTML = data.message;
                contactForm.reset(); // Clear the form fields.
                contactForm.classList.remove('was-validated'); // Reset validation state.
            } else {
                // The server handled the request but returned an error (e.g., validation failed).
                formMessage.classList.add('alert-danger');
                formMessage.innerHTML = data.message;
            }
            formMessage.style.display = 'block'; // Show the message container.
        })
        .catch(error => {
            // This block catches network errors or the errors we threw from the response check.
            console.error('Submission error:', error);
            formMessage.classList.add('alert-danger');
            formMessage.innerHTML = `An unexpected error occurred: ${error.message}. Please try again.`;
            formMessage.style.display = 'block';
        })
        .finally(() => {
            // This block runs whether the submission succeeded or failed.
            // Re-enable the button and restore its original text.
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButtonText;
        });
    });
});
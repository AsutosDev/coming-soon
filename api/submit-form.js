export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { firstName, phone, email } = req.body;

        if (!firstName || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfgvP_8lGbZ5DlZ7JPA7ai-km6_dpN2hMJzrz0p7OfABkq5XQ/formResponse';
        const FIRST_NAME_ENTRY = 'entry.1913154893';
        const PHONE_ENTRY = 'entry.1629609847';
        const EMAIL_ENTRY = 'entry.681848502';

        const formData = new URLSearchParams();
        formData.append(FIRST_NAME_ENTRY, firstName);
        formData.append(PHONE_ENTRY, phone);
        formData.append(EMAIL_ENTRY, email);

        const response = await fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.ok) {
            return res.status(200).json({ 
                success: true,
                message: 'Form submitted successfully' 
            });
        } else {
            throw new Error(`Google Forms returned status ${response.status}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        return res.status(500).json({ 
            error: 'Failed to submit form. Please try again later.',
            details: error.message 
        });
    }
}
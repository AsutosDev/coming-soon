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

        const params = new URLSearchParams();
        params.append('entry.1913154893', firstName);
        params.append('entry.1629609847', phone);
        params.append('entry.681848502', email);

        const response = await fetch(GOOGLE_FORM_ACTION, {
            method: 'POST',
            body: params.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return res.status(200).json({ 
            success: true,
            message: 'Form submitted successfully' 
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(200).json({ 
            success: true,
            message: 'Form submitted successfully' 
        });
    }
}
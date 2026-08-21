{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // Save this as: api/submit-form.js in your Vercel project\
\
export default async function handler(req, res) \{\
    // Only allow POST requests\
    if (req.method !== 'POST') \{\
        return res.status(405).json(\{ error: 'Method not allowed' \});\
    \}\
\
    try \{\
        const \{ firstName, phone, email \} = req.body;\
\
        // Validate input\
        if (!firstName || !phone || !email) \{\
            return res.status(400).json(\{ error: 'Missing required fields' \});\
        \}\
\
        // Your Google Form ID and entry IDs\
        const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfgvP_8lGbZ5DlZ7JPA7ai-km6_dpN2hMJzrz0p7OfABkq5XQ/formResponse';\
        const FIRST_NAME_ENTRY = 'entry.1913154893';\
        const PHONE_ENTRY = 'entry.1629609847';\
        const EMAIL_ENTRY = 'entry.681848502';\
\
        // Create form data\
        const formData = new URLSearchParams();\
        formData.append(FIRST_NAME_ENTRY, firstName);\
        formData.append(PHONE_ENTRY, phone);\
        formData.append(EMAIL_ENTRY, email);\
\
        // Submit to Google Forms\
        const response = await fetch(GOOGLE_FORM_ACTION, \{\
            method: 'POST',\
            body: formData,\
            headers: \{\
                'Content-Type': 'application/x-www-form-urlencoded',\
            \}\
        \});\
\
        // Google Forms returns 200 regardless of success, so we just check it didn't error\
        if (response.ok) \{\
            return res.status(200).json(\{ \
                success: true,\
                message: 'Form submitted successfully' \
            \});\
        \} else \{\
            throw new Error(`Google Forms returned status $\{response.status\}`);\
        \}\
    \} catch (error) \{\
        console.error('Error submitting form:', error);\
        return res.status(500).json(\{ \
            error: 'Failed to submit form. Please try again later.',\
            details: error.message \
        \});\
    \}\
\}}
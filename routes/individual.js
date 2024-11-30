const express = require('express');
const router = express.Router();
const path = require('path');
const { Pool } = require('pg'); // Add pg module to interact with the database

// PostgreSQL Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'project',
    password: '1234',
    port: 5432,
});

// Serve the Individual Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../individual.html'));
});

// Route to fetch attended interviews
router.get('/attended-interviews', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT si.name, si.email, si.interview_date, si.interview_time, ai.attended_at
            FROM attended_interviews ai
            JOIN scheduled_interviews si ON ai.interview_id = si.id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching attended interviews.' });
    }
});

// Route to mark an interview as attended
router.post('/attend-interview', async (req, res) => {
    const { interview_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO attended_interviews (interview_id) VALUES ($1) RETURNING *',
            [interview_id]
        );
        res.status(200).json({ message: 'Interview marked as attended!', interview: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error marking interview as attended.' });
    }
});


// Route to get all scheduled interviews
router.get('/scheduled-interviews', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scheduled_interviews');
        res.status(200).json(result.rows); // Return interviews as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching scheduled interviews.' });
    }
});

// Route to get interview counts (scheduled and attended)
router.get('/interview-counts', async (req, res) => {
    try {
        const scheduledResult = await pool.query('SELECT COUNT(*) FROM scheduled_interviews');
        const attendedResult = await pool.query('SELECT COUNT(*) FROM attended_interviews');
        res.status(200).json({
            scheduled_count: scheduledResult.rows[0].count,
            attended_count: attendedResult.rows[0].count
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching interview counts.' });
    }
});

// Route to schedule a new interview
router.post('/schedule-interview', async (req, res) => {
    const { name, email, interview_date, interview_time } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO scheduled_interviews (name, email, interview_date, interview_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, interview_date, interview_time]
        );
        res.status(201).json({ message: 'Interview scheduled successfully!', interview: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error scheduling interview.' });
    }
});

// Route to mark an interview as attended
router.post('/attend-interview', async (req, res) => {
    const { interview_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO attended_interviews (interview_id) VALUES ($1) RETURNING *',
            [interview_id]
        );
        res.status(200).json({ message: 'Interview marked as attended!', interview: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error marking interview as attended.' });
    }
});

// Fetch user profile
router.get('/profile', async (req, res) => {
    try {

        // Retrieve user email from session or authentication mechanism
        const userEmail = req.headers['user-email']; // Use session or pass email in request headers

        if (!userEmail) {
            return res.status(401).json({ error: 'Unauthorized: No email found in session.' });
        }

        // Query to fetch profile details
        const query = `
            SELECT  email_id, name, role, mobile_no, designation 
            FROM users 
            WHERE email_id = $1
        `;
        const result = await pool.query(query, [userEmail]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'An error occurred while fetching the profile' });
    }
});

module.exports = router;

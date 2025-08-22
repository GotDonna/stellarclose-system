const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const IntelligentWorkflowManager = require('./workflow-manager');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// Create/connect to database
const db = new sqlite3.Database('stellarclose.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
        createTables();
    }
});

// Create the table to store listing information
function createTables() {
    const createListingsTable = `
        CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_address TEXT,
            city TEXT,
            zip_code TEXT,
            client_type TEXT,
            uses_dotloop TEXT,
            dotloop_invite_status TEXT,
            dotloop_email TEXT,
            communication_permission TEXT,
            authorized_contacts TEXT,
            calendar_integration TEXT,
            agent_comm_method TEXT,
            crm_choice TEXT,
            legibility_agreement TEXT,
            additional_notes TEXT,
            submitted_at TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    db.run(createListingsTable, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('✅ Listings table ready');
// Initialize our intelligent workflow system
const workflowManager = new IntelligentWorkflowManager();

console.log('🧠 Intelligent Workflow Manager initialized!');
        }
    });
}

// API endpoint to receive form submissions
app.post('/api/listings', (req, res) => {
    console.log('📝 Received form submission:', req.body);
    
    const {
        propertyAddress,
        city,
        zipCode,
        clientType,
        usesDotLoop,
        dotLoopInviteStatus,
        dotLoopEmail,
        communicationPermission,
        authorizedContacts,
        calendarIntegration,
        agentCommMethod,
        crmChoice,
        legibilityAgreement,
        additionalNotes,
        submittedAt
    } = req.body;
    
    // Convert arrays to strings for storage
    const authorizedContactsStr = Array.isArray(authorizedContacts) ? authorizedContacts.join(', ') : authorizedContacts;
    
    // Insert the data into the database
    const insertQuery = `
        INSERT INTO listings (
            property_address, city, zip_code, client_type, uses_dotloop,
            dotloop_invite_status, dotloop_email, communication_permission,
            authorized_contacts, calendar_integration, agent_comm_method,
            crm_choice, legibility_agreement, additional_notes, submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(insertQuery, [
        propertyAddress, city, zipCode, clientType, usesDotLoop,
        dotLoopInviteStatus, dotLoopEmail, communicationPermission,
        authorizedContactsStr, calendarIntegration, agentCommMethod,
        crmChoice, legibilityAgreement, additionalNotes, submittedAt
    ], function(err) {
        if (err) {
            console.error('❌ Database error:', err.message);
            res.status(500).json({ 
                success: false, 
                error: 'Failed to save listing' 
            });
        } else {
            console.log(`✅ New listing saved with ID: ${this.lastID}`);
            res.json({ 
                success: true, 
                message: 'Listing submitted successfully!',
                listingId: this.lastID 
            });
        }
    });
});

// API endpoint to get all listings
app.get('/api/listings', (req, res) => {
    db.all('SELECT * FROM listings ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            console.error('❌ Database error:', err.message);
            res.status(500).json({ error: 'Failed to fetch listings' });
        } else {
            res.json(rows);
    });
});

// Start the server
// (existing code above)

// State pricing page routes
// State pricing page routes
const statePrices = {
    michigan: { name: "Michigan", price: "350" },
    newyork: { name: "New York", price: "700" },
    california: { name: "California", price: "850" },
    texas: { name: "Texas", price: "450" },
    florida: { name: "Florida", price: "500" },
    illinois: { name: "Illinois", price: "600" },
    pennsylvania: { name: "Pennsylvania", price: "400" },
    ohio: { name: "Ohio", price: "350" },
    georgia: { name: "Georgia", price: "400" },
    northcarolina: { name: "North Carolina", price: "375" }
};
app.get('/pricing/:state', (req, res) => {
    const state = req.params.state.toLowerCase();
    const stateInfo = statePrices[state];
    
    if (!stateInfo) {
        return res.status(404).send('State not found');
    }
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STELLARCLOSE - ${stateInfo.name} Pricing</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; color: white; }
        .header h1 { font-size: 3rem; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px; }
        .price-amount { font-size: 4rem; font-weight: 700; color: #667eea; margin-bottom: 10px; }
        .pricing-card { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 40px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 1.2rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>STELLARCLOSE</h1>
            <p>${stateInfo.name} Pricing</p>
        </div>
        <div class="pricing-card">
            <div style="text-align: center; margin-bottom: 40px;">
                <div class="price-amount">$${stateInfo.price}</div>
                <p>Complete Real Estate Closing Package</p>
            </div>
            <div style="text-align: center;">
                <a href="/intake" class="cta-button">Start Your ${stateInfo.name} Closing →</a>
            </div>
        </div>
    </div>
</body>
</html>`;res.send(html);
});
    
    res.send(html);
});
// Start the server
});

app.listen(PORT, () => {
    console.log(`🚀 STELLARCLOSE server running at http://localhost:${PORT}`);
    console.log(`📋 Form available at: http://localhost:${PORT}`);
    console.log(`👨‍💼 Admin dashboard at: http://localhost:${PORT}/admin.html`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api/listings`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});

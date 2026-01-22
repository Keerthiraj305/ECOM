const db = require('./db');
require('dotenv').config();

async function migrate() {
    try {
        console.log('Starting database migration...');

        // Add phone column if it doesn't exist
        try {
            await db.execute(`ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER password`);
            console.log('✓ Added phone column');
        } catch (err) {
            if (err.message.includes('Duplicate column name')) {
                console.log('✓ Phone column already exists');
            } else {
                throw err;
            }
        }

        // Add address column if it doesn't exist
        try {
            await db.execute(`ALTER TABLE users ADD COLUMN address VARCHAR(255) AFTER phone`);
            console.log('✓ Added address column');
        } catch (err) {
            if (err.message.includes('Duplicate column name')) {
                console.log('✓ Address column already exists');
            } else {
                throw err;
            }
        }

        // Check the current table structure
        const [columns] = await db.execute(`DESCRIBE users`);
        console.log('\n✅ Users table structure:');
        columns.forEach(col => {
            console.log(`   - ${col.Field} (${col.Type})`);
        });

        console.log('\n✅ Database migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err.message);
        process.exit(1);
    }
}

migrate();

const mysql = require('mysql2');
require('dotenv').config();

// Create connection without specifying database first
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    // Create database if it doesn't exist
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
        if (err) throw err;
        console.log(`Database '${process.env.DB_NAME}' created or already exists`);

        // Use the database
        connection.query(`USE ${process.env.DB_NAME}`, (err) => {
            if (err) throw err;

            // Create users table
            const usersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    phone VARCHAR(20),
                    address VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            connection.query(usersTable, (err) => {
                if (err) throw err;
                console.log('✓ Users table created or already exists');

                // Create category table
                const categoryTable = `
                    CREATE TABLE IF NOT EXISTS category (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(100) NOT NULL UNIQUE,
                        description TEXT
                    )
                `;

                connection.query(categoryTable, (err) => {
                    if (err) throw err;
                    console.log('✓ Category table created or already exists');

                    // Create product table
                    const productTable = `
                        CREATE TABLE IF NOT EXISTS product (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(150) NOT NULL,
                            description TEXT,
                            price DECIMAL(10, 2) NOT NULL,
                            category_id INT NOT NULL,
                            stock INT DEFAULT 0,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (category_id) REFERENCES category(id)
                        )
                    `;

                    connection.query(productTable, (err) => {
                        if (err) throw err;
                        console.log('✓ Product table created or already exists');

                        // Create cart_items table
                        const cartTable = `
                            CREATE TABLE IF NOT EXISTS cart_items (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                user_id INT NOT NULL,
                                product_id INT NOT NULL,
                                quantity INT NOT NULL DEFAULT 1,
                                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (user_id) REFERENCES users(id),
                                FOREIGN KEY (product_id) REFERENCES product(id)
                            )
                        `;

                        connection.query(cartTable, (err) => {
                            if (err) throw err;
                            console.log('✓ Cart items table created or already exists');

                            // Create orders table
                            const ordersTable = `
                                CREATE TABLE IF NOT EXISTS orders (
                                    id INT PRIMARY KEY AUTO_INCREMENT,
                                    user_id INT NOT NULL,
                                    total_price DECIMAL(10, 2) NOT NULL,
                                    delivery_address VARCHAR(255),
                                    payment_method VARCHAR(50),
                                    order_status VARCHAR(50) DEFAULT 'pending',
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    FOREIGN KEY (user_id) REFERENCES users(id)
                                )
                            `;

                            connection.query(ordersTable, (err) => {
                                if (err) throw err;
                                console.log('✓ Orders table created or already exists');

                                // Create order_transactions table
                                const orderTransTable = `
                                    CREATE TABLE IF NOT EXISTS order_transactions (
                                        id INT PRIMARY KEY AUTO_INCREMENT,
                                        order_id INT NOT NULL,
                                        product_id INT NOT NULL,
                                        quantity INT NOT NULL,
                                        price DECIMAL(10, 2) NOT NULL,
                                        FOREIGN KEY (order_id) REFERENCES orders(id),
                                        FOREIGN KEY (product_id) REFERENCES product(id)
                                    )
                                `;

                                connection.query(orderTransTable, (err) => {
                                    if (err) throw err;
                                    console.log('✓ Order transactions table created or already exists');

                                    // Create payment table
                                    const paymentTable = `
                                        CREATE TABLE IF NOT EXISTS payment (
                                            id INT PRIMARY KEY AUTO_INCREMENT,
                                            order_id INT NOT NULL,
                                            amount DECIMAL(10, 2) NOT NULL,
                                            payment_status VARCHAR(50) DEFAULT 'pending',
                                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                            FOREIGN KEY (order_id) REFERENCES orders(id)
                                        )
                                    `;

                                    connection.query(paymentTable, (err) => {
                                        if (err) throw err;
                                        console.log('✓ Payment table created or already exists');
                                        console.log('\n✅ All database tables initialized successfully!');
                                        connection.end();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

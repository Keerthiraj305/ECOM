const db = require('./db');
require('dotenv').config();

async function seedProducts() {
    try {
        console.log('Starting product seeding...');

        // Add sample products with the correct column names
        const products = [
            {
                pname: 'Wireless Headphones',
                description: 'High quality wireless headphones with noise cancellation',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                price: 2999
            },
            {
                pname: 'Smart Watch',
                description: 'Latest smartwatch with fitness tracking',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                price: 4999
            },
            {
                pname: 'Bluetooth Speaker',
                description: 'Portable bluetooth speaker with great sound',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                price: 1999
            },
            {
                pname: 'Laptop Backpack',
                description: 'Durable laptop backpack with multiple compartments',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                price: 1499
            },
            {
                pname: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse',
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
                price: 899
            },
            {
                pname: 'Phone Stand',
                description: 'Adjustable phone stand',
                image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
                price: 599
            }
        ];

        for (const product of products) {
            try {
                const [result] = await db.execute(
                    'INSERT INTO product (pname, description, image, price) VALUES (?, ?, ?, ?)',
                    [product.pname, product.description, product.image, product.price]
                );
                console.log(`✓ Product '${product.pname}' added (ID: ${result.insertId})`);
            } catch (err) {
                if (err.message.includes('Duplicate entry')) {
                    console.log(`✓ Product '${product.pname}' already exists`);
                } else {
                    throw err;
                }
            }
        }

        // Verify products
        const [allProducts] = await db.execute('SELECT id, pname, price FROM product');
        console.log('\n✅ All products in database:');
        allProducts.forEach(p => {
            console.log(`   - ID: ${p.id}, Name: ${p.pname}, Price: ₹${p.price}`);
        });

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err.message);
        process.exit(1);
    }
}

seedProducts();

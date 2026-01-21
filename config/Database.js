import { Sequelize } from "sequelize";

// Konfigurasi koneksi ke MySQL (Laragon)
// Default Laragon: user 'root', password kosong
const db = new Sequelize(
    process.env.DB_NAME || 'db_tiketgercep',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set ke true jika ingin melihat SQL queries di console
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test koneksi database
db.authenticate()
    .then(() => {
        console.log('✅ Koneksi database MySQL berhasil!');
    })
    .catch(err => {
        console.error('❌ Tidak dapat terhubung ke database:', err.message);
        console.error('💡 Pastikan MySQL di Laragon sudah running!');
        console.error('💡 Klik Start All di Laragon');
    });

export default db;
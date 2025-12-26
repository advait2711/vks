import supabase from '../config/supabase.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    try {
        console.log('Running migration to add otp_plain column...');

        // Read the SQL file
        const sqlPath = path.join(__dirname, 'add-otp-plain-column.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Execute the SQL
        const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

        if (error) {
            console.error('Migration error:', error);
            // Try alternative approach using direct query
            console.log('Trying direct approach...');

            const { error: alterError } = await supabase
                .from('kerala_samaj_data')
                .select('otp_plain')
                .limit(1);

            if (alterError && alterError.message.includes('column')) {
                console.log('Column does not exist, you need to add it manually in Supabase dashboard');
                console.log('Go to: Table Editor > kerala_samaj_data > Add Column');
                console.log('Column name: otp_plain');
                console.log('Type: text');
                console.log('Nullable: yes');
            } else {
                console.log('Column already exists!');
            }
        } else {
            console.log('Migration completed successfully!');
        }
    } catch (error) {
        console.error('Error running migration:', error);
    }
}

runMigration();

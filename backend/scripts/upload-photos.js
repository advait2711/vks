import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Event descriptions
const eventDescriptions = {
    '2024-2025': {
        'Event1': {
            name: 'Ponnonam 2024',
            description: 'A vibrant celebration of Onam festival bringing together the Kerala Samajam Vasai East community with traditional dances, pookalam competitions, and the grand Onam Sadya feast.'
        },
        'Event2': {
            name: '24th Annual Celebration',
            description: 'Marking 24 years of Kerala Samajam Vasai East, this grand celebration featured cultural performances, community awards, and a memorable gathering of members across generations.'
        }
    },
    '2025-2026': {
        name: 'Ponnonam 2025',
        description: 'The latest Onam celebration showcasing the rich cultural heritage of Kerala with traditional performances, games, and community bonding activities.'
    },
    'Earlier Glimpse': {
        name: 'Earlier Glimpse',
        description: 'A nostalgic collection of memorable moments from past Kerala Samajam Vasai East events, capturing the essence of our community\'s journey and cherished traditions.'
    },
    'Social Work': {
        photos: [
            {
                name: 'IMG-20251222-WA0219.jpg',
                description: 'Kerala Samajam Vasai East community outreach program - Providing essential supplies and support to underprivileged families in the local area.'
            },
            {
                name: 'PHOTO-2025-04-25-12-14-26.jpg',
                description: 'Educational support initiative - Kerala Samajam Vasai East members distributing books and learning materials to children from economically disadvantaged backgrounds.'
            }
        ]
    }
};

// Storage bucket name
const BUCKET_NAME = 'gallery-photos';

async function createBucket() {
    console.log('Checking storage bucket...');

    try {
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();

        if (listError) {
            console.error('Error listing buckets:', listError);
            console.log('\n Please create the bucket manually in Supabase:');
            console.log('   1. Go to Storage in your Supabase dashboard');
            console.log('   2. Create a new bucket named "gallery-photos"');
            console.log('   3. Make it public');
            console.log('   4. Run this script again\n');
            return false;
        }

        const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);

        if (!bucketExists) {
            console.log('\n  Bucket does not exist. Please create it manually:');
            console.log('   1. Go to Storage in your Supabase dashboard');
            console.log('   2. Create a new bucket named "gallery-photos"');
            console.log('   3. Make it public');
            console.log('   4. Run this script again\n');
            return false;
        } else {
            console.log('✓ Bucket exists and is ready!');
        }

        return true;
    } catch (error) {
        console.error('Error checking bucket:', error);
        console.log('\n  Please ensure:');
        console.log('   1. Your Supabase credentials are correct in .env');
        console.log('   2. The bucket "gallery-photos" exists in Supabase Storage');
        console.log('   3. The bucket is set to public\n');
        return false;
    }
}

async function uploadPhoto(filePath, storagePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
            contentType: 'image/jpeg',
            upsert: true
        });

    if (error) {
        console.error(`Error uploading ${fileName}:`, error);
        return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

    return publicUrl;
}

async function insertPhotoMetadata(photoData) {
    const { data, error } = await supabase
        .from('gallery_photos')
        .insert([photoData]);

    if (error) {
        console.error('Error inserting photo metadata:', error);
        return false;
    }

    return true;
}

async function uploadEventPhotos(year, eventFolder, eventInfo) {
    const photosPath = path.join(__dirname, '../../data/photos', year, year, eventFolder);

    if (!fs.existsSync(photosPath)) {
        console.log(`Folder not found: ${photosPath}`);
        return;
    }

    const files = fs.readdirSync(photosPath).filter(file =>
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );

    console.log(`\nUploading ${files.length} photos for ${eventInfo.name}...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(photosPath, file);
        const storagePath = `${year}/${eventInfo.name}/${file}`;

        console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);

        const publicUrl = await uploadPhoto(filePath, storagePath);

        if (publicUrl) {
            await insertPhotoMetadata({
                photo_url: publicUrl,
                year: year,
                event_name: eventInfo.name,
                description: eventInfo.description,
                category: 'event',
                display_order: i
            });
        }
    }

    console.log(`✓ Completed uploading ${eventInfo.name}`);
}

async function uploadYearPhotos(year, description) {
    const photosPath = path.join(__dirname, '../../data/photos', year, year);

    if (!fs.existsSync(photosPath)) {
        console.log(`Folder not found: ${photosPath}`);
        return;
    }

    const files = fs.readdirSync(photosPath).filter(file =>
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );

    console.log(`\nUploading ${files.length} photos for ${year}...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(photosPath, file);
        const storagePath = `${year}/${file}`;

        console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);

        const publicUrl = await uploadPhoto(filePath, storagePath);

        if (publicUrl) {
            await insertPhotoMetadata({
                photo_url: publicUrl,
                year: year,
                event_name: year,
                description: description,
                category: 'event',
                display_order: i
            });
        }
    }

    console.log(`✓ Completed uploading ${year}`);
}

async function uploadEarlierGlimpse() {
    const photosPath = path.join(__dirname, '../../data/photos/Earlier Glimpse/Earlier Glimpse');

    if (!fs.existsSync(photosPath)) {
        console.log(`Folder not found: ${photosPath}`);
        return;
    }

    const files = fs.readdirSync(photosPath).filter(file =>
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );

    console.log(`\nUploading ${files.length} photos for Earlier Glimpse...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(photosPath, file);
        const storagePath = `Earlier-Glimpse/${file}`;

        console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);

        const publicUrl = await uploadPhoto(filePath, storagePath);

        if (publicUrl) {
            await insertPhotoMetadata({
                photo_url: publicUrl,
                year: 'Earlier Glimpse',
                event_name: 'Earlier Glimpse',
                description: eventDescriptions['Earlier Glimpse'].description,
                category: 'earlier_glimpse',
                display_order: i
            });
        }
    }

    console.log(`✓ Completed uploading Earlier Glimpse`);
}

async function uploadSocialWork() {
    const photosPath = path.join(__dirname, '../../data/photos/Social Work/Social Work');

    if (!fs.existsSync(photosPath)) {
        console.log(`Folder not found: ${photosPath}`);
        return;
    }

    const files = fs.readdirSync(photosPath).filter(file =>
        file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
    );

    console.log(`\nUploading ${files.length} photos for Social Work...`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(photosPath, file);
        const storagePath = `Social-Work/${file}`;

        console.log(`[${i + 1}/${files.length}] Uploading ${file}...`);

        const publicUrl = await uploadPhoto(filePath, storagePath);

        if (publicUrl) {
            // Find matching description
            const photoInfo = eventDescriptions['Social Work'].photos.find(p => p.name === file);
            const description = photoInfo ? photoInfo.description : 'Kerala Samajam Vasai East community service initiative making a positive impact in our local community.';

            await insertPhotoMetadata({
                photo_url: publicUrl,
                year: 'Social Work',
                event_name: 'Social Work',
                description: description,
                category: 'social_work',
                display_order: i
            });
        }
    }

    console.log(`✓ Completed uploading Social Work`);
}

async function main() {
    console.log('Starting photo upload process...\n');

    // Create bucket
    const bucketCreated = await createBucket();
    if (!bucketCreated) {
        console.error('Failed to create bucket. Exiting...');
        return;
    }

    // Upload 2024-2025 events
    await uploadEventPhotos('2024-2025', 'Event1', eventDescriptions['2024-2025']['Event1']);
    await uploadEventPhotos('2024-2025', 'Event2', eventDescriptions['2024-2025']['Event2']);

    // Upload 2025-2026 photos
    await uploadYearPhotos('2025-2026', eventDescriptions['2025-2026'].description);

    // Upload Earlier Glimpse
    await uploadEarlierGlimpse();

    // Upload Social Work
    await uploadSocialWork();

    console.log('\n✓ All photos uploaded successfully!');
}

main().catch(console.error);

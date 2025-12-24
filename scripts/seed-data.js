// Seed dummy data for demo
// Run this with: node scripts/seed-data.js

const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dummyItems = [
  {
    type: 'lost',
    status: 'lost',
    title: 'Black Leather Wallet',
    description: 'Lost my black leather wallet near the campus library. Contains ID cards and some cash.',
    category: 'Bags & Wallets',
    location: 'Campus Library, Building A',
    date: '2025-12-20',
    contactInfo: 'demo@lostandfound.com',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    imageLabels: ['wallet', 'leather', 'black', 'accessory', 'personal item'],
    userId: 'demo-user-1',
    userEmail: 'demo@lostandfound.com',
    userName: 'Demo User',
    createdAt: new Date('2025-12-20T10:30:00'),
    updatedAt: new Date('2025-12-20T10:30:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Brown Leather Wallet',
    description: 'Found a brown wallet near the cafeteria. Has some cards inside.',
    category: 'Bags & Wallets',
    location: 'Student Cafeteria',
    date: '2025-12-21',
    contactInfo: 'john.doe@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    imageLabels: ['wallet', 'leather', 'brown', 'accessory', 'personal item'],
    userId: 'demo-user-2',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    createdAt: new Date('2025-12-21T14:15:00'),
    updatedAt: new Date('2025-12-21T14:15:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Silver MacBook Pro',
    description: 'Lost MacBook Pro 14" with stickers on the lid. Last seen in computer lab.',
    category: 'Electronics',
    location: 'Computer Lab, Room 301',
    date: '2025-12-19',
    contactInfo: 'alice@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    imageLabels: ['laptop', 'computer', 'macbook', 'apple', 'electronics', 'silver'],
    userId: 'demo-user-3',
    userEmail: 'alice@example.com',
    userName: 'Alice Johnson',
    createdAt: new Date('2025-12-19T16:45:00'),
    updatedAt: new Date('2025-12-19T16:45:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'iPhone 14 Pro',
    description: 'Found an iPhone with a blue case near the parking lot. Screen locked.',
    category: 'Electronics',
    location: 'Parking Lot B',
    date: '2025-12-22',
    contactInfo: 'bob@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    imageLabels: ['phone', 'iphone', 'mobile', 'smartphone', 'electronics', 'blue'],
    userId: 'demo-user-4',
    userEmail: 'bob@example.com',
    userName: 'Bob Smith',
    createdAt: new Date('2025-12-22T09:20:00'),
    updatedAt: new Date('2025-12-22T09:20:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Set of Car Keys',
    description: 'Toyota car keys with a red keychain. Lost somewhere in the main building.',
    category: 'Keys',
    location: 'Main Building',
    date: '2025-12-23',
    contactInfo: 'sarah@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800',
    imageLabels: ['keys', 'car keys', 'keychain', 'metal', 'red'],
    userId: 'demo-user-5',
    userEmail: 'sarah@example.com',
    userName: 'Sarah Williams',
    createdAt: new Date('2025-12-23T11:00:00'),
    updatedAt: new Date('2025-12-23T11:00:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Blue Backpack',
    description: 'Found a blue JanSport backpack in the gym. Contains some books and a water bottle.',
    category: 'Bags & Wallets',
    location: 'Sports Complex Gym',
    date: '2025-12-21',
    contactInfo: 'mike@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    imageLabels: ['backpack', 'bag', 'blue', 'jansport', 'school bag'],
    userId: 'demo-user-6',
    userEmail: 'mike@example.com',
    userName: 'Mike Brown',
    createdAt: new Date('2025-12-21T17:30:00'),
    updatedAt: new Date('2025-12-21T17:30:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Gold Ring',
    description: 'Lost my gold wedding ring near the swimming pool. Sentimental value.',
    category: 'Jewelry',
    location: 'Swimming Pool Area',
    date: '2025-12-18',
    contactInfo: 'emma@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    imageLabels: ['ring', 'gold', 'jewelry', 'wedding band', 'gold band'],
    userId: 'demo-user-7',
    userEmail: 'emma@example.com',
    userName: 'Emma Davis',
    createdAt: new Date('2025-12-18T13:45:00'),
    updatedAt: new Date('2025-12-18T13:45:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Textbook - Introduction to AI',
    description: 'Found a textbook in the library. Name written inside: "Chris P."',
    category: 'Books',
    location: 'Central Library, Floor 2',
    date: '2025-12-22',
    contactInfo: 'lisa@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    imageLabels: ['book', 'textbook', 'education', 'ai', 'study'],
    userId: 'demo-user-8',
    userEmail: 'lisa@example.com',
    userName: 'Lisa Taylor',
    createdAt: new Date('2025-12-22T15:10:00'),
    updatedAt: new Date('2025-12-22T15:10:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Prescription Glasses',
    description: 'Black frame prescription glasses in a brown case. Lost in lecture hall.',
    category: 'Other',
    location: 'Lecture Hall 5',
    date: '2025-12-23',
    contactInfo: 'david@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
    imageLabels: ['glasses', 'eyeglasses', 'spectacles', 'black frame', 'optical'],
    userId: 'demo-user-9',
    userEmail: 'david@example.com',
    userName: 'David Martinez',
    createdAt: new Date('2025-12-23T08:20:00'),
    updatedAt: new Date('2025-12-23T08:20:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Student ID Card',
    description: 'Found a student ID card near the main entrance. Name: Jennifer Lee',
    category: 'Documents',
    location: 'Main Entrance',
    date: '2025-12-24',
    contactInfo: 'ryan@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1591376397716-774090886b4d?w=800',
    imageLabels: ['id card', 'identification', 'student card', 'document', 'card'],
    userId: 'demo-user-10',
    userEmail: 'ryan@example.com',
    userName: 'Ryan Anderson',
    createdAt: new Date('2025-12-24T07:45:00'),
    updatedAt: new Date('2025-12-24T07:45:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'AirPods Pro',
    description: 'Lost white AirPods Pro in charging case. Name engraved on the case.',
    category: 'Electronics',
    location: 'Study Room 12',
    date: '2025-12-22',
    contactInfo: 'kelly@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
    imageLabels: ['airpods', 'earbuds', 'wireless', 'apple', 'electronics', 'white'],
    userId: 'demo-user-11',
    userEmail: 'kelly@example.com',
    userName: 'Kelly Wilson',
    createdAt: new Date('2025-12-22T12:30:00'),
    updatedAt: new Date('2025-12-22T12:30:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Water Bottle - Hydro Flask',
    description: 'Found a purple Hydro Flask water bottle with stickers on it.',
    category: 'Other',
    location: 'Basketball Court',
    date: '2025-12-23',
    contactInfo: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    imageLabels: ['water bottle', 'hydro flask', 'bottle', 'purple', 'drinkware'],
    userId: 'demo-user-12',
    userEmail: 'tom@example.com',
    userName: 'Tom Garcia',
    createdAt: new Date('2025-12-23T16:00:00'),
    updatedAt: new Date('2025-12-23T16:00:00'),
  },
];

const dummyUsers = [
  {
    name: 'Demo User',
    email: 'demo@lostandfound.com',
    phone: '+1234567890',
    createdAt: new Date('2025-12-01'),
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567891',
    createdAt: new Date('2025-12-02'),
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567892',
    createdAt: new Date('2025-12-03'),
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1234567893',
    createdAt: new Date('2025-12-04'),
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1234567894',
    createdAt: new Date('2025-12-05'),
  },
];

async function seedData() {
  try {
    console.log('🌱 Starting to seed data...\n');

    // Add items
    console.log('📦 Adding items...');
    const itemsRef = db.collection('items');
    for (const item of dummyItems) {
      await itemsRef.add(item);
      console.log(`   ✓ Added ${item.type}: ${item.title}`);
    }

    // Add users
    console.log('\n👥 Adding users...');
    const usersRef = db.collection('users');
    for (const user of dummyUsers) {
      await usersRef.add(user);
      console.log(`   ✓ Added user: ${user.name}`);
    }

    console.log('\n✅ Data seeding completed successfully!');
    console.log(`   📊 Total items: ${dummyItems.length}`);
    console.log(`   👥 Total users: ${dummyUsers.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();

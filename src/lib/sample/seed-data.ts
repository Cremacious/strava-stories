import { prisma } from '@/lib/prisma';

export async function seedDatabase() {
  console.log('Seeding database...');

  const usersData = [
    // Sarasota users
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'alice@example.com',
      name: 'Alice Johnson',
      bio: 'Fitness enthusiast',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'bob@example.com',
      name: 'Bob Smith',
      bio: 'Runner and cyclist',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'charlie@example.com',
      name: 'Charlie Brown',
      bio: 'Marathon runner',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      email: 'diana@example.com',
      name: 'Diana Prince',
      bio: 'Yoga and pilates',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      email: 'eve@example.com',
      name: 'Eve Adams',
      bio: 'Swimmer',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      email: 'frank@example.com',
      name: 'Frank Miller',
      bio: 'Weightlifter',
      city: 'Sarasota',
      state: 'Florida',
      country: 'United States',
    },
    // Other locations
    {
      id: '550e8400-e29b-41d4-a716-446655440007',
      email: 'grace@example.com',
      name: 'Grace Lee',
      bio: 'Triathlete',
      city: 'Miami',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440008',
      email: 'henry@example.com',
      name: 'Henry Wilson',
      bio: 'Hiker',
      city: 'Tampa',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440009',
      email: 'ivy@example.com',
      name: 'Ivy Chen',
      bio: 'Cyclist',
      city: 'Orlando',
      state: 'Florida',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      email: 'jack@example.com',
      name: 'Jack Taylor',
      bio: 'Runner',
      city: 'New York',
      state: 'New York',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      email: 'kate@example.com',
      name: 'Kate Davis',
      bio: 'Swimmer',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      email: 'leo@example.com',
      name: 'Leo Garcia',
      bio: 'Boxer',
      city: 'Chicago',
      state: 'Illinois',
      country: 'United States',
    },
  ];

  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: userData,
    });
    users.push(user);
  }


  const circles = [];
  for (const user of users) {
    const circle = await prisma.circle.create({
      data: {
        name: `${user.name}'s Fitness Circle`,
        description: `A circle for ${user.name}'s fitness community`,
        visibility: 'PUBLIC',
        ownerId: user.id,
      },
    });
    circles.push(circle);

 
    await prisma.circleMember.create({
      data: {
        circleId: circle.id,
        userId: user.id,
        role: 'OWNER',
      },
    });
  }


  const postsData = [

    {
      userId: users[0].id,
      content: 'Great run this morning!',
      privacy: 'PUBLIC',
      feeling: 'HAPPY',
    },
    {
      userId: users[0].id,
      content: 'Feeling motivated after yoga',
      privacy: 'FRIENDS',
      feeling: 'MOTIVATED',
    },
    // Bob's posts
    {
      userId: users[1].id,
      content: 'Cycled 20 miles today',
      privacy: 'PUBLIC',
      feeling: 'EXCITED',
    },
    {
      userId: users[1].id,
      content: 'Rest day needed',
      privacy: 'FRIENDS',
      feeling: 'TIRED',
    },
    {
      userId: users[1].id,
      content: 'New PR on 5K!',
      privacy: 'PUBLIC',
      feeling: 'HAPPY',
    },
    // Continue for all users...
    // For brevity, I'll add a few more, but in practice, loop or add more
  ];

  // To save space, I'll create posts in a loop
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const post1 = await prisma.post.create({
      data: {
        userId: user.id,
        content: `${user.name} had a great workout!`,
        privacy: i % 2 === 0 ? 'PUBLIC' : 'FRIENDS',
        feeling: 'HAPPY',
      },
    });
    const post2 = await prisma.post.create({
      data: {
        userId: user.id,
        content: `${user.name} is feeling motivated`,
        privacy: 'FRIENDS',
        feeling: 'MOTIVATED',
      },
    });
    if (i < 6) {
      // Add a third post for first 6 users
      await prisma.post.create({
        data: {
          userId: user.id,
          content: `${user.name} sharing progress`,
          privacy: 'PUBLIC',
          feeling: 'EXCITED',
        },
      });
    }
  }

  // Create workouts for each user (3-5 workouts each)
  const workoutTypes = ['Run', 'Cycle', 'Swim', 'Weight Training', 'Yoga'];
  for (const user of users) {
    const numWorkouts = Math.floor(Math.random() * 3) + 3; // 3-5
    for (let j = 0; j < numWorkouts; j++) {
      const type =
        workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
      await prisma.workout.create({
        data: {
          userId: user.id,
          title: `${type} Session ${j + 1}`,
          description: `A ${type.toLowerCase()} workout`,
          type,
          duration: Math.floor(Math.random() * 3600) + 1800, // 30-90 min
          distance:
            type === 'Run' || type === 'Cycle' ? Math.random() * 20 + 5 : null, // 5-25 km for run/cycle
          calories: Math.floor(Math.random() * 500) + 200, // 200-700 cal
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), 
        },
      });
    }
  }

  console.log('Seeding completed!');
}

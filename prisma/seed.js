const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  await createScreenings(screens, movies);
  await createSeats(screens);
  await createTickets();

  process.exit(0);
}

async function createCustomer() {
  const customer = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: {
          email: "alice@boolean.co.uk",
          phone: "1234567890",
        },
      },
    },
    include: {
      contact: true,
    },
  });

  console.log("Customer created", customer);

  return customer;
}

async function createMovies() {
  const rawMovies = [
    { title: "The Matrix", runtimeMins: 120 },
    { title: "Dodgeball", runtimeMins: 154 },
  ];

  const movies = [];

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie });
    movies.push(movie);
  }

  console.log("Movies created", movies);

  return movies;
}

async function createScreens() {
  const rawScreens = [{ number: 1 }, { number: 2 }];

  const screens = [];

  for (const rawScreen of rawScreens) {
    const screen = await prisma.screen.create({
      data: rawScreen,
    });

    console.log("Screen created", screen);

    screens.push(screen);
  }

  return screens;
}

async function createScreenings(screens, movies) {
  const screeningDate = new Date();

  for (const screen of screens) {
    for (let i = 0; i < movies.length; i++) {
      screeningDate.setDate(screeningDate.getDate() + i);

      const screening = await prisma.screening.create({
        data: {
          startsAt: screeningDate,
          movie: {
            connect: {
              id: movies[i].id,
            },
          },
          screen: {
            connect: {
              id: screen.id,
            },
          },
        },
      });

      console.log("Screening created", screening);
    }
  }
}

async function createSeats(screens) {
  const rawSeats = [];

  for (const screen of screens) {
    for (let i = 1; i <= 6; i++) {
      rawSeats.push({ number: i, screen: { connect: { id: screen.id } } });
    }
  }

  for (const rawSeat of rawSeats) {
    const seat = await prisma.seat.create({
      data: rawSeat,
    });
  }
}

async function createTickets() {
  const ticket = await prisma.ticket.create({
    data: {
      screeningId: 1,
      customerId: 1,
      seats: { connect: [{ id: 1 }, { id: 2 }] },
    },
  });
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));

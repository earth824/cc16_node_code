const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const run = async () => {
  try {
    // const result = await prisma.user.create({
    //   data: {
    //     username: 'john',
    //     password: '123456'
    //   }
    // });
    // const result = await prisma.user.createMany({
    //   data: [
    //     { username: 'jack', password: '543210' },
    //     { username: 'jack', password: '098765' }
    //   ],
    //   skipDuplicates: true
    // });
    // const result = await prisma.user.create({
    //   data: {
    //     username: 'benny',
    //     password: '123456',
    //     userInfo: {
    //       create: {
    //         gender: 'LGBT',
    //         wallet: 20000
    //       }
    //     }
    //   },
    //   include: {
    //     userInfo: true,
    //     posts: true
    //   }
    // });
    // const result = await prisma.post.create({
    //   data: {
    //     title: 'Lunch',
    //     user: {
    //       connect: {
    //         username: 'jack'
    //       }
    //     }
    //   },
    //   select: {
    //     id: true,
    //     title: true,
    //     user: {
    //       select: {
    //         id: true,
    //         username: true,
    //         userInfo: {
    //           select: {
    //             wallet: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
    // const result = await prisma.user.update({
    //   data: {
    //     password: '222222'
    //   },
    //   where: {
    //     username: 'benny'
    //   },
    //   include: {
    //     userInfo: true,
    //     posts: true
    //   }
    // });
    // const result = await prisma.user.updateMany({
    //   data: {
    //     password: '190890'
    //   },
    //   where: {
    //     username: {
    //       startsWith: 'j'
    //     }
    //   }
    // });
    // const result = await prisma.user.delete({
    //   where: {
    //     id: 3
    //   }
    // });

    const result = await prisma.user.upsert({
      create: {
        username: 'paul',
        password: '123456'
      },
      update: {
        password: '555555'
      },
      where: {
        id: 10
      }
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

run();

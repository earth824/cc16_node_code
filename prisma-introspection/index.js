const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const run = async () => {
  try {
    // const result = await prisma.user.findUnique({
    //   where: {
    //     id: 1000
    //   }
    // });

    // const result = await prisma.user.findUniqueOrThrow({
    //   where: {
    //     username: 'job'
    //   }
    // });

    // const result = await prisma.brand.findFirst({
    //   where: {
    //     name: {
    //       startsWith: 'asi'
    //     }
    //   }
    // });

    // const result = await prisma.brand.findFirstOrThrow({
    //   where: {
    //     name: {
    //       startsWith: 'asi'
    //     }
    //   }
    // });

    // const result = await prisma.brand.findMany({
    //   where: {
    //     id: 1000
    //   }
    // });

    // const result = await prisma.order.findMany({
    //   where: {
    //     id: 1
    //   },
    //   include: {
    //     user: true,
    //     orderitem: {
    //       include: {
    //         product: true
    //       }
    //     }
    //   }
    // });

    // const result = await prisma.product.findMany({
    //   where: {
    //     brandId: 1,
    //     price: {
    //       lt: 53000
    //     }
    //   }
    //   // where: {
    //   //   AND: [
    //   //     { brandId: 1 },
    //   //     {
    //   //       price: {
    //   //         lt: 53000
    //   //       }
    //   //     }
    //   //   ]
    //   // }
    // });

    // const result = await prisma.product.findMany({
    //   where: {
    //     OR: [{ brandId: 1 }, { brandId: 7 }]
    //   }
    // });

    // const result = await prisma.product.findMany({
    //   where: {
    //     brand: {
    //       name: 'OPPo'
    //     }
    //   }
    // });

    // const result = await prisma.user.findMany({
    //   orderBy: {
    //     username: 'desc'
    //   }
    // });

    // const result = await prisma.product.findMany({
    //   where: { price: { lt: 45000 } },
    //   orderBy: [{ brand: { name: 'asc' } }, { price: 'asc' }]
    // });

    // const result = await prisma.product.findMany({
    //   orderBy: {
    //     price: 'desc'
    //   },
    //   take: 2,
    //   skip: 2
    // });

    // const result = await prisma.product.aggregate({
    //   _max: {
    //     price: true
    //   }
    // });

    // const result = await prisma.product.groupBy({
    //   by: ['brandId'],
    //   _avg: {
    //     price: true
    //   },
    //   having: {
    //     price: {
    //       _avg: {
    //         gt: 30000
    //       }
    //     }
    //   }
    // });

    const result =
      await prisma.$queryRaw`SELECT b.id AS brandId,b.name AS brandName, AVG(p.price) AS avg FROM product p LEFT JOIN brand b ON p.brandId = b.id GROUP BY b.id`;

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(err);
  }
};

run();

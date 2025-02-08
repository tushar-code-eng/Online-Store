import { PrismaClient, ProductStatus, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");

  await prisma.order.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding database...");

  // Seed Products
  
  const products = [
    {
      name: "ULTRABOOST 1.0 ATR",
      description: "An everyday sneaker with high-quality performance features. This Ultraboost shoe comes with metal buckles instead of laces, perfectly complementing its sleek, modern design. The adidas PRIMEKNIT upper wraps your foot snugly, and the energy-returning BOOST cushioning provides a comfortable feel and optimal support.",
      status: ProductStatus.published,
      price: 240,
      images: ["/shoes/ultraboostatr/pic-1.avif","/shoes/ultraboostatr/pic-2.avif","/shoes/ultraboostatr/pic-3.avif","/shoes/ultraboostatr/pic-4.avif","/shoes/ultraboostatr/pic-5.avif"],
      category: Category.men,
      isFeatured: true,
    },
    {
      name: "VaporMax 2023 Flyknit",
      description: "Have you ever walked on air? Check out the Air VaporMax 2023 to see how it feels. The perforated insole reveals the innovative technology (remove it to see more). The stretchy Flyknit upper is made from at least 20% recycled material by weight.",
      status: ProductStatus.published,
      price: 220,
      images: ["/shoes/vapor/pic-1.jpeg","/shoes/vapor/pic-2.png","/shoes/vapor/pic-3.jpeg","/shoes/vapor/pic-4.png","/shoes/vapor/pic-5.png"],
      category: Category.men,
      isFeatured: true,
    },
    {
      name: "Nike Air Max Plus",
      description: "This tuned Nike Air design stands out with top-notch stability, unparalleled cushioning, and adds that special something to your style. Featuring classic '90s style, breathable mesh, and nature-inspired design lines, you can celebrate your bold style with great comfort.",
      status: ProductStatus.published,
      price: 210,
      images: ["/shoes/airmax-plus/pic-1.png","/shoes/airmax-plus/pic-2.png","/shoes/airmax-plus/pic-3.png","/shoes/airmax-plus/pic-4.png","/shoes/airmax-plus/pic-5.png"],
      category: Category.women,
      isFeatured: true,
    },
    {
      name: "ULTRABOOST DNA 5.0",
      description: "So much more than just a running shoe – with this adidas Ultraboost, you are perfectly equipped for everyday life. This version for kids and teens comes with all the functional features that runners swear by. Additionally, it provides pure comfort. You can thank the soft adidas PRIMEKNIT upper and the energy-returning BOOST midsole for that.",
      status: ProductStatus.published,
      price: 180,
      images: ["/shoes/ultra-kids/pic-1.avif","/shoes/ultra-kids/pic-2.avif","/shoes/ultra-kids/pic-3.avif","/shoes/ultra-kids/pic-4.avif","/shoes/ultra-kids/pic-5.avif"],
      category: Category.kids,
      isFeatured: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { faker } from '@faker-js/faker';

export class Utils {
  static generateData() {
    const data = [];
    const types = ['PC', 'PP', 'PX'];
    const categories = faker.helpers.uniqueArray(
      faker.commerce.productName,
      10,
    );
    const subcategories = faker.helpers.uniqueArray(
      faker.commerce.productName,
      50,
    );

    for (let i = 0; i < 10000; i++) {
      const category = faker.helpers.arrayElement(categories);
      const categoryId = categories.indexOf(category) + 1;
      const subcategory = faker.helpers.arrayElement(subcategories);
      const subcategoryId = subcategories.indexOf(subcategory) + 1;
      const item = {
        month: faker.date.month({ abbreviated: true }),
        amount: faker.number.int({ min: 1000, max: 1000000 }),
        state: faker.location.state(),
        contractorName: faker.company.name(),
        category,
        categoryId,
        subcategory,
        subcategoryId,
        amountBudget: faker.number.int({ min: 1000, max: 1000000 }),
        amountProjected: faker.number.int({ min: 1000, max: 1000000 }),
        type: faker.helpers.arrayElement(types),
        origDate: faker.date.anytime(),
      };
      data.push(item);
    }

    return data;
  }
}

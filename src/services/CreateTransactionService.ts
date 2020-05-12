import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    if (type.toLowerCase() !== 'income' && type.toLowerCase() !== 'outcome')
      throw new AppError('Transaction type is invalid');

    let categoryNew = await categoriesRepository.findByTitle(category);

    if (!categoryNew) {
      categoryNew = categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(categoryNew);
    }
    const categoryId: string = categoryNew.id;

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: categoryId,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

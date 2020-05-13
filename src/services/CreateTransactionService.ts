import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionRepository from '../repositories/TransactionsRepository';

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
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    if (type.toLowerCase() !== 'income' && type.toLowerCase() !== 'outcome')
      throw new AppError('Transaction type is invalid');

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance();
      if (total < value) {
        throw new AppError('The value is less than total income');
      }
    }

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

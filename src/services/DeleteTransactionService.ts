import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!isUuid(id)) throw new AppError('ID is invalid');

    const exsitTransaction = await transactionsRepository.findOne({
      where: { id },
    });

    if (!exsitTransaction) throw new AppError('This transacition not exists');

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;

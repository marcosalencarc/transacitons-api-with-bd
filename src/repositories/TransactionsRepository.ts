import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GetTransacitionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomeList = await this.find({ where: { type: 'income' } });

    const incomeValue = incomeList.reduce((accumulator, trasaction) => {
      return accumulator + trasaction.value;
    }, 0);

    const outcomeList = await this.find({ where: { type: 'income' } });

    const outcomeValue = outcomeList.reduce((accumulator, trasaction) => {
      return accumulator + trasaction.value;
    }, 0);

    const balance: Balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public async get(): Promise<GetTransacitionsDTO> {
    console.log(await this.find({ relations: ['category'] }));
    const response: GetTransacitionsDTO = {
      transactions: await this.find({ relations: ['category'] }),
      balance: await this.getBalance(),
    };
    return response;
  }
}

export default TransactionsRepository;

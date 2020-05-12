import { Router, Request, Response } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request: Request, response: Response) => {
  // TODO
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  // TODO
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.body;

    return response.send('ok');
    // TODO
  },
);

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;

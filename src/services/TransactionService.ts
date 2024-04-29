import axios from 'axios';
import { sepolia } from '../models/Chain';



export class TransactionService {

  static API_URL =  'https://deep-index.moralis.io/api/v2.2';
  static API_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjYzNjQ3MjI5LTQ4MzQtNDJmOC04MWVmLWRkNDI2YjlkYjk3ZSIsIm9yZ0lkIjoiMzkwMDk0IiwidXNlcklkIjoiNDAwODQ0IiwidHlwZUlkIjoiZThkZDU0NTgtNjAzZi00NTE2LWEzYzMtZDhiYWMyNjFlOWQzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTQzNzYyMzYsImV4cCI6NDg3MDEzNjIzNn0.8LrT_jc8eyJTeKCEcUusslFmGOG-PVA8OtbpPeaGTsE';

  static async getTransactions(address: string) {
    const options = {
        method: 'GET',
        url: `${TransactionService.API_URL}/${address}`,
        params: {chain: sepolia.name.toLowerCase()},
        headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY}
      };

    const response = await axios.request(options);
    return response;
  }

}
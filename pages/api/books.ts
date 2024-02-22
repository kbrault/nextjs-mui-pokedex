import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface Book {
  id: number;
  name: string;
}

interface ErrorResponse {
  error: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Book[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data.json');
      const booksData = fs.readFileSync(filePath, 'utf8');
      const books: Book[] = JSON.parse(booksData);

      const { search, page } = req.query;
      let filteredBooks = books;
      if (search) {
        const searchTerm = (search as string);
        filteredBooks = filteredBooks.filter(book =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const pageSize = 20; 
      const currentPage = page ? parseInt(page as string, 10) : 1;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);


      res.status(200).json(paginatedBooks);
    } catch (error) {
      console.error('Error reading books data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

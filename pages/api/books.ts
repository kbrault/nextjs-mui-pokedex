// pages/api/books.ts

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

interface ErrorResponse {
  error: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Book[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try {
      // Get the path to the books.json file
      const filePath = path.join(process.cwd(), 'data.json');
      // Read the content of the file
      const booksData = fs.readFileSync(filePath, 'utf8');
      // Parse the JSON data
      const books: Book[] = JSON.parse(booksData);

      // Apply search filter if query param 'search' is provided
      const { search, page } = req.query;
      let filteredBooks = books;
      if (search) {
        const searchTerm = (search as string);
        filteredBooks = filteredBooks.filter(book =>
          book.title.includes(searchTerm) ||
          book.author.includes(searchTerm)
        );
      }

      // Apply pagination if query param 'page' is provided
      const pageSize = 21; // Number of books per page
      const currentPage = page ? parseInt(page as string, 10) : 1;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

      // Send the paginated books data as the response
      res.status(200).json(paginatedBooks);
    } catch (error) {
      console.error('Error reading books data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

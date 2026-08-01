import cron from 'node-cron';
import axios from 'axios';
import Article from '../models/Article';
import { newsQueue } from './newsQueue';

export const startNewsIngestion = () => {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('Running scheduled news ingestion...');
    try {
      // Mock API URL - replace with actual NewsAPI or similar
      const API_URL = process.env.NEWS_API_URL || 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY;
      
      const response = await axios.get(API_URL);
      const articles = response.data.articles;

      if (!articles || articles.length === 0) return;

      for (const item of articles) {
        if (!item.title || !item.content) continue;

        // Check if article already exists
        const exists = await Article.findOne({ url: item.url });
        if (!exists) {
          // Save to MongoDB
          const newArticle = await Article.create({
            title: item.title,
            content: item.content || item.description,
            source: item.source?.name,
            url: item.url,
            imageUrl: item.urlToImage,
          });

          console.log(`Saved new article to DB: ${newArticle.title}`);

          // Add to background queue for AI Analysis
          await newsQueue.add('analyze-article', {
            articleId: newArticle._id,
            title: newArticle.title,
            content: newArticle.content,
          });
        }
      }
    } catch (error) {
      console.error('Error in news ingestion cron job:', error);
    }
  });
  console.log('News Ingestion Cron Job started (runs every 15m).');
};

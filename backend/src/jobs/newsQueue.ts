import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { analyzeArticle } from '../services/ai.service';
import Article from '../models/Article';

// Configure Redis connection
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

// Create Queue
export const newsQueue = new Queue('news-analysis', { connection });

// Define Worker to process jobs
export const newsWorker = new Worker(
  'news-analysis',
  async (job: Job) => {
    const { articleId, title, content } = job.data;
    console.log(`Processing article: ${articleId}`);

    try {
      // Analyze with Gemini
      const aiResult = await analyzeArticle(title, content);

      // Update Article in MongoDB
      await Article.findByIdAndUpdate(articleId, {
        aiAnalysis: {
          analyzed: true,
          ...aiResult,
          analyzedAt: new Date(),
          model: 'Gemini',
        },
      });

      console.log(`Successfully analyzed and updated article: ${articleId}`);
    } catch (error) {
      console.error(`Failed to analyze article ${articleId}:`, error);
      throw error;
    }
  },
  { connection }
);

newsWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

newsWorker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

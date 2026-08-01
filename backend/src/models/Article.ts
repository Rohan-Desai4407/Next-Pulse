import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    category: {
      type: String,
    },
    url: {
      type: String,
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    aiAnalysis: {
      analyzed: { type: Boolean, default: false },
      summary: String,
      trustScore: Number,
      explanation: String,
      keyTakeaways: [String],
      affectedAudience: String,
      suggestedAction: String,
      analyzedAt: Date,
      model: String,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;

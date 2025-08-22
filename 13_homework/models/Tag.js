import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], // массив ссылок
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;

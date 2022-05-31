import mongoose from 'mongoose';

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const bookSchema = mongoose.Schema({
  title: { type: String, required: true }, 
  date : {  type: Number },
  pageCount : { type: Number },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authors',
      sparse: true,
    },
  ],
},
schemaOptions);

const bookModel = mongoose.model('Books', bookSchema);

export default bookModel;
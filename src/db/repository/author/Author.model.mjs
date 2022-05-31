import mongoose from 'mongoose';

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String },
    birthdate: { type: String },
    birthplace: { type: String },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        sparse: true,
      },
    ],
  },
  schemaOptions
);

const authorModel = mongoose.model('Authors', authorSchema);

export default authorModel;

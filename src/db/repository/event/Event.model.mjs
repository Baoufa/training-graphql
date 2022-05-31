import mongoose from 'mongoose';

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    eventType: { type: String, required: true },
    organizer: { type: String },
    location: {
      geoLocation: {
        lat: { type: Number },
        lng: { type: Number },
      },
      address: { type: String },
      postalCode: { type: String },
    },
    description: { type: String },
    website: { type: String },
    date: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    place: {
      totalPlace: { type: Number },
      bookedPlace: { type: Number },
    }
  },
  schemaOptions
);

const EventModel = mongoose.model('Events', EventSchema);

export default EventModel;

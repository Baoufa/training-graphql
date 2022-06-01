import EventRepository from '../../db/repository/event/Event.repository.mjs';
import { getFields } from '../libs/utilities.mjs';

const eventResolver = {
  Query: {
    events: async (parent, args, context, info) => {
      const fields = getFields(info);
      return await new EventRepository().getAll(fields);
    },
    event: async (parent, args, context, info) => {
      const fields = getFields(info);
      return await new EventRepository().getById(args.id, fields);
    }
  },

  Mutation: { 
    createEvent: async (parent, args, context, info) => {
      return await new EventRepository().create(args.input);
    },
    updateEvent: async (parent, args, context, info) => {
      return await new EventRepository().update(args.id, args.input);
    },  
    deleteEvent: async (parent, args, context, info) => {
      return await new EventRepository().delete(args.id);
    }
  }
};

export default eventResolver;
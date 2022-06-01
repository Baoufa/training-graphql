import eventModel from './Event.model.mjs';

class EventRepository {
  constructor() {
    this.model = eventModel;
  }

  async getAll(fields) {
    return await this.model
      .find()
      .select(fields[0])
  }

  async getById(id, fields) {
    return await this.model
      .findById(id)
      .select(fields[0])
  }

  async getByFilter(filter) {
    return await this.model.find(filter);
  }

  async create(event) {
    console.log('here');
    return await this.model.create(event);
  }

  async update(id, eventInput) {
    return await this.model.findByIdAndUpdate(id, eventInput, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndRemove(id);
  }
}

export default EventRepository;

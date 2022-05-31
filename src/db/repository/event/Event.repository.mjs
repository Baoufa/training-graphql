import eventModel from './Event.model.mjs';

class EventRepository {
  constructor() {
    this.model = eventModel;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
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
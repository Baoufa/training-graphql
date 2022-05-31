const events = [
  {
    title: 'Le circus pinder',
    organizer: 'Johny la Taupe',
  },
  {
    title: 'la magie des chats',
    organizer: 'Boby party',
  },
];


const eventResolver = {
  Query: {
    events: () => events,
  },
};

export default eventResolver;
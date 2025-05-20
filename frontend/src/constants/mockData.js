export const mockUsers = [
  {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }
];

export const mockGroups = [
  {
    id: '1',
    name: 'College Friends',
    description: 'Keeping up with college buddies',
    avatar: 'https://picsum.photos/200/200',
    memberCount: 15
  },
  {
    id: '2',
    name: 'Family',
    description: 'Family updates and news',
    avatar: 'https://picsum.photos/200/201',
    memberCount: 8
  },
  {
    id: '3',
    name: 'Work Team',
    description: 'Office news and updates',
    avatar: 'https://picsum.photos/200/202',
    memberCount: 12
  }
];

export const mockPosts = [
  {
    id: '1',
    authorId: '1',
    groupId: '1',
    headline: 'Local Developer Finds Bug in Production, Chaos Ensues!',
    subheadline: 'Coffee consumption reaches record levels as team scrambles to fix issue',
    content: 'In a shocking turn of events, a developer discovered a critical bug...',
    media: {
      type: 'image',
      url: 'https://picsum.photos/800/400',
      thumbnail: 'https://picsum.photos/400/200'
    },
    createdAt: new Date().toISOString(),
    isBreakingNews: true
  },
  {
    id: '2',
    authorId: '2',
    groupId: '2',
    headline: 'Family Vacation Plans Revealed: Destination Still Unknown!',
    subheadline: 'Mom keeps everyone in suspense about summer trip details',
    content: 'In an unprecedented move, the family matriarch has announced...',
    media: {
      type: 'image',
      url: 'https://picsum.photos/800/401',
      thumbnail: 'https://picsum.photos/400/201'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isBreakingNews: false
  }
];

export const mockBreakingNews = [
  'BREAKING: Dad Finally Learns How to Use the TV Remote!',
  'URGENT: Pizza Night Declared Mandatory by House Committee',
  'LIVE: Cat Claims Entire Couch, Humans Negotiate Terms',
  'BREAKING: Weekend Plans Announced, Everyone Actually Agrees!'
]; 
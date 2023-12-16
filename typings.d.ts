interface Message {
  text: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: admin.firestore.Timestamp;
}

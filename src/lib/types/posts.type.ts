export interface Post {
  id: string;
  userName: string;
  avatar: string;
  time: string;
  content?: string;
  image?: string;
  tags: { friends: string[]; cities: string[] };
  feeling?: string; 
}
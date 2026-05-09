export interface UserDocument {
    _id?: string;
  
    name: string;
  
    email: string;
  
    password: string;
  
    role: "user" | "developer" | "admin";
  
    createdAt: Date;
  }
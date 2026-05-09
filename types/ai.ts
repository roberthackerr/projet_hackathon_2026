// types/ai.ts

export interface AI {
    _id?: string;
  
    name: string;
  
    description: string;
  
    domain: string;
  
    type: string;
  
    users: string;
  
    rating: number;
  
    gradient: string;
  
    image?: string;
  
    createdBy?: string;
  
    createdAt?: Date;
  
    updatedAt?: Date;
  }
export interface BasicUser {
    username: string;
    name: string;
}

export interface BasicLink {
    fromLink: string;
    toLink: string;
}

export interface Link extends BasicLink {
    user: BasicUser
    numReached: number;
    id: string;
}
export type UpdateLink = Partial<Link>;
export interface NewUser extends BasicUser {
    password: string;    
}
export interface User extends BasicUser {
    links: BasicLink[];
    password: string;
    id: string;
}
//export type Token = Omit<BasicUser, 'link' | 'password'>

export interface Token extends BasicUser {
    token: string;
    id: string;
}

export type Credentials = Omit<NewUser, 'name'>;

export type LinkAction =
  | {
      type: "SET_LINKS_LIST";
      data: Link[];
    }
  | {
      type: "ADD_LINK";
      data: Link;
    }
  | {
      type: "UPDATE_LINK";
      data: Link;
  };
import { createContext } from 'react';

interface UserContextInterface {
    user: string | null;
    setUser: (value: string | null) => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;


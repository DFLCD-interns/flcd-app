// import { writable } from "svelte/store";

// const usersStore = writable();
// const sessionStore = writable();

// export function validateEmail(email) {
//     const emailRegex = /[-A-Za-z0-9_.%]+@[-A-Za-z0-9_.%]+\.[A-Za-z]+/gm;

//     const emailRegexExec = emailRegex.exec(email);

//     if (emailRegexExec && emailRegexExec[0] === email) {
//         return {
//             success: true,
//         };
//     }

//     return {
//         error: true,
//         message: "Email is invalid",
//     };
// }

// export function validatePassword(password) {
//     const requiredLength = password.length > 7;
  
//     if (!requiredLength) {
//       return {
//         error: true,
//         message: "Password must be at least 8 characters in length",
//       };
//     }
  
//     return { success: true };
//   }

//   export function createUser(email: string, password: string) {
//     const emailValidationResult = validateEmail(email);
  
//     if (emailValidationResult.error) {
//       throw new Error(emailValidationResult.message);
//     }
  
//     const passwordValidationResult = validatePassword(password);
  
//     if (passwordValidationResult.error) {
//       throw new Error(passwordValidationResult.message);
//     }
  
//     const currentUsers = get(usersStore);
  
//     const newUser: User = {
//       email,
//       password,
//       id: uuid(),
//     };
  
//     const duplicateEmail = currentUsers.find((user) => {
//       return user.email === newUser.email;
//     });
  
//     if (duplicateEmail) {
//       throw new Error("User already exists");
//     }
  
//     usersStore.update((previousUsers) => {
//       return [...previousUsers, newUser];
//     });
  
//     return createSessionById(newUser.id);
//   }
  
//   function createSessionById(userId: string) {
//     const users = get(usersStore);
  
//     const user = users.find((user) => user.id === userId);
  
//     if (!user) {
//       throw new Error("User not found");
//     }
  
//     const newSession: Session = {
//       id: uuid(),
//       userId,
//     };
  
//     sessionsStore.update((previousSessions) => {
//       const filteredSessions = previousSessions.filter(
//         (session) => session.userId !== userId
//       );
  
//       return [...filteredSessions, newSession];
//     });
  
//     return newSession;
//   }
  
//   // Step 2
//   export function createSessionByEmail(email: string, password: string) {
//     const emailValidationResult = validateEmail(email);
  
//     if (emailValidationResult.error) {
//       throw new Error(emailValidationResult.message);
//     }
  
//     const passwordValidationResult = validatePassword(password);
  
//     if (passwordValidationResult.error) {
//       throw new Error(passwordValidationResult.message);
//     }
  
//     const currentUsers = get(usersStore);
  
//     const userFound = currentUsers.find((user) => {
//       return user.email === email && user.password === password;
//     });
  
//     if (!userFound) {
//       const userWithSameEmail = currentUsers.find((user) => user.email === email);
  
//       if (userWithSameEmail) {
//         throw new Error("Password is invalid");
//       }
  
//       throw new Error("User not found");
//     }
  
//     return createSessionById(userFound.id);
//   }
  
//   // Step 3
//   export function validateSession(id: string) {
//     const sessions = get(sessionsStore);
  
//     const sessionResult = sessions.find((session) => session.id === id);
  
//     if (!sessionResult) {
//       throw new Error("Session does not exist");
//     }
  
//     const users = get(usersStore);
  
//     const userResult = users.find((user) => user.id === sessionResult.userId);
  
//     if (!userResult) {
//       throw new Error("User does not exist");
//     }
  
//     return {
//       sessionResult,
//       userResult,
//     };
//   }
  
//   export function signOut(id: string) {
//     const sessions = get(sessionsStore);
  
//     const sessionFound = sessions.find((session) => session.id === id);
  
//     if (!sessionFound) {
//       throw new Error("Session not found");
//     }
  
//     sessionsStore.update((previousSessions) => {
//       return previousSessions.filter((session) => session != sessionFound);
//     });
//   }

//THINGS IN THIS FILE IS RUN ON THE SERVER

import { writable, get } from "svelte/store";
import { v4 as uuid } from "uuid";
import { SESSION_COOKIE_NAME } from "$lib/server/constants.js";
import { getUsersDB , authUserDB, createSessionDB, getUserByIDDB } from "$lib/server/db.js";

//these seem to be treated as a temp database replacement
const usersStore = writable([]); 
const sessionsStore = writable([]);

export function validateEmail(email) { // checking of inputs is done here
    const emailRegex = /[-A-Za-z0-9_.%]+@[-A-Za-z0-9_.%]+\.[A-Za-z]+/gm;

    const emailRegexExec = emailRegex.exec(email);

    if (emailRegexExec && emailRegexExec[0] === email) {
        return {
            success: true,
        };
    }

    return {
        error: true,
        message: "Email is invalid",
    };
}

export function validatePassword(password) {
    const requiredLength = password.length > 7;

    if (!requiredLength) {
        return {
            error: true,
            message: "Password must be at least 8 characters in length",
        };
    }

    return { success: true };
}

export function createUser(email, password) {
    const emailValidationResult = validateEmail(email);

    if (emailValidationResult.error) {
        throw new Error(emailValidationResult.message);
    }

    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult.error) {
        throw new Error(passwordValidationResult.message);
    }

    const currentUsers = get(usersStore);

    const newUser = {
        email,
        password,
        id: uuid(),
    };

    const duplicateEmail = currentUsers.find((user) => {
        return user.email === newUser.email;
    });

    if (duplicateEmail) {
        throw new Error("User already exists");
    }

    usersStore.update((previousUsers) => {
        return [...previousUsers, newUser];
    });

    return createSessionById(newUser.id);
}

async function createSessionById(userId) {
    // const users = get(usersStore);

    // const user = users.find((user) => user.id === userId);
    console.log(`auth.js - createSessionById`);

    const user = await getUserByIDDB(userId);
    console.log(`auth.js - createSessionById - ${user}`);
    if (!user) {
        throw new Error("User not found");
    }

    const newSession = {
        id: uuid(),
        userId,
    };

    // sessionsStore.update((previousSessions) => {
    //     const filteredSessions = previousSessions.filter(
    //         (session) => session.userId !== userId
    //     );

    //     return [...filteredSessions, newSession];
    // });

    const result = await createSessionDB(newSession.id, newSession.userId);

    return newSession;
}

// Step 2
export async function createSessionByEmail(email, password) {
    const emailValidationResult = validateEmail(email);

    if (emailValidationResult.error) {
        throw new Error(emailValidationResult.message);
    }

    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult.error) {
        throw new Error(passwordValidationResult.message);
    }

    const currentUsers = get(usersStore);

    // password matching happens here
    // const userFound = currentUsers.find((user) => {
    //     return user.email === email && user.password === password;
    // });
    console.log("before userFound");
    const authResult = await authUserDB(email, password);
    console.log(authResult);
    console.log("after userFound");

    // if (!userFound) {
    //     const userWithSameEmail = currentUsers.find((user) => user.email === email);

    //     if (userWithSameEmail) {
    //         throw new Error("Password is invalid");
    //     }

    //     throw new Error("User not found");
    // }
    let userId;

    if (authResult.success) {
        userId = authResult.user.id;
    } else {
        userId = 0;
        throw new Error(authResult.message);
    }
    
    console.log(authResult.message)

    const SessionCreateResult = await createSessionById(userId);
    console.log("authjs after await createsession");
    console.log(SessionCreateResult);

    return SessionCreateResult;
}

// Step 3
export function validateSession(id) {
    const sessions = get(sessionsStore);

    const sessionResult = sessions.find((session) => session.id === id);

    if (!sessionResult) {
        throw new Error("Session does not exist");
    }

    const users = get(usersStore);

    const userResult = users.find((user) => user.id === sessionResult.userId);

    if (!userResult) {
        throw new Error("User does not exist");
    }

    return {
        sessionResult,
        userResult,
    };
}

export function signOut(id) {
    const sessions = get(sessionsStore);

    const sessionFound = sessions.find((session) => session.id === id);

    if (!sessionFound) {
        throw new Error("Session not found");
    }

    sessionsStore.update((previousSessions) => {
        return previousSessions.filter((session) => session !== sessionFound);
    });
}

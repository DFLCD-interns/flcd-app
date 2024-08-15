//THINGS IN THIS FILE IS RUN ON THE SERVER

import { writable, get } from "svelte/store";
import { v4 as uuid } from "uuid";
import { PEPPA_PIG, SESSION_COOKIE_NAME } from "$lib/server/constants.js";
import { getUserFromSessionDB, createSessionDB, getUserByIDDB, getSessionByIDDB, createUserDB, authUserDB } from "$lib/server/db.js";
import { json } from "@sveltejs/kit";
import { scryptSync, randomBytes} from "crypto"; 
import { getUserWithMatchingEmail, getUserWithMatchingSN } from "./db";

// these seem to be treated as a temp database replacement
// const usersStore = writable([]); 
// const sessionsStore = writable([]);

export async function authenticateUser(event) {
	// get the cookies from the request
	const { cookies } = event;

	// get the user token from the cookie
	const userSession = cookies.get(SESSION_COOKIE_NAME);

    const user = await getUserFromSessionDB(userSession);
    // console.log("auth.js - authenticate user: ", user);
    if (user) {
        return user;
    }
	// if the user token is not valid, return null
	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	// if (userToken === "regularusertoken") {
	// 	const user = {
	// 		id: 1,
	// 		email: "user@example.com",
	// 		role: "USER",
	// 	}
	// 	return user;
	// }
	// if (userToken === "adminusertoken") {
	// 	const user = {
	// 		id: 2,
	// 		email: "admin@example.com",
	// 		role: "ADMIN",
	// 	}
	// 	return user
	// }

	return null;
}

export async function validateEmail(email) { // checking of inputs is done here
    const emailRegex = /[-A-Za-z0-9_.%]+@[-A-Za-z0-9_.%]+\.[A-Za-z]+/gm;
    const emailRegexExec = emailRegex.exec(email);

    if (emailRegexExec && emailRegexExec[0] === email) {
        return {
            success: true,
        };
    }
    return {
        error: true,
        message: "Email is invalid.",
    };
}

export function validatePassword(password) {
    const requiredLength = password.length > 7;

    if (!requiredLength) {
        return {
            error: true,
            message: "Password must be at least\n8 characters in length.",
        };
    }

    return { success: true };
}

export async function createUser(first_name, last_name, email, password, phone, student_number, course, department, access_level) {
    
    const email_matches = await getUserWithMatchingEmail(email);
    if (email_matches.length > 0) {
        throw new Error("Email already in use.");
    }
    const sn_matches = await getUserWithMatchingSN(student_number);
    if (sn_matches.length > 0) {
        throw new Error("Student number already in use.");
    }
    const password_strong = await validatePassword(password);
    if (password_strong.error) {
        throw new Error(password_strong.message);
    }

    const new_uuid = uuid();
    const pw_hash_response = await resolvePW(password, null);
    const pw_hash = pw_hash_response.body.finalHash.concat(pw_hash_response.body.salt);
    const newUser = await createUserDB(new_uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level);

    if (!newUser) {
        throw new Error("Error occured when creating a new user.");
    }
    return { success: true,
        message: "User successfully created.",
    }
}

async function createSessionById(userId) {
    // const users = get(usersStore);

    // const user = users.find((user) => user.id === userId);
    // console.log(`auth.js - createSessionById`);

    // const user = await getUserByIDDB(userId);
    // console.log(`auth.js - createSessionById - ${user}`);
    // if (!user) {
    //     throw new Error("User not found");
    // }

    const newSession = {
        id: uuid(),
        userId: userId,
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
    const emailValidationResult = await validateEmail(email);
    
    if (emailValidationResult.error) {
        throw new Error(emailValidationResult.message);
    }
    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult.error) {
        throw new Error(passwordValidationResult.message);
    }

    // const currentUsers = get(usersStore);

    // password matching happens here
    // const userFound = currentUsers.find((user) => {
    //     return user.email === email && user.password === password;
    // });

    // console.log("before userFound");
    
    const user = await authUserDB(email);
    if (user.length < 1) {
        throw new Error("Email not found. Please sign up.");
    }
    
    const password_resolution = await resolvePW(password, email);

    // console.log("auth.js - password resolution: ", password_resolution);
    // console.log("after userFound");

    // if (!userFound) {
    //     const userWithSameEmail = currentUsers.find((user) => user.email === email);

    //     if (userWithSameEmail) {
    //         throw new Error("Password is invalid");
    //     }

    //     throw new Error("User not found");
    // }
    let userId;

    if (password_resolution.success) {
        userId = password_resolution.body.userid;
    } else {
        userId = 0;
        throw new Error(password_resolution.message);
    }
    
    // console.log("auth.js - createSessionByemail: ", password_resolution.message, "userid", userId)

    const SessionCreateResult = await createSessionById(userId);
    // console.log("authjs after await createsession");
    // console.log(SessionCreateResult);
    

    return SessionCreateResult;
}

// Step 3
export async function validateSession(id) {
    // const sessions = get(sessionsStore);

    // const sessionResult = sessions.find((session) => session.id === id);
    // console.log("auth.js - validateSession")
    const sessionResult = await getSessionByIDDB(id);


    const s_session = sessionResult[0];
    // console.log(`auth.js - validateSession session Result: ${json(s_session)}`)

    if (!s_session) {
        throw new Error("Session does not exist");
    }

    // const users = get(usersStore);

    // const userResult = users.find((user) => user.id === sessionResult.userId);

    const userResult = await getUserByIDDB(sessionResult.userId);
    // console.log(`auth.js - validateSession - validated session id ${id}, for user ${userResult[0].first_name}`)

    if (!userResult) {
        throw new Error("User does not exist");
    }

    return {
        sessionResult,
        userResult,
    };
}

// export async function signOut(id) {
//     const sessions = get(sessionsStore);

//     const sessionFound = sessions.find((session) => session.id === id);

//     if (!sessionFound) {
//         throw new Error("Session not found");
//     }

//     sessionsStore.update((previousSessions) => {
//         return previousSessions.filter((session) => session !== sessionFound);
//     });
// }

export async function changePassword(email, newpassword) {
    const res = await resolvePW(newpassword, email, true)
    // console.log(res);
    return {
        success: true,
        message: "Password has been changed."
    }   
}

export async function hashItem(toHash, nsalt = null) {
    let salt;

    if (!nsalt) {
        salt = randomBytes(64).toString('hex');
    } else {
        salt = nsalt;
    }

    let finalkey = scryptSync(toHash, salt, 64).toString("hex"); // salting first
    finalkey = scryptSync(finalkey, PEPPA_PIG, 64).toString("hex");
    return {
        salt: salt,
        finalkey: finalkey,
    }
}

export async function isCorrect(hash, salt, toverify) {
    const result = await hashItem(toverify, salt);
    if (result.finalkey === hash) {
        return true;
    }
    return false;
}

async function resolvePW(password, email, force = false) { 
    let salt;
    let pw_hash;

    // Fetch the user from the database
    const users = await authUserDB(email);
    const user = users.length > 0 ? users[0] : null;

    // If the email is not provided or force is true, generate a new salt
    if (!user || force) {
        salt = randomBytes(64).toString('hex');
    } else {
        pw_hash = user.pw_hash; 
        salt = pw_hash.slice(128, 256);
    }

    let finalkey = scryptSync(password, salt, 64).toString("hex"); // Salting first
    finalkey = scryptSync(finalkey, PEPPA_PIG, 64).toString("hex");

    // If user exists and force is not true, validate the password
    if (user && !force) {
        if (finalkey !== pw_hash.slice(0,128)) {
            throw new Error("Incorrect password");
        }
    }

    if (user) {
        return {
            success: true,
            message: force ? "Password changed." : "Successfully authenticated.",
            body: {
                userid: user.id,
                useruuid: user.uuid,
                finalHash: finalkey,
                salt: salt,
            }
        };
    } else {
        return {
            success: true,
            message: "Account Creation.",
            body: {
                userid: null,
                useruuid: null,
                finalHash: finalkey,
                salt: salt,
            }
        };
    }
}


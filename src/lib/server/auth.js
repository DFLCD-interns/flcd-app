//THINGS IN THIS FILE IS RUN ON THE SERVER

import { writable, get } from "svelte/store";
import { v4 as uuid } from "uuid";
import { PEPPA_PIG, SESSION_COOKIE_NAME } from "$lib/server/constants.js";
import { getUserFromSessionDB, getUsersDB, createSessionDB, getUserByIDDB, getSessionByIDDB, createUserDB, authUserDB } from "$lib/server/db.js";
import { json } from "@sveltejs/kit";
import { scryptSync, randomBytes} from "crypto"; 
import { getUsersWithMatchingEmail } from "./db";

//these seem to be treated as a temp database replacement
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
        // check if email exists
        const matches = await getUsersWithMatchingEmail(email);
        if (matches.length > 1) {
            return {
                error: true,
                message: "Email already in use.",
            }
        } 
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

export async function createUser(first_name, last_name, email, password, phone, student_number, course, department, min_approval_layer, access_level) {
    // console.log("auth.js - createUser start.");

    // const emailValidationResult = validateEmail(email);

    // if (emailValidationResult.error) {
    //     throw new Error(emailValidationResult.message);
    // }

    // const passwordValidationResult = validatePassword(password);

    // if (passwordValidationResult.error) {
    //     throw new Error(passwordValidationResult.message);
    // }

    // const currentUsers = get(usersStore);

    // const newUser = {
    //     email,
    //     password,
    //     id: uuid(),
    // };

    const new_uuid = uuid();


    // console.log("newuuid", new_uuid);

    const pw_hash_response = await resolvePW(password, null);

    // console.log("hashresponse", pw_hash_response);


    const pw_hash = pw_hash_response.body.finalHash.concat(pw_hash_response.body.salt);

    // console.log("auth.js - createUser before newuser.");

    const newUser = await createUserDB(new_uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, min_approval_layer, access_level);


    if (!newUser) {
        throw new Error("Error occured when creating a new user.");
    }
    // usersStore.update((previousUsers) => {
    //     return [...previousUsers, newUser];
    // });

    // return createSessionById(newUser.id);
    return { success: true,
        message: "User created.",
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

export async function signOut(id) {
    const sessions = get(sessionsStore);

    const sessionFound = sessions.find((session) => session.id === id);

    if (!sessionFound) {
        throw new Error("Session not found");
    }

    sessionsStore.update((previousSessions) => {
        return previousSessions.filter((session) => session !== sessionFound);
    });
}

async function resolvePW(password, email) {
    // console.log("auth.js - password and email", password, email);
    let salt;
    let pw_hash;
    const user = await authUserDB(email);
    // console.log("authUser - ", user)
    if (!email) {
        salt = randomBytes(64).toString('hex');
        // console.log("auth.js - salt inside if", salt);
    } else {
        pw_hash = user.pw_hash; //await authUserDB(email);
        // console.log("auth.js - pw_hash in resolvePW", pw_hash);
        salt = pw_hash.slice(128, 256);
    }
    
    // console.log("auth.js -- salt", salt);
    let finalkey = scryptSync(password, salt, 64).toString("hex"); // salting first
    // console.log("auth.js -- prefinal key",finalkey);
    // console.log("auth.js -- peppa", PEPPA_PIG);
    finalkey = scryptSync(finalkey, PEPPA_PIG, 64).toString("hex");
    // console.log("auth.js -- final key",finalkey);
    // console.log("correct hash", correctHash);
    if (email) {
        if (finalkey !== pw_hash.slice(0,128)) {
            // console.log("resolve fail");
            throw new Error("Authentication Failed!, incorrect password!");
            return {
                success: false,
                message: "Authentication failed, incorrect password?",
                body: {
                    userid: null,
                    useruuid: null,
                    finalHash: finalkey,
                    salt: salt,
                    // correctHash: correctHash
                }
            }
        }
    }
    console.log("resolve success");
    if (user)
    {return { 

        success: true,
        message: "Successfully authenticated.",
        body: {
            userid: user.id,
            useruuid: user.uuid,
            finalHash: finalkey,
            salt: salt,
        }
     }} else {
        return { 
            success: true,
            message: "Account Creation.",
            body: {
                userid: null,
                useruuid: null,
                finalHash: finalkey,
                salt: salt,
            }
         }
     }
}

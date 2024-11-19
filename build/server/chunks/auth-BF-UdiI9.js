import { v4 } from 'uuid';
import { S as SESSION_COOKIE_NAME, P as PEPPA_PIG } from './constants-DlhdG_zK.js';
import { g as getUserFromSessionDB, E as getUserWithMatchingEmail, J as getUserWithMatchingSN, K as createUserDB, L as authUserDB, M as createSessionDB } from './db-D_ZfyofE.js';
import './index-DHSpIlkf.js';
import { randomBytes, scryptSync } from 'crypto';

async function authenticateUser(event) {
  const { cookies } = event;
  const userSession = cookies.get(SESSION_COOKIE_NAME);
  const user = await getUserFromSessionDB(userSession);
  if (user) {
    return user;
  }
  return null;
}
async function validateEmail(email) {
  const emailRegex = /[-A-Za-z0-9_.%]+@[-A-Za-z0-9_.%]+\.[A-Za-z]+/gm;
  const emailRegexExec = emailRegex.exec(email);
  if (emailRegexExec && emailRegexExec[0] === email) {
    return {
      success: true
    };
  }
  return {
    error: true,
    message: "Email is invalid."
  };
}
function validatePassword(password) {
  const requiredLength = password.length > 7;
  if (!requiredLength) {
    return {
      error: true,
      message: "Password must be at least\n8 characters in length."
    };
  }
  return { success: true };
}
async function createUser(first_name, last_name, email, password, phone, student_number, course, department, access_level) {
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
  const new_uuid = v4();
  const pw_hash_response = await resolvePW(password, null);
  const pw_hash = pw_hash_response.body.finalHash.concat(pw_hash_response.body.salt);
  const newUser = await createUserDB(new_uuid, first_name, last_name, email, pw_hash, phone, student_number, course, department, access_level);
  if (!newUser) {
    throw new Error("Error occured when creating a new user.");
  }
  return {
    success: true,
    message: "User successfully created."
  };
}
async function createSessionById(userId) {
  const newSession = {
    id: v4(),
    userId
  };
  await createSessionDB(newSession.id, newSession.userId);
  return newSession;
}
async function createSessionByEmail(email, password) {
  const emailValidationResult = await validateEmail(email);
  if (emailValidationResult.error) {
    throw new Error(emailValidationResult.message);
  }
  const passwordValidationResult = validatePassword(password);
  if (passwordValidationResult.error) {
    throw new Error(passwordValidationResult.message);
  }
  const user = await authUserDB(email);
  if (user.length < 1) {
    throw new Error("Email not found. Please sign up.");
  }
  const password_resolution = await resolvePW(password, email);
  let userId;
  if (password_resolution.success) {
    userId = password_resolution.body.userid;
  } else {
    userId = 0;
    throw new Error(password_resolution.message);
  }
  const SessionCreateResult = await createSessionById(userId);
  return SessionCreateResult;
}
async function resolvePW(password, email, force = false) {
  let salt;
  let pw_hash;
  const users = await authUserDB(email);
  const user = users.length > 0 ? users[0] : null;
  if (!user || force) {
    salt = randomBytes(64).toString("hex");
  } else {
    pw_hash = user.pw_hash;
    salt = pw_hash.slice(128, 256);
  }
  let finalkey = scryptSync(password, salt, 64).toString("hex");
  finalkey = scryptSync(finalkey, PEPPA_PIG, 64).toString("hex");
  if (user && !force) {
    if (finalkey !== pw_hash.slice(0, 128)) {
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
        salt
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
        salt
      }
    };
  }
}

export { authenticateUser as a, createUser as b, createSessionByEmail as c };
//# sourceMappingURL=auth-BF-UdiI9.js.map

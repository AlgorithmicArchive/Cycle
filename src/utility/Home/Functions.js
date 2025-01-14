import axios from "axios";

export const checkEmailExists = async (email, isLogin, setEmailMsg) => {
  if (!isLogin) {
    try {
      const emailExist = await axios.post(
        "http://localhost:3000/api/home/emailExists",
        { email: email }
      );
      setEmailMsg(emailExist.data.message);
    } catch (error) {
      console.log(error);
    }
  }
};

export const checkUsernameExists = async (
  username,
  isLogin,
  setUsernameMsg
) => {
  if (!isLogin) {
    const validStringRegex = /^[a-zA-Z0-9_]+$/;
    const isValid = validStringRegex.test(username);
    if (!isValid && username.length > 0) {
      setUsernameMsg("Only alphabets, numbers, and underscore allowed");
    } else {
      try {
        const usernameExist = await axios.post(
          "http://localhost:3000/api/home/usernameExists",
          { username: username }
        );
        setUsernameMsg(usernameExist.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  }
};


export function isPasswordValid(password, isLogin, setPasswordMsg) {
  if (!isLogin) {
    let errorMessage = "";

    // Check for at least 8 characters
    if (password.length < 8) {
      errorMessage += "Password should be at least 8 characters long.\n";
    }

    // Check for at least one uppercase character
    if (!/[A-Z]/.test(password)) {
      errorMessage +=
        "Password should contain at least one uppercase character.\n";
    }

    // Check for at least one lowercase character
    if (!/[a-z]/.test(password)) {
      errorMessage +=
        "Password should contain at least one lowercase character.\n";
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      errorMessage += "Password should contain at least one digit.\n";
    }

    // Check for at least one special character ($#@%&)
    if (!/[$#@%&]/.test(password)) {
      errorMessage +=
        "Password should contain at least one special character ($#@%&).\n";
    }
    setPasswordMsg(errorMessage.trim());
  }
}

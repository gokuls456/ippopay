import React, { useEffect, useState } from "react";
import "./style.css"


const Form = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fields, setFields] = useState({});
  const [errors, setErros] = useState({});


  function login() {
    setLoggedIn(true);
    props.parentCallback(true);
  }

  function isStrongPassword(password) {
    if (password.length < 6 || password.length > 20) {
      setErros({password: "Password must be at least 6 characters"});
      return false;
    }
  
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setErros({password: `Password must be have at least One Uppercase , One Lowercase, One special Character`});
      return false;
    }
  
    for (let i = 0; i < password.length - 2; i++) {
      setErros({password: "Password is weak"});
      if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
        return false;
      }
    }
    setErros();
    return true;
  }

  function handleChange(event){
    const { name, value } = event.target;
    let validate = false;
    if (name === "password") {
      const test = isStrongPassword(value);
      console.log(test);
    }
    setFields({...fields, [name]: value});
  };

  function minimumSubsetDifference(nums) {
    const n = nums.length;
    const prefixSum = new Array(n+1).fill(0);
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i-1] + nums[i-1];
    }
    
    const dp = new Array(n+1).fill(null).map(() => new Array(prefixSum[n]+1).fill(false));
    // dp[i][j] = true if there exists a subset of the subarray nums[0:i] with sum j
    
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= prefixSum[n]; j++) {
            if (j >= nums[i-1]) {
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]];
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    
    let diff = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j <= prefixSum[n]/2; j++) {
        if (dp[n][j]) {
            diff = Math.min(diff, prefixSum[n] - 2*j);
        }
    }
    
    return diff;
  };

  function strongPassword(password) {
    const n = password.length;
    const regexDigit = /[0-9]/;
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexSpecial = /[!@#$%^&*()\-+]/;
    
    let count = 0;
    if (!regexDigit.test(password)) count++;
    if (!regexLowercase.test(password)) count++;
    if (!regexUppercase.test(password)) count++;
    if (!regexSpecial.test(password)) count++;
    
    if (n < 6) {
        return Math.max(6 - n, count);
    } else if (n <= 20) {
        return count;
    } else {
        const deleteCount = n - 20;
        let requiredChanges = count;
        for (let i = 0; i < deleteCount; i++) {
            const j = n - i - 1;
            if (regexDigit.test(password[j]) && count > 1) {
                count--;
                requiredChanges--;
            } else if (regexLowercase.test(password[j]) && count > 1) {
                count--;
                requiredChanges--;
            } else if (regexUppercase.test(password[j]) && count > 1) {
                count--;
                requiredChanges--;
            } else if (regexSpecial.test(password[j]) && count > 1) {
                count--;
                requiredChanges--;
            } else if (count === 1) {
                requiredChanges--;
            }
        }
        return Math.max(deleteCount, requiredChanges);
    }
  }

  const nums =  [-36,36];
  console.log(minimumSubsetDifference(nums), strongPassword("a")); 

  return (
    <>    
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1>Login</h1>
            <form noValidate>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input `}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input `}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.password && (
                  <p className="help is-danger">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Form;

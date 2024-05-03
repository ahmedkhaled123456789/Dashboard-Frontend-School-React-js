import React, { useState, useEffect } from 'react'
 import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store/auth/authSlice';
 
const LoginHook = () => {
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      
        setIsPress(true)
        setLoading(true)
        await dispatch(adminLogin({
            email,
            password
        }))

        setLoading(false)
        setIsPress(false)
    }
    const res = useSelector(state => state.auth.loginUser)
    useEffect(() => {
        if (loading === false) {
            if (res) {
                 if (res.data.token) {
                  console.log(res.data.token)
                  console.log(res.data)

                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", JSON.stringify(res.data.data))
                     setTimeout(() => {
                        window.location.href = "/"
                    }, 1500);
                } else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }

                if (res.data.message === "Incorrect email or password") {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    console.log("كلمة السر او الايميل خطا")

                 }
                setLoading(true)
            }
        }
    }, [loading])

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress]
}

export default LoginHook
import './Signup.scss'
import signupImage from '../../assets/images/signup-card-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../../components/Axios'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordsMatch, setpasswordsMatch] = useState(false)

    const navigate = useNavigate()

    const checkConfirmPasswordMatch = (e) => {
        const confirmPassword = e.target.value
        setpasswordsMatch(password ? password === confirmPassword : false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) toast.error('email and password are required')

        try {
            const response = await axiosClient.post('auth/register', {
                email, password
            })

            setEmail('')
            setPassword('')

            navigate("/login", { state: { message: "Account created sucecssfully" } })
        } catch (error) {
            toast.error(`${error?.response?.data?.message}`)
        }

    }

    return (
        <div className="container signup-card">
            <Toaster />
            <div className="card mx-auto">
                <div className="fw-bold fs-4 card-header text-center text-light">Register</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="contents">

                            <div className="signup-card-image">
                                <img src={signupImage} alt="" className='img-fluid' />
                            </div>

                            <div className="signup-input-fields">
                                <div className="mb-3">
                                    <label htmlFor="email" className='form-label'>Enter a valid email</label>
                                    <input type="email" name="email" id="email" className="form-control shadow-none" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className='form-label'>Create password - <span className="small fst-italic">8 chars minimum</span> </label>
                                    <input type="password" name="password" id="password" className="form-control shadow-none" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password2" className='form-label'>Confirm the Password</label>
                                    {!passwordsMatch ? <><br /><span className="small text-danger fst-italic">passwords do not match*</span></> : ''}
                                    <input type="password" name="password2" id="password2" className="form-control shadow-none" placeholder="Reenter password" onChange={(e) => checkConfirmPasswordMatch(e)} required />
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn text-light w-50" disabled={!email || !password || !passwordsMatch}>Register</button>
                        </div>
                    </form>

                    <p className='mt-4 text-center'>Already have an account? <Link to='/login' className="text-decoration-none">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
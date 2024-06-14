import {signup } from './actions'

export default function SignUpPage() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-secondary pr-5 pl-5'>
        <div className='flex mb-10'>
            <h1 className='text-2xl font-medium'>Sign up To Reflect</h1>
        </div>
        <form className='flex flex-col items-start justify-start w-full h-full '>
            <label className="text-md mb-2" htmlFor="name">Your Name</label>
            <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
                id="name" 
                name="name" 
                type="text" 
                placeholder='Your Name'
                required
            />
            <label className="text-md mb-2" htmlFor="email">Email Address</label>
            <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
                id="email" 
                name="email" 
                type="email" 
                placeholder='Email'
                required 
            />
            <label className="text-md mb-2" htmlFor="password">Create Password</label>
            <input className="border w-full min-h-7 mb-5 rounded-md p-2" 
                id="password" 
                name="password" 
                type="password" 
                placeholder='Email'
                required 
            />
            <button className="w-full min-h-7 rounded-md p-2 bg-tertiary text-white" formAction={signup}>Sign up</button>
        </form>
        <div className='flex flex-col items-center justify-center mt-8 text-sm'>
            <div className='flex text-center items-center justify-center'>
                <p>
                By creating an account you agree with our <span className='underline underline-offset-1'>Terms of Service</span> and <span className='underline underline-offset-1'>Privacy Policy</span>
                </p>
            </div>
            <div>
                <p className='text-md mt-5'>Already have an account? <a href='#' className='underline underline-offset-1'>Sign In</a></p>
            </div>
        </div>
     
        
    </div>
        
  )
}
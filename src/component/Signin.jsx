import { useActionState } from 'react'
import '../App.css'


const Signin = () => {
 
const [error, submitAction, isPendinguse]=useActionState(
  async(prevState, formData) => {
     //1. Extract form data
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        //2. Call our sign-in function

        //3. Handle known errors (return error)

        //4. Handle success (e.g. redirect, return null)

        //5. Handle any other cases (safety net)

      } catch (error) {
        //6. Handle unexpected errors (return error)
      }
  },null
)
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 p-4">
      <h1 className="landing-header mb-4">Paper Like A Boss</h1>
      
      <div className="card w-full max-w-md bg-base-300 shadow-xl border border-base-100">
        <form className="card-body gap-6 "  action={submitAction}>
          <h2 className="card-title justify-center text-2xl font-bold mb-2">Welcome Back</h2>
            <label className="label">
              <span className="label-text-alt text-white">Don't have an account?</span>
              <a href="#" className="label-text-alt text-white link link-hover">Sign Up</a>
            </label>
          <div className="form-control">
            <label className="label mb-3">
              <span className="label-text font-medium text-white">Email</span>
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="hello@example.com" 
              className="input input-bordered w-full focus:input-success" 
            />
          </div>

          <div className="form-control">
            <label className="label mb-3">
              <span className="label-text font-medium text-white">Password</span>
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              className="input input-bordered w-full focus:input-success" 
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-success text-white text-lg font-normal no-animation">
              Sign In
            </button>
          </div>
          {/* Error message */}
        </form>
      </div>
    </div>
  )
}

export default Signin
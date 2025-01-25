export default function Error({ error }) {
    console.log(error)
    return (
      <div className="min-height-equal-vh-minus-nav-footer text-center flex flex-col justify-center">
        <h1>{error.status} | {error.code}</h1>
        <a href="/">Go back to <span className="text-blue-500">Home</span></a>
      </div>
    )
  }
  
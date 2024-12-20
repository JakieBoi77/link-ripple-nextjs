import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <div className="w-auto max-w-3xl bg-white rounded-xl m-auto my-20 pb-10 text-black text-center">
        <img className="w-full md:w-8/12 m-auto rounded-xl" src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg" alt="" />
        <p className="font-mono text-xl md:text-2xl py-5 md:py-10">Sorry, The page you are looking for can&apos;t be found</p>
        <Link href="/" className="bg-green-400 py-2 px-4 rounded-md text-2xl hover:bg-zinc-800 hover:text-white transition-all duration-300">Homepage</Link>
      </div>
    </>
  )
}
import Image from "next/image";

export default function Navbar() {
  return (
    <div className='flex bg-white justify-start'>
        <Image src='/logo.svg' alt='logo' width={96} height={74} />
    </div>
        
  )
}
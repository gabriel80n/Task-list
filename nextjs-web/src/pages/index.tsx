import Navbar from '@/components/singleUseComponents/Navbar';
import '../styles/globals.css';
import IndexPage from '@/components/singleUseComponents/IndexPage';



export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <IndexPage/>
      </div>
    </>
  )
}
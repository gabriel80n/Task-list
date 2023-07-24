import Navbar from '@/components/Navbar';
import '../styles/globals.css';
import PagInicial from '@/components/PagInicial';



export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <PagInicial/>
      </div>
    </>
  )
}
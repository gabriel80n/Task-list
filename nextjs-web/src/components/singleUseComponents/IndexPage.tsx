import pagInicial from '../../styles/IndexPage.module.css'
import ButtonSignIn from "../reusebleComponents/ButtonSignIn";

export default function PagInicial() {
  return (
    <div>
    <main className={pagInicial.main}>
          <section>
            <h1>Inovate the way you manage your projects!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia magnam delectus pariatur voluptates culpa consectetur eum at vero fugit vel  </p>
          
              
              <ButtonSignIn/>
              
           
            <p>Colaborate with your team within minutes</p>
          </section>
          <section>

            <div className={pagInicial.circle1}></div>
            <div className={pagInicial.circle2}></div>
            <div className={pagInicial.circle3}></div>
            <img src="/imagens/trabalho.jpg" alt="aaaa" />

          </section>
        </main>
        </div>
  )
}
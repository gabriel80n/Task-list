import Link from 'next/link';
import styles from '../styles/SideBar.module.css'

type SideBarProps = {
  mensagem: string | null;
};

export default function SideBar(props: SideBarProps) {
  let primeiraLetra = '';
  if (typeof props.mensagem === 'string') {
    primeiraLetra = props.mensagem[0] + props.mensagem[1].toUpperCase();
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>{primeiraLetra}</div>
        <div>Welcome <p>{props.mensagem}</p></div>
      </div>
      <div className={styles.optionsDivLinha}>
        <div className={styles.linha}></div>
      </div>

      <div className={styles.optionsDiv}>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/project.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}><Link className={styles.button} href='/mainPage'>Projects</Link></button></span>
        </div>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/colaborators.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}><Link className={styles.button} href={'/'}>Colaborators</Link></button></span>
        </div>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/sign out.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}><Link className={styles.button} href={'/'}>Sign Out</Link></button></span>
        </div>
        

      </div>
      <div className={styles.optionsDivLinha}>
        <div className={styles.linha}></div>
      </div>
      <div className={styles.footerDiv}>

      </div>
    </div>
  )
}
import styles from '../styles/SideBar.module.css'

type SideBarProps = {
  mensagem: string | null;
};

export default function SideBar(props: SideBarProps) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>GM</div>
        <div>Welcome <p>{props.mensagem}</p></div>
      </div>
      <div className={styles.optionsDivLinha}>
        <div className={styles.linha}></div>
      </div>

      <div className={styles.optionsDiv}>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/project.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}>Projects</button></span>
        </div>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/colaborators.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}>Colaborators</button></span>
        </div>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/sign out.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}>Sign Out</button></span>
        </div>
        <div className={styles.optionsRowDiv}>
          <span><img src="/icons/project.png" alt="" className={styles.img} /></span>
          <span><button className={styles.button}>Projects</button></span>
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